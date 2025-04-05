import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

interface Badge {
  name: string;
  type: 'game' | 'trivia' | 'skill' | 'completion' | 'lab-free';
  earnedDate: string;
}

interface Points {
  total: number;
  gameBadges: number;  // Points from game badges
  triviaBadges: number;  // Points from trivia badges
  skillBadges: number;  // Points from skill badges
}

interface ScrapedData {
  badges: Badge[];
  points: Points;
}

const START_DATE = new Date('2025-01-08');

// Game badge keywords
const GAME_BADGE_KEYWORDS = [
  "Love Beyond",
  "Arcade Skills Resolve",
  "Arcade Skillsresolve",
  "Color Your Skills",
  "Level 1",
  "Level 2",
  "Base Camp",
  "Arcade Certification Zone",
  "Level 3"
];

const SKILL_BADGES = [
  "Analyze BigQuery Data in Connected Sheets",
  "Streaming Analytics into BigQuery",
  "Store, Process, and Manage Data on Google Cloud - Console",
  "Using the Google Cloud Speech API",
  "Analyze Speech and Language with Google APIs",
  "Create a Secure Data Lake on Cloud Storage",
  "Get Started with API Gateway",
  "Get Started with Dataplex",
  "Get Started with Pub/Sub",
  "Get Started with Sensitive Data Protection",
  "Tag and Discover BigLake Data",
  "Use APIs to Work with Cloud Storage",
  "Integrate BigQuery Data and Google Workspace using Apps Script",
  "Configure Service Accounts and IAM Roles for Google Cloud",
  "Prepare Data for Looker Dashboards and Reports",
  "Create and Manage Cloud Spanner Instances",
  "Use Functions, Formulas, and Charts in Google Sheets",
  "Create and Manage AlloyDB Instances",
  "Build Real World AI Applications with Gemini and Imagen",
  "App Engine: 3 Ways",
  "Create a Streaming Data Lake on Cloud Storage",
  "Store, Process, and Manage Data on Google Cloud - Command Line",
  "App Building with AppSheet",
  "Cloud Functions: 3 Ways",
  "Cloud Run Functions: 3 Ways",
  "Get Started with Cloud Storage",
  "Get Started with Looker",
  "The Basics of Google Cloud Compute",
  "Analyze Images with the Cloud Vision API",
  "Analyze Sentiment with Natural Language API",
  "Cloud Speech API: 3 Ways",
  "Monitor and Manage Google Cloud Resources",
  "Protect Sensitive Data with Data Loss Prevention",
  "Secure BigLake Data",
  "Get Started with Eventarc",
  "Implement Load Balancing on Compute Engine",
  "Monitoring in Google Cloud",
  "Automate Data Capture at Scale with Document AI",
  "Develop Serverless Apps with Firebase",
  "Develop with Apps Script and AppSheet",
  "Networking Fundamentals on Google Cloud",
  "Build Google Cloud Infrastructure for Azure Professionals",
  "Engineer Data for Predictive Modeling with BigQuery ML",
  "Deploy Kubernetes Applications on Google Cloud",
  "Explore Generative AI with the Vertex AI Gemini API",
  "Implement CI/CD Pipelines on Google Cloud",
  "Implement DevOps Workflows in Google Cloud",
  "Build Google Cloud Infrastructure for AWS Professionals",
  "Inspect Rich Documents with Gemini Multimodality and Multimodal RAG",
  "Manage Kubernetes in Google Cloud",
  "Prompt Design in Vertex AI",
  "Protect Cloud Traffic with BeyondCorp Enterprise (BCE) Security",
  "Build LangChain Applications using Vertex AI",
  "Create and Manage Cloud SQL for PostgreSQL Instances",
  "Build a Data Warehouse with BigQuery",
  "Build a Data Mesh with Dataplex",
  "Migrate MySQL data to Cloud SQL using Database Migration Service",
  "Share Data Using Google Data Cloud",
  "Monitor and Log with Google Cloud Observability",
  "Perform Predictive Data Analysis in BigQuery",
  "Build Infrastructure with Terraform on Google Cloud",
  "Build LookML Objects in Looker",
  "Develop Serverless Applications on Cloud Run",
  "Build a Website on Google Cloud",
  "Create ML Models with BigQuery ML",
  "Mitigate Threats and Vulnerabilities with Security Command Center",
  "Develop GenAI Apps with Gemini and Streamlit",
  "Monitor Environments with Google Cloud Managed Service for Prometheus",
  "Create and Manage Bigtable Instances",
  "Detect Manufacturing Defects using Visual Inspection AI",
  "Optimize Costs for Google Kubernetes Engine",
  "Build and Deploy Machine Learning Solutions on Vertex AI",
  "Deploy and Manage Apigee X",
  "Set Up an App Dev Environment on Google Cloud",
  "Derive Insights from BigQuery Data",
  "Develop and Secure APIs with Apigee X",
  "Set Up a Google Cloud Network",
  "Implement Cloud Security Fundamentals on Google Cloud",
  "Develop your Google Cloud Network",
  "Build Custom Processors with Document AI",
  "Cloud Architecture: Design, Implement, and Manage",
  "Build a Secure Google Cloud Network",
  "Manage Data Models in Looker",
  "Classify Images with TensorFlow on Google Cloud",
  "Get Started with Google Workspace Tools",
  "Use Machine Learning APIs on Google Cloud",
  "Prepare Data for ML APIs on Google Cloud"
];

const LAB_FREE_BADGES = [
  "Digital Transformation with Google Cloud",
  "Exploring Data Transformation with Google Cloud",
  "Infrastructure and Application Modernization with Google Cloud",
  "Scaling with Google Cloud Operations",
  "Innovating with Google Cloud Artificial Intelligence",
  "Trust and Security with Google Cloud",
  "Responsible AI: Applying AI Principles with Google Cloud",
  "Responsible AI for Digital Leaders with Google Cloud",
  "Customer Experience with Google AI Architecture",
  "Machine Learning Operations (MLOps) with Vertex AI: Model Evaluation",
  "Conversational AI on Vertex AI and Dialogflow CX",
  "Building Complex End to End Self-Service Experiences in Dialogflow CX",
  "Google Drive",
  "Google Docs",
  "Google Sheets",
  "Google Slides",
  "Google Meet",
  "Google Calendar"
];

type BadgeType = 'game' | 'trivia' | 'skill' | 'completion' | 'lab-free';

function determineBadgeType(badgeName: string): BadgeType {
  // Remove "Skills Boost" prefix and clean the name
  const cleanedName = badgeName.replace(/^Skills Boost\s+/, '').toLowerCase();

  // Check for trivia badges first
  if (cleanedName.includes('trivia')) {
    return 'trivia';
  }

  // Check for game badges
  for (const keyword of GAME_BADGE_KEYWORDS) {
    if (cleanedName.includes(keyword.toLowerCase())) {
      return 'game';
    }
  }

  // Check for skill badges (exact match)
  for (const skillBadge of SKILL_BADGES) {
    if (cleanedName === skillBadge.toLowerCase()) {
      return 'skill';
    }
  }

  // Check for lab-free badges (exact match)
  for (const labFreeBadge of LAB_FREE_BADGES) {
    if (cleanedName === labFreeBadge.toLowerCase()) {
      return 'lab-free';
    }
  }

  // If none of the above, it's a completion badge
  return 'completion';
}

function calculatePoints(badges: Badge[]): Points {
  let totalPoints = 0;
  let gamePoints = 0;
  let triviaPoints = 0;
  let skillPoints = 0;
  let skillBadgeCount = 0;

  // Filter badges earned after START_DATE
  const recentBadges = badges.filter(badge => new Date(badge.earnedDate) >= START_DATE);

  // Calculate points for each badge type
  for (const badge of recentBadges) {
    switch (badge.type) {
      case 'game':
        // Special 2-point game badges
        if (
          badge.name.toLowerCase().includes('love beyond') ||
          badge.name.toLowerCase().includes('arcade skills resolve') ||
          badge.name.toLowerCase().includes('arcade skillsresolve') ||
          badge.name.toLowerCase().includes('color your skills')
        ) {
          gamePoints += 2;
        } else {
          gamePoints += 1; // Regular game badges = 1 point
        }
        break;
      case 'trivia':
        triviaPoints += 1; // All trivia badges = 1 point
        break;
      case 'skill':
        skillBadgeCount++; // Count skill badges to calculate points later
        break;
      // No points for completion or lab-free badges
      case 'completion':
      case 'lab-free':
        break;
    }
  }

  // Calculate skill points (1 point per 2 skill badges)
  skillPoints = Math.floor(skillBadgeCount / 2);

  // Calculate total points
  totalPoints = gamePoints + triviaPoints + skillPoints;

  return {
    total: totalPoints,
    gameBadges: gamePoints,
    triviaBadges: triviaPoints,
    skillBadges: skillPoints
  };
}

app.get('/api/calculate-points', async (req, res) => {
  try {
    const { profileUrl } = req.query;

    if (!profileUrl || typeof profileUrl !== 'string') {
      return res.status(400).json({ error: 'Profile URL is required' });
    }

    const response = await axios.get(profileUrl);
    const $ = cheerio.load(response.data);

    const badges: Badge[] = [];

    // Find all profile badges
    $('.profile-badge').each((_, element) => {
      const $element = $(element);
      
      // Get badge name from the title span
      const name = $element.find('.ql-title-medium.l-mts').text().trim();
      
      // Get earned date from the body span
      const dateText = $element.find('.ql-body-medium.l-mbs').text().trim();
      
      // Extract date from the text (e.g., "Earned Dec 17, 2024 EST" or "Earned Apr 3, 2025 EDT")
      const dateMatch = dateText.match(/Earned (.+?) (?:EST|EDT)/);
      if (dateMatch) {
        const dateStr = dateMatch[1];
        // Parse the date string to a proper Date object
        const earnedDate = new Date(dateStr);
        
        if (name && !isNaN(earnedDate.getTime())) {
          const type = determineBadgeType(name);
          badges.push({
            name,
            type,
            earnedDate: earnedDate.toISOString()
          });
        }
      }
    });

    // Calculate points and get the breakdown
    const points = calculatePoints(badges);

    // Return the scraped data
    const scrapedData: ScrapedData = {
      badges,
      points
    };

    res.json(scrapedData);
  } catch (error) {
    console.error('Error calculating points:', error);
    res.status(500).json({ error: 'Failed to calculate points' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 