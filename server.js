import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('Health check requested');
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

function calculateBadgePoints(badgeType) {
  switch (badgeType.toLowerCase()) {
    case 'game':
      return 10;
    case 'trivia':
      return 5;
    case 'skill':
      return 15;
    default:
      return 0;
  }
}

app.get('/api/calculate-points', async (req, res) => {
  try {
    const { profileUrl } = req.query;
    console.log('Received profile URL:', profileUrl);

    if (!profileUrl) {
      return res.status(400).json({
        error: 'Profile URL is required',
        points: { total: 0, gameBadges: 0, triviaBadges: 0, skillBadges: 0 },
        badges: []
      });
    }

    // Fetch the profile page
    console.log('Fetching profile page...');
    let response;
    try {
      response = await axios.get(profileUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      console.log('Profile page fetched successfully');
    } catch (error) {
      console.error('Error fetching profile page:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      return res.status(500).json({
        error: 'Failed to access profile page. The profile might be private or not accessible.',
        points: { total: 0, gameBadges: 0, triviaBadges: 0, skillBadges: 0 },
        badges: []
      });
    }

    const $ = cheerio.load(response.data);
    const badges = [];
    let gamePoints = 0;
    let triviaPoints = 0;
    let skillPoints = 0;

    // Find all badge elements
    $('.profile-badge').each((_, element) => {
      const el = $(element);
      
      // Extract badge name from the title span
      const badgeName = el.find('.ql-title-medium').text().trim();
      
      // Extract earned date from the body span
      const earnedDate = el.find('.ql-body-medium').text().trim();
      
      // Determine badge type based on name
      let badgeType = 'unknown';
      if (badgeName.toLowerCase().includes('trivia')) {
        badgeType = 'trivia';
      } else if (badgeName.toLowerCase().includes('skill')) {
        badgeType = 'skill';
      } else if (badgeName.toLowerCase().includes('game')) {
        badgeType = 'game';
      }

      if (badgeName) {
        console.log('Found badge:', { name: badgeName, type: badgeType });
        
        const badgePoints = calculateBadgePoints(badgeType);
        badges.push({
          name: badgeName,
          type: badgeType,
          earnedDate: earnedDate
        });

        // Update points based on badge type
        switch (badgeType.toLowerCase()) {
          case 'game':
            gamePoints += badgePoints;
            break;
          case 'trivia':
            triviaPoints += badgePoints;
            break;
          case 'skill':
            skillPoints += badgePoints;
            break;
        }
      }
    });

    console.log('Badges found:', badges.length);
    console.log('Points calculation:', { gamePoints, triviaPoints, skillPoints });

    const totalPoints = gamePoints + triviaPoints + skillPoints;

    const result = {
      points: {
        total: totalPoints,
        gameBadges: gamePoints,
        triviaBadges: triviaPoints,
        skillBadges: skillPoints
      },
      badges
    };

    console.log('Sending response:', result);
    res.json(result);
  } catch (error) {
    console.error('Error scraping profile:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    
    res.status(500).json({
      error: 'Failed to scrape profile data',
      details: error.message,
      points: { total: 0, gameBadges: 0, triviaBadges: 0, skillBadges: 0 },
      badges: []
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 