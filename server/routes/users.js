const express = require("express");

const router = express.Router();
const usersModel = require("../model/usersModel");

/*get all users*/
router.get("/all", (_req, res) => {
  usersModel
    .find({})
    .then(users => {
      res.send(users);
    })
    .catch(err => console.log(err));
});
//this is how you implement a users route by specific city
router.get("/Login", (req, res) => {
  let usersRequested = req.params.Login;
  usersModel
    .findOne({ Login: usersRequested })
    .then(Login => {
      res.send(Login);
    })
    .catch(err => console.log(err));
});

router.get("/test", (req, res) => {
  res.send({ msg: "Cities test route." });
});
module.exports = router;
