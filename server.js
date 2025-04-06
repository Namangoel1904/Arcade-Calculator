const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock data for demonstration
const mockBadges = [
  { name: 'Game Badge 1', type: 'game', earnedDate: '2025-01-10' },
  { name: 'Trivia Badge 1', type: 'trivia', earnedDate: '2025-01-15' },
  { name: 'Skill Badge 1', type: 'skill', earnedDate: '2025-01-20' },
];

app.get('/api/calculate-points', (req, res) => {
  const { profileUrl } = req.query;
  
  // Mock response
  res.json({
    badges: mockBadges,
    points: {
      total: 15,
      gameBadges: 5,
      triviaBadges: 5,
      skillBadges: 5
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 