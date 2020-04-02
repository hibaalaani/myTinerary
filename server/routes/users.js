const express = require("express");
const keys = require("../keys");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
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
  // const { errors, isValid } = validateRegisterInput(req.body);
  // // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  //Check if this user already exisits
  let user = await userModel.findOne({ email: req.body.email });
  if (user) {
    return res.status(409).send("That user already exisits!");
  } else {
    // Store hash in your password DB.
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      console.log(req);
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
  }
});

////////////////////////////////login user
router.post("/login", async (req, res) => {
  console.log(req.body);
  // Form validation
  // const { errors, isValid } = validateLoginInput(req.body);
  // // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  userModel.findOne({ email }).then(user => {
    // Check if user exists
    console.log("user", user);
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});
///////////authentication forthe user
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userModel
      .findOne({ _id: req.user.id })
      .then(user => {
        res.json(user);
      })
      .catch(err => res.status(404).json({ error: "User does not exist!" }));
  }
);
// router.get("/google", (req, res) => {});
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    console.log(req);
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
// router.get("/redirect", (req, res) => {});

router.get("/Account", (req, res) => {
  res.send("wellcom");
});

router.get("/test", (req, res) => {
  res.send({ msg: "Users test route." });
});
module.exports = router;
