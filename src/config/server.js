const conn = require("./connection.js");
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

app.get("/", (req, res) => {
  res.send("Hello World!");
});
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
    "SELECT * FROM users WHERE user_name = ? OR user_email = ?",
    [username, email],
    async (err, result) => {
      if (err) {
        console.error("Database error (select):", err);
        return res.status(500).send("Server error");
      }

      if (result.length > 0) {
        console.log("User already exists:", result);
        return res.status(409).send("User already exists");
      }

      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password:", hashedPassword);

        conn.query(
          "INSERT INTO users (user_name, user_email, password) VALUES (?, ?, ?)",
          [username, email, hashedPassword],
          (err, result) => {
            if (err) {
              console.error("Database error (insert):", err);
              return res.status(500).send("Server error");
            }

            console.log("User registered successfully:", result);
            res.status(201).send("User registered successfully");
          },
        );
      } catch (hashError) {
        console.error("Error hashing password:", hashError);
        return res.status(500).send("Server error during password hashing");
      }
    },
  );
});

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Received login request:", req.body);

  try {
    // Find user
    conn.query(
      "SELECT * FROM users WHERE user_name = ?;",
      [username],
      async (err, result) => {
        console.log("Database query result:", result);
        if (err) {
          console.error("Database error:", err);
          return res.status(500).send("Server error");
        }

        if (result.length === 0) {
          console.log("User not found");
          return res.status(404).send("User not found");
        }

        const user = result[0];
        console.log("User found:", user);

        // Log the passwords for debugging (Remove this in production)
        console.log("Provided password:", password);
        console.log("Stored hashed password:", user.password);

        // Check password
        try {
          const isMatch = await bcrypt.compare(password, user.password);
          console.log("Password comparison result:", isMatch);

          if (!isMatch) {
            console.log("Passwords do not match");
            return res.status(401).send("Invalid credentials");
          }

          // Generate JWT token
          console.log("Passwords match, generating token");
          const token = jwt.sign(
            { id: user.user_id, username: user.user_name },
            JWT_SECRET,
            { expiresIn: "1h" },
          );
          console.log("User logged in successfully");

          // Send token and user_id back to client
          return res.json({
            message: "User logged in successfully",
            token: token,
            user_id: user.user_id,
          });
        } catch (compareError) {
          console.error("Error comparing passwords:", compareError);
          return res
            .status(500)
            .send("Server error during password comparison");
        }
      },
    );
  } catch (error) {
    console.error("General server error:", error);
    res.status(500).send("Server error");
  }
});
