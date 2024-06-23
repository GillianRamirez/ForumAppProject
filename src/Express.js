const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

// MySQL connection configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "your_database_name",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Middleware
app.use(bodyParser.json());

// API endpoints
app.get("/api/categories", (req, res) => {
  const sql = "SELECT * FROM categories";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching categories:", err);
      res.status(500).json({ error: "Error fetching categories" });
      return;
    }
    res.json(results);
  });
});

app.get("/api/questions/:categoryId", (req, res) => {
  const { categoryId } = req.params;
  const sql = "SELECT * FROM questions WHERE category_id = ?";
  connection.query(sql, [categoryId], (err, results) => {
    if (err) {
      console.error("Error fetching questions:", err);
      res.status(500).json({ error: "Error fetching questions" });
      return;
    }
    res.json(results);
  });
});

app.post("/api/logout", (req, res) => {
  // Handle logout logic here
  // Example: Clear session data or authentication tokens
  res.json({ message: "Logged out successfully" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
