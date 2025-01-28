import express from "express";
import mysql from "mysql2";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8080;
const TABLE = process.env.MYSQL_TABLE_NAME;

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
    } else {
      return res.json(data);
    }
  });
});

app.listen(8080, () => {
  console.log(`Server listening on port ${PORT}`);
});
