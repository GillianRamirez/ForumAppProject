const conn = require("./config/connection");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Paint";

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();

const app = express();

// Create connection to the database
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
});

// Listen on port 4000
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});

app.use(
  cors({
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Define a route for the root path
app.get("/dashboard", (req, res) => {
  const categoryId = req.query.category_id; // Get category_id from query parameters
  let sql = "SELECT * FROM questions";
  let params = [];

  if (categoryId) {
    sql += " WHERE category_id = ?"; // Filter by category_id if provided
    params.push(categoryId);
  }

  conn.query(sql, params, (err, rows) => {
    if (err) throw err;
    res.send(rows);
    res.end();
  });
});

app.post("/post", (req, res) => {
  const { question_title, question, category_id, user_id } = req.body;

  const sqlInsert =
    "INSERT INTO questions (question_title, question, category_id, user_id) VALUES (?, ?, ?, ?)";

  conn.query(
    sqlInsert,
    [question_title, question, category_id, user_id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server error");
      }

      res.status(201).send("Question posted successfully");
    },
  );
});

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;

  conn.query(
    "SELECT * FROM questions WHERE question_id = ?",
    [id],
    (err, rows) => {
      if (err) {
        console.log(err);
        throw err;
      }
      res.send(rows);
      res.end();
    },
  );
});

app.post("/edit", (req, res) => {
  const { question_id, question_title, question, user_id } = req.body;

  const sqlEdit = `UPDATE questions SET question_title = ?, question = ?, user_id = ? WHERE question_id = ?`;

  conn.query(
    sqlEdit,
    [question_title, question, user_id, question_id],
    (err, row) => {
      if (err) {
        console.log(err);
        throw err;
      }
      res.send(row);
      res.end();
    },
  );
});

// Delete Question
app.delete("/delete-question/:id", (req, res) => {
  const id = req.params.id;

  conn.query(
    "DELETE FROM questions WHERE question_id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server error");
      }

      res.send("Question deleted successfully");
    },
  );
});

app.post("/Replies", (req, res) => {
  const { replies, question_id, user_id } = req.body;

  const sqlInsert =
    "INSERT INTO answers (replies, question_id, user_id) VALUES (?, ?, ?)";

  conn.query(sqlInsert, [replies, question_id, user_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server error");
    }

    res.status(201).send("Answer posted successfully");
  });
});

app.get("/replies/:question_id", (req, res) => {
  const question_id = req.params.question_id;

  const sql = "SELECT * FROM answers WHERE question_id = ?";
  conn.query(sql, [question_id], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server error");
    }

    res.send(rows);
    res.end();
  });
});

app.get("/edit-replies/:id", (req, res) => {
  const id = req.params.id;

  conn.query("SELECT * FROM answers WHERE answer_id = ?", [id], (err, rows) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.send(rows[0]); // Send the first row as the answer
    res.end();
  });
});

app.post("/edit-replies", (req, res) => {
  const { answer_id, answer, question_id, user_id } = req.body;

  const sqlEdit = `UPDATE answers SET answer = ?, question_id = ?, user_id = ? WHERE answer_id = ?`;

  conn.query(
    sqlEdit,
    [answer, question_id, user_id, answer_id],
    (err, result) => {
      if (err) {
        console.log(err);
        throw err;
      }
      res.send("Answer updated successfully");
      res.end();
    },
  );
});

// Delete Answer
app.delete("/delete-replies/:id", (req, res) => {
  const id = req.params.id;

  conn.query("DELETE FROM answers WHERE answer_id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server error");
    }

    res.send("Answer deleted successfully");
  });
});

// Signup Route
app.post("/RegisterScreen", async (req, res) => {
  const { username, email, password } = req.body;

  console.log("Received request:", req.body);

  conn.query(
    "SELECT * FROM users WHERE username = ? OR user_email = ?",
    [username, email],
    async (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Server error");
      }

      if (result.length > 0) {
        console.log("User already exists:", result);
        return res.status(409).send("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      conn.query(
        "INSERT INTO users (username, user_email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Server error");
          }

          console.log("User registered successfully:", result);
          res.status(201).send("User registered successfully");
        },
      );
    },
  );
});

// Login Route
app.post("/", (req, res) => {
  const { username, password } = req.body;

  // Find user
  conn.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server error");
      }

      if (result.length === 0) {
        return res.status(404).send("User not found");
      }

      const user = result[0];

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).send("Invalid credentials");
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.user_id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1h" },
      );

      // Send token and user_id back to client
      res.json({
        message: "User logged in successfully",
        token: token,
        user_id: user.user_id,
      });
    },
  );
});