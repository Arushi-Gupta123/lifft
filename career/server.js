const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

// ✅ Add this line to initialize Express
const app = express();  

app.use(cors());
app.use(express.json());

// MySQL Connection Pool
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "shiwani",
  database: "lift_qoot",
  connectionLimit: 10,
});

// Ensure Database Connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Database Connected Successfully");
    connection.release();
  }
});

// Fetch Dropdown Options
app.get("/api/dropdowns", (req, res) => {
  db.query("SELECT category, value FROM dropdown_values", (err, result) => {
    if (err) {
      console.error("Error fetching dropdowns:", err);
      return res.status(500).json({ error: "Database error" });
    }

    let dropdowns = {};
    result.forEach((row) => {
      if (!dropdowns[row.category]) dropdowns[row.category] = [];
      dropdowns[row.category].push(row.value);
    });

    res.json(dropdowns);
  });
});

// Fetch Next Offer Number
app.get("/api/offer-number", (req, res) => {
  const query = "SELECT COALESCE(MAX(offer_number), 0) + 1 AS nextOffer FROM lift_specifications;";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching offer number:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ offerNumber: result[0].nextOffer });
  });
});

// Submit Form Data
app.post("/api/submit", (req, res) => {
  const { communication, customerName, gender, email, phoneNumber, liftSpecifications } = req.body;

  if (!communication || !customerName || !gender || !email || !phoneNumber) {
    return res.status(400).json({ error: "Missing customer details" });
  }

  if (!liftSpecifications || Object.keys(liftSpecifications).length === 0) {
    return res.status(400).json({ error: "No lift specifications provided" });
  }

 

    // Check if customer exists
    const checkCustomerQuery = "SELECT id FROM customers WHERE email = ?";

    db.query(checkCustomerQuery, [email], (err, result) => {
      if (err) {
        console.error("Error checking customer:", err);
        return res.status(500).json({ error: "Database error", details: err });
      }

      let customerId = result.length > 0 ? result[0].id : null;

      // Insert or Update Customer
      const customerQuery = `
        INSERT INTO customers (communication, customer_name, gender, email, phone_number)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            customer_name = VALUES(customer_name), 
            phone_number = VALUES(phone_number),
            communication = VALUES(communication),
            gender = VALUES(gender);
      `;

      db.query(customerQuery, [communication, customerName, gender, email, phoneNumber], (err, result) => {
        if (err) {
          console.error("Error inserting/updating customer data:", err);
          return res.status(500).json({ error: "Database error", details: err });
        }

        if (!customerId) customerId = result.insertId;

        // Prepare Lift Specifications Query
        const fields = Object.keys(liftSpecifications).map(f => `\`${f}\``).join(", ");
        const values = Object.values(liftSpecifications);
        const placeholders = values.map(() => "?").join(", ");

        const liftQuery = `
        INSERT INTO lift_specifications (customer_id, ${fields}) 
        VALUES (?, ${placeholders}); 
      `;
      
      db.query(liftQuery, [customerId, ...values], (err, result) => {
        if (err) {
          console.error("Error inserting lift specifications:", err);
          return res.status(500).json({ error: "Database error", details: err });
        }
      
        const offerNumber = result.insertId; // This is your auto-generated offer number
        res.status(200).json({ message: "Quotation Submitted Successfully", offerNumber });
      });
      
      });
    });
  });

// Import Multer (for handling file uploads)
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // Initialize Multer


// Merge PDF API
// Merge PDF API (Remove Page 3 and Last Page)
app.post("/api/merge-pdf", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF uploaded" });
    }

    const uploadedPdfBytes = req.file.buffer;
    const existingPdfPath = path.join(__dirname, "Elevator.pdf");

    if (!fs.existsSync(existingPdfPath)) {
      return res.status(500).json({ error: "Base PDF not found" });
    }

    const existingPdfBytes = fs.readFileSync(existingPdfPath);

    // Load PDFs
    const existingPdf = await PDFDocument.load(existingPdfBytes);
    const uploadedPdf = await PDFDocument.load(uploadedPdfBytes);
    const mergedPdf = await PDFDocument.create();

    // ✅ Step 1: Copy Page 1 (Customer Details) from uploaded PDF
    const totalUploadedPages = uploadedPdf.getPageCount();
    if (totalUploadedPages > 0) {
      const [customerPage] = await mergedPdf.copyPages(uploadedPdf, [0]); // Page 1
      mergedPdf.addPage(customerPage);
    }

    // ✅ Step 2: Copy Page 2 from uploaded PDF (if available)
    if (totalUploadedPages > 1) {
      const [page2] = await mergedPdf.copyPages(uploadedPdf, [1]); // Page 2
      mergedPdf.addPage(page2);
    }

    // ✅ Step 3: **Copy Page 2 from "Elevator.pdf"**
    const totalElevatorPages = existingPdf.getPageCount();
    if (totalElevatorPages > 1) {
      const [elevatorPage2] = await mergedPdf.copyPages(existingPdf, [1]); // Page 2 of Elevator.pdf
      mergedPdf.addPage(elevatorPage2);
    }

    // ✅ Step 4: Copy all remaining pages from Elevator.pdf **except Page 1 & 3**
    const pagesToKeep = [...Array(totalElevatorPages).keys()].filter((p) => p !== 1 && p !== 3);
    const copiedPages = await mergedPdf.copyPages(existingPdf, pagesToKeep);
    copiedPages.forEach((page) => mergedPdf.addPage(page));

    // ✅ Step 5: Copy Page 3 (Lift Specifications) from uploaded PDF and append it
   // ❌ Step 5: Skip copying Page 3 (Lift Specifications) from uploaded PDF

// ✅ Step 6: Remove **Page 3 (index 2) from the final merged PDF**
// ✅ Step 6: Remove Page 3 (index 2) and the last page
const finalPageCount = mergedPdf.getPageCount();

// First, remove Page 3 (index 2) if it exists
if (finalPageCount > 2) {
  mergedPdf.removePage(2); // Remove Page at index 2 (Page 3)
}

// Recalculate total pages after removal
const updatedPageCount = mergedPdf.getPageCount();

// Then, remove the last page
if (updatedPageCount > 0) {
  mergedPdf.removePage(updatedPageCount - 1); // Remove last page
}


    // Save the merged PDF
    const mergedPdfBytes = await mergedPdf.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=Merged_Quotation.pdf");
    res.send(Buffer.from(mergedPdfBytes));
  } catch (error) {
    console.error("Error merging PDFs:", error);
    res.status(500).json({ error: "Failed to merge PDFs" });
  }
});




// ✅ Serve Vite's build folder
app.use(express.static(path.join(__dirname, "..", "..", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "dist", "index.html"));
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));