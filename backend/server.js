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

    if (!profileUrl) {
      return res.status(400).json({
        error: 'Profile URL is required',
        points: { total: 0, game: 0, trivia: 0, skill: 0 },
        badges: []
      });
    }

    // Fetch the profile page
    const response = await axios.get(profileUrl);
    const $ = cheerio.load(response.data);

    const badges = [];
    let gamePoints = 0;
    let triviaPoints = 0;
    let skillPoints = 0;

    // Find and process badges
    $('.badge-item').each((_, element) => {
      const badgeName = $(element).find('.badge-name').text().trim();
      const badgeType = $(element).find('.badge-type').text().trim();
      const badgePoints = calculateBadgePoints(badgeType);

      badges.push({
        name: badgeName,
        type: badgeType,
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
    });

    const totalPoints = gamePoints + triviaPoints + skillPoints;

    res.json({
      points: {
        total: totalPoints,
        game: gamePoints,
        trivia: triviaPoints,
        skill: skillPoints
      },
      badges
    });
  } catch (error) {
    console.error('Error scraping profile:', error);
    res.status(500).json({
      error: 'Failed to scrape profile data',
      points: { total: 0, game: 0, trivia: 0, skill: 0 },
      badges: []
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 