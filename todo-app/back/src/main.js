const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3");
const path = require("path");
const db = new sqlite3.Database(path.join(__dirname, "../db.sqlite3"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS todo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      done INTEGER,
      description TEXT
    )`
  );
  // テストデータを作成
  // const query = db.prepare(
  //   `INSERT INTO todo (title, done, description) VALUES (?, ?, ?)`
  // );
  // query.run(["牛乳を買う", 0, "1000mlパックで"]);
  // query.run(["洗濯をする", 0, "朝10時までに絶対に終わらせる"]);
  // query.run(["掃除をする", 0, "部屋の片付けをする"]);
});

// app.get("/posts", (req, res) => {
//   db.all("SELECT * FROM post", (err, rows) => {
//     res.send(rows);
//   });
// });

app.get("/todo", (req, res) => {
  db.all("SELECT * FROM todo", (err, rows) => {
    res.send(rows);
  });
});

app.post("/todo", (req, res) => {
  const query = db.prepare(
    `INSERT INTO todo (title, done, description) VALUES (?, ?, ?)`
  );
  query.run([req.body.title, req.body.done, req.body.description]);
  res.send("OK");
  console.log(req.body);
});

// app.get("/posts/:id", (req, res) => {
//   db.get("SELECT * FROM post WHERE id = ?", [req.params.id], (err, row) => {
//     res.send(row);
//   });
// });

// app.post("/posts", (req, res) => {
//   const query = db.prepare(
//     `INSERT INTO post (title, content, created_at, updated_at) VALUES (?, ?, ?, ?)`
//   );
//   query.run([req.body.title, req.body.content, new Date(), new Date()]);
//   res.send("OK");
// });

// app.put("/posts/:id", (req, res) => {
//   const query = db.prepare(
//     `UPDATE post SET title = ?, content = ?, updated_at = ? WHERE id = ?`
//   );
//   query.run([req.body.title, req.body.content, new Date(), req.params.id]);
//   res.send("OK");
// });

// app.delete("/posts/:id", (req, res) => {
//   db.run("DELETE FROM post WHERE id = ?", [req.params.id]);
//   res.send("OK");
// });
