const express = require("express");

const router = express.Router();
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

/*get all users*/
router.get("/all", (_req, res) => {
  userModel
    .find({})
    .then(users => {
      res.send(users);
    })
    .catch(err => console.log(err));
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  //   const newUser = new userModel({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password,
  //     picture: req.body.picture
  //   });
  //   newUser
  //     .save()
  //     .then(user => {
  //       res.send(user);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       res.status(500).send("Server error");
  //     });

  //Check if this user already exisits
  let user = await userModel.findOne({ email: req.body.email });
  if (user) {
    return res.status(409).send("That user already exisits!");
  } else {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      // Store hash in your password DB.
      // Insert the new user if they do not exist yet
      try {
        const user = new userModel({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          picture: req.body.picture
        });
        await user.save();
        console.log("user saved");
        res.send(user);
      } catch (error) {
        console.log("in catch block");
        res.send(error);
      }
    });
    // Load hash from your password DB.
    // bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    //   result == true;
    // });
    // bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
    //   result == false;
    // });
  }
});

router.get("/test", (req, res) => {
  res.send({ msg: "Users test route." });
});
module.exports = router;
