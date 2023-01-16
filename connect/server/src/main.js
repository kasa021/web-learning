const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("db.sqlite3");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS post (
      id INTEGER PRIMARY KEY,
      title TEXT,
      content TEXT,
      created_at TEXT,
      updated_at TEXT
    )`
  );
});

app.get("/posts", (req, res) => {
  db.all("SELECT * FROM post", (err, rows) => {
    res.send(rows);
  });
});

app.get("/posts/:id", (req, res) => {
  db.get("SELECT * FROM post WHERE id = ?", [req.params.id], (err, row) => {
    res.send(row);
  });
});

app.post("/posts", (req, res) => {
  const query = db.prepare(
    `INSERT INTO post (title, content, created_at, updated_at) VALUES (?, ?, ?, ?)`
  );
  query.run([req.body.title, req.body.content, new Date(), new Date()]);
  res.send("OK");
});

app.put("/posts/:id", (req, res) => {
  const query = db.prepare(
    `UPDATE post SET title = ?, content = ?, updated_at = ? WHERE id = ?`
  );
  query.run([req.body.title, req.body.content, new Date(), req.params.id]);
  res.send("OK");
});

app.delete("/posts/:id", (req, res) => {
  db.run("DELETE FROM post WHERE id = ?", [req.params.id]);
  res.send("OK");
});
