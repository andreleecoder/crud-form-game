const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const PORT = 3001
const db = mysql.createPool({
  host: "us-cdbr-east-06.cleardb.net",
  user: "b026e89c1ac3fc",
  password: "7c504801",
  database: "heroku_bec79e5944c0fef",
});

/*database heroku
mysql://b026e89c1ac3fc:7c504801@us-cdbr-east-06.cleardb.net/heroku_bec79e5944c0fef?reconnect=true
database heroku*/
app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;
  let SQL = "INSERT INTO games( name, cost, category) VALUES (?,?,?)";
  db.query(SQL, [name, cost, category], (err, result) => {
    if(err)console.log(err);
    else res.send(result)
  });
});
app.get("/getCards", (req, res) => {
  let SQL = "SELECT * FROM  games";
  db.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
    } else res.send(result);
  });
});
app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;
  let SQL = "UPDATE games SET name=?, cost=?, category=? WHERE idgames = ? ";

  db.query(SQL, [name, cost, category, id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let SQL = "DELETE FROM games WHERE idgames =?"
  db.query(SQL, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`rodando servidor ${PORT}`);
});
