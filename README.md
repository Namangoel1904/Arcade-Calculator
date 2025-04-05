# Google Arcade Points Calculator

A web application that calculates points for Google Arcade participants based on their Cloud Skills Boost profile badges.

## Features

- Calculate points based on badges earned after January 8th, 2024
- Points calculation rules:
  - 1 point for each Game badge
  - 1 point for each Trivia badge
  - 1 point for every 2 Skill badges
- Modern and responsive UI
- Real-time points calculation

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd arcade-calculator
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd server
npm install
```

4. Start the development servers:

In one terminal (frontend):
```bash
npm run dev
```

In another terminal (backend):
```bash
cd server
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## Usage

1. Open the application in your web browser
2. Enter your Cloud Skills Boost public profile URL
3. Click "Calculate Points" to see your points breakdown

## Development

The project is built with:
- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Node.js + Express + TypeScript + Cheerio

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 