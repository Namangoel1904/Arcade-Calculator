import express from "express";
import cors from "cors";
import axios from "axios"; // Import axios for HTTP requests

// Initialize Express app
const app = express();
// Set port from environment variable or default to 3001
const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());



import calculatePointsRouter from "./routes/calculate-points.js";
app.use("/calculate-points", calculatePointsRouter)


// Health check endpoint for Render deployment
app.get("/", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// --------------------- SELF PING ---------------------
// Render may put the server to sleep if it doesn't receive traffic for 5 minutes.
// This self-ping mechanism keeps the server awake by making a request to itself every 5 minutes.
const interval = 300000; // Interval in milliseconds (5 minutes)
function reloadWebsite() {
    axios.get(process.env.SERVER_URL)
        .then(response => {
            console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
        })
        .catch(error => {
            console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
        });
}
setInterval(reloadWebsite, interval);


// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
