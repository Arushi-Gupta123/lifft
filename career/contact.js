const express = require("express");
const cors = require("cors");
const mysql = require('mysql2');

const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shiwani", // Your MySQL password
  database: "CONTACT", // Make sure it matches
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL database");
});

// API route
app.post("/api/contact", (req, res) => {
  const { firstname, lastname, email, phone, message } = req.body;

  if (!firstname || !lastname || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const query = `
    INSERT INTO contacts (firstname, lastname, email, phone, message)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(query, [firstname, lastname, email, phone, message], (err, result) => {
    if (err) {
      console.error("❌ Insert failed:", err);
      return res.status(500).json({ error: "Database error." });
    }
    console.log("📬 New contact saved with ID:", result.insertId);
    res.status(200).json({ message: "Form submitted successfully!" });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
