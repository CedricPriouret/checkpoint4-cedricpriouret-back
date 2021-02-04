const express = require("express");
const app = express();
const connection = require("./config");
const cors = require("cors");
const { connect } = require("./config");
const port = 3001;

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.use(cors());
app.use(express.json());

/* AJOUTER UN UTILISATEUR */

app.post("/create", (req, res) => {
  console.log(req.body);
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const age = req.body.age;
  const country = req.body.country;
  const mail = req.body.mail;

  connection.query(
    "INSERT INTO user (firstName, lastName, age, country, mail) VALUES (?, ?, ?, ?, ?)",
    [firstName, lastName, age, country, mail],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Valeur ajouter");
      }
    }
  );
});

/* OBTENIR LA LISTE DES UTILISATEURS */

app.get("/user", (req, res) => {
  connection.query("SELECT * FROM user", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/* METTRE A JOUR LA REGION D'UN UTILISATEUR */

app.put("/update", (req, res) => {
  const id = req.body.id;
  const country = req.body.country;
  connection.query(
    "UPDATE user SET country = ? WHERE id = ?",
    [country, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

/* SUPPRIMER UN UTILISATEUR */

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM user WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port port!`));
