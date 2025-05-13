const express = require("express");
const multer = require("multer");
const cors = require("cors");
// ✅ Use mysql2 instead
const mysql = require('mysql2');
const path = require("path");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// ✅ MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shiwani",
  database: "lift",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// ✅ Setup file storage with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// ✅ Job Application Route
app.post("/api/apply", upload.single("resume"), (req, res) => {
  try {
    console.log("📩 Received form data:", req.body);
    console.log("📎 Uploaded file:", req.file);

    // ✅ Parse jobId as an integer
    const jobId = req.body.jobId ? parseInt(req.body.jobId, 10) : null;
    console.log("📌 Parsed jobId:", jobId, "Type:", typeof jobId);

    if (!jobId || isNaN(jobId)) {
      console.log("❌ Missing or invalid jobId");
      return res.status(400).json({ error: "Invalid or missing jobId" });
    }

    const { firstName, lastName, email, phone, linkedin } = req.body;
    const resume = req.file ? req.file.path : null;

    if (!firstName || !lastName || !email || !phone || !linkedin || !resume) {
      console.log("🚨 Missing required fields!");
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Check if jobId exists in the jobs table
    db.query("SELECT * FROM jobs WHERE id = ?", [jobId], (err, results) => {
      if (err) {
        console.error("❌ Error checking job ID:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        console.log("❌ Invalid jobId:", jobId);
        return res.status(400).json({ error: "Invalid jobId" });
      }

      // ✅ Insert application into database
      db.query(
        "INSERT INTO applications (jobId, firstName, lastName, email, phone, linkedin, resume) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [jobId, firstName, lastName, email, phone, linkedin, resume],
        (err, result) => {
          if (err) {
            console.error("❌ Database insertion error:", err);
            return res.status(500).json({ error: "Failed to submit application" });
          }
          console.log("✅ Application submitted:", result);
          return res.json({ message: "Application submitted successfully" });
        }
      );
    });
  } catch (error) {
    console.error("🔥 Unexpected error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
