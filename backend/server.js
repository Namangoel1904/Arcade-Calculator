import express from 'express';
import cors from 'cors';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

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
        points: { total: 0, game: 0, trivia: 0, skill: 0 },
        badges: []
      });
    }

    // Fetch the profile page
    console.log('Fetching profile page...');
    const response = await axios.get(profileUrl);
    console.log('Profile page fetched successfully');
    
    // Log the HTML content for debugging
    console.log('HTML Content:', response.data.substring(0, 500) + '...');

    const $ = cheerio.load(response.data);

    const badges = [];
    let gamePoints = 0;
    let triviaPoints = 0;
    let skillPoints = 0;

    // Try different selectors that might contain badges
    console.log('Searching for badges...');
    
    // Log all available classes for debugging
    const allClasses = new Set();
    $('*[class]').each((_, el) => {
      const classes = $(el).attr('class').split(/\s+/);
      classes.forEach(cls => allClasses.add(cls));
    });
    console.log('Available classes on the page:', Array.from(allClasses));

    // Try multiple potential selectors
    const badgeSelectors = [
      '.badge-item',
      '.ql-badge-card',
      '.badge-card',
      '[data-cy="badge"]',
      '.badge',
      // Add any class that looks like it might be related to badges
    ];

    badgeSelectors.forEach(selector => {
      console.log(`Checking selector: ${selector}`);
      console.log(`Found ${$(selector).length} elements with this selector`);
      
      $(selector).each((_, element) => {
        // Try to find badge information using various potential selectors
        const el = $(element);
        const badgeName = el.find('[data-cy="badge-title"]').text().trim() ||
                         el.find('.badge-name').text().trim() ||
                         el.find('.ql-badge-title').text().trim() ||
                         el.find('h3').text().trim();
                         
        const badgeType = el.find('[data-cy="badge-type"]').text().trim() ||
                         el.find('.badge-type').text().trim() ||
                         el.find('.ql-badge-type').text().trim();

        if (badgeName) {
          console.log('Found badge:', { name: badgeName, type: badgeType });
          
          const badgePoints = calculateBadgePoints(badgeType);
          badges.push({
            name: badgeName,
            type: badgeType || 'unknown',
            points: badgePoints
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
    });

    console.log('Badges found:', badges.length);
    console.log('Points calculation:', { gamePoints, triviaPoints, skillPoints });

    const totalPoints = gamePoints + triviaPoints + skillPoints;

    const result = {
      points: {
        total: totalPoints,
        game: gamePoints,
        trivia: triviaPoints,
        skill: skillPoints
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
      points: { total: 0, game: 0, trivia: 0, skill: 0 },
      badges: []
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 