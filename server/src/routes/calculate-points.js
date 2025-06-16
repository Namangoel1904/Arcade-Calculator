import { Router } from "express";
import arcadePointsCalculator from "../controller/calculateArcadeProgress.js";
const router = Router();

// Route to calculate arcade points based on a public profile URL
router.post("/", async (req, res) => {
    const { publicUrl } = req.body;
    console.log(publicUrl); // Log the received URL for debugging

    // Validate that a publicUrl is provided
    if (!publicUrl) {
        return res.status(400).json({ success: false, message: "Please provide a public url." });
    }

    // Ensure the URL is a valid Google Cloud Skills Boost public profile
    if (!publicUrl.includes('https://www.cloudskillsboost.google/public_profiles/')) {
        return res.status(400).json({ success: false, message: "Please provide a valid public url." });
    }

    // Call the arcadePointsCalculator controller with the provided URL
    const result = await arcadePointsCalculator(publicUrl);
    if (!result.success) {
        // If calculation fails, return a 500 error with the message
        return res.status(500).json({ success: false, message: result.message });
    }

    // On success, return the calculated data
    return res.status(200).json(result.data);
});

export default router;