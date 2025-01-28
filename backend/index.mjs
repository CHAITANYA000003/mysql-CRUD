import express from "express";
import mysql from "mysql2";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8080;
const TABLE = process.env.MYSQL_TABLE_NAME;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
});

app.get("/books", (req, res) => {
  const q = `SELECT * FROM ${TABLE}`;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    } else {
      return res.json(data);
    }
  });
});

app.post("/books", (req, res) => {
  const q = `INSERT INTO ${TABLE} (title, about, price, cover) VALUES (?)`;
  const values = [
    req.body.title,
    req.body.about,
    req.body.price,
    req.body.cover,
  ];
  // this is how we pass parameters to the query; the values will replace the '?' in the query
  db.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    } else {
      return res.json("Book has been added successfully");
    }
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id
  const q = "DELETE FROM books WHERE id=?"

  db.query(q, [bookId], (err, data) => {
    if(err) {
      console.log(err)
      return res.status(500).json({error: "Database error"})
    }
    else {
      return res.json("Book has been deleted successfully")
    }
  })
})

app.listen(8080, () => {
  console.log(`Server listening on port ${PORT}`);
});
