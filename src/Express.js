const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET/POST",
    allowedHeaders: "Content-Type,Authorization",
  }),
);

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

// Proxy route
app.get("/proxy/cloudflare-insights", async (req, res) => {
  try {
    const response = await fetch(
      "https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015",
    );
    const body = await response.text();
    res.setHeader("Content-Type", "application/javascript");
    res.send(body);
  } catch (error) {
    res.status(500).send("Error fetching script");
  }
});

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

// Fetch all threads
app.get("/api/threads", (req, res) => {
  const sql =
    "SELECT threads.id, threads.title, threads.content, threads.created_at, users.username FROM threads JOIN users ON threads.user_id = users.id";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching threads:", err);
      res.status(500).json({ error: "Error fetching threads" });
      return;
    }
    res.json(results);
  });
});

// Fetch replies for a specific thread
app.get("/api/threads/:threadId/replies", (req, res) => {
  const { threadId } = req.params;
  const sql =
    "SELECT replies.id, replies.content, replies.created_at, users.username FROM replies JOIN users ON replies.user_id = users.id WHERE replies.thread_id = ?";
  connection.query(sql, [threadId], (err, results) => {
    if (err) {
      console.error("Error fetching replies:", err);
      res.status(500).json({ error: "Error fetching replies" });
      return;
    }
    res.json(results);
  });
});

// Fetch all questions
app.get("/api/questions", (req, res) => {
  const sql =
    "SELECT questions.id, questions.title, questions.content, questions.created_at, users.username, categories.name as category_name FROM questions JOIN users ON questions.user_id = users.id JOIN categories ON questions.category_id = categories.id";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching questions:", err);
      res.status(500).json({ error: "Error fetching questions" });
      return;
    }
    res.json(results);
  });
});

// Fetch questions by category
app.get("/api/categories/:categoryId/questions", (req, res) => {
  const { categoryId } = req.params;
  const sql =
    "SELECT questions.id, questions.title, questions.content, questions.created_at, users.username FROM questions JOIN users ON questions.user_id = users.id WHERE questions.category_id = ?";
  connection.query(sql, [categoryId], (err, results) => {
    if (err) {
      console.error("Error fetching questions:", err);
      res.status(500).json({ error: "Error fetching questions" });
      return;
    }
    res.json(results);
  });
});

// Add a new question
app.post("/api/questions", (req, res) => {
  const { category_id, user_id, title, content } = req.body;
  const sql =
    "INSERT INTO questions (category_id, user_id, title, content) VALUES (?, ?, ?, ?)";
  connection.query(
    sql,
    [category_id, user_id, title, content],
    (err, results) => {
      if (err) {
        console.error("Error adding question:", err);
        res.status(500).json({ error: "Error adding question" });
        return;
      }
      res.status(201).json({ id: results.insertId });
    },
  );
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "An unexpected error occurred" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
