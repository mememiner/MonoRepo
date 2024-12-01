import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Ensure node-fetch is installed.

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend origin.
    credentials: true,
  })
);

// Endpoint to fetch jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const response = await fetch("https://jobdataapi.com/api/jobs/");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
