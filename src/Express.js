const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const port = 3306;

// MySQL connection configuration
const connection = mysql.createConnection({
  host: "sql3.freemysqlhosting.net",
  user: "sql3715096",
  password: "CzaktYMfS5",
  database: "sql3715096",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err.stack);
    return;
  }
  console.log("Connected to MySQL database as id", connection.threadId);
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
  res.json({ message: "Logged out successfully" });
});

// Route to handle login request
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  // Example SQL query to find user
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  connection.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.length > 0) {
      // User authenticated, you might create a session/token here
      res.json({ message: "Login successful", user: results[0] });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
