const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../data/helpers/dbHelpers");
const router = express.Router();

router.post("/api/register",  (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 16);

  user.password = hash;

  db.add(user)
    .then(savedUser => {
      res.status(201).json(savedUser);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/api/login", (req, res) => {
  const { userName, password } = req.body;

  db.findUser({ userName })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: ` Welcome ${user.userName}` });
      } else {
        res.status(401).json({ message: "You shall not pass" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function restricted(req, res, next) {
  const { userName, password } = req.headers;

  if (username && password) {
    db.findUser({ userName })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: "You shall not pass" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Unexpected error" });
      });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
}

router.get("/api/users", restricted, (req, res) => {
  db.getUsers()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
