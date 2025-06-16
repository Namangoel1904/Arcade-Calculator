# Arcade Calculator Backend

This project is a backend server for the **Google Arcade Points Calculator**. It allows users to submit their Google Cloud Skills Boost public profile URL and calculates their Arcade event points, bonus points, and badge progress. The server is built with Node.js, Express, and uses Cheerio for web scraping.

---

## Features

-   **REST API** endpoint to calculate Arcade points from a public profile URL
-   Scrapes badge and profile data from Google Cloud Skills Boost
-   Calculates Arcade event points, bonus points, and badge milestones
-   Supports Render.com deployment with health checks and self-ping to prevent server sleep

---

## Project Structure

```
server/
├── package.json
├── render.yaml
├── .env.example
├── src/
│   ├── index.js                  # Main server entry point
│   ├── controller/
│   │   └── calculateArcadeProgress.js  # Badge scraping and calculation logic
│   ├── routes/
│   │   └── calculate-points.js   # API route for point calculation
│   └── utils/
│       └── badges.js             # Badge lists and types
```

---

## Setup & Installation

1. **Clone the repository**

    ```sh
    git clone <repo-url>
    cd Arcade-Calculator/server
    ```

2. **Install dependencies**

    ```sh
    npm install
    ```

3. **Configure environment variables**

    - Copy `.env.example` to `.env` and set your server's public URL:
        ```sh
        cp .env.example .env
        # Edit .env and set SERVER_URL to your deployed backend URL
        ```

4. **Run the server locally**
    ```sh
    npm run dev
    # or
    npm start
    ```
    The server will start on `http://localhost:3001` by default.

---

## API Usage

### POST `/calculate-points`

Calculate Arcade points for a Google Cloud Skills Boost public profile.

**Request Body:**

```json
{
    "publicUrl": "https://www.cloudskillsboost.google/public_profiles/your-id"
}
```

**Response:**

-   `200 OK` with calculated points and badge data
-   `400 Bad Request` if the URL is missing or invalid
-   `500 Internal Server Error` for scraping or calculation errors

---

## Deployment (Render.com)

-   The project includes a `render.yaml` for Render deployment.
-   Health check endpoint: `/` (returns `{ status: "ok" }`)
-   The server pings itself every 5 minutes to prevent Render from sleeping.

---

## Technologies Used

-   Node.js
-   Express
-   Axios
-   Cheerio
-   CORS

---

## Contributing

Pull requests and suggestions are welcome!

---

## License

MIT
