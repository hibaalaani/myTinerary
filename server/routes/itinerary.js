const express = require("express");
const passport = require("passport");
const router = express.Router();

//HIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!!!!!
// const itineraryModel = require("../model/userModel");
// const userModel = require("../model/itineraryModel");

const userModel = require("../model/userModel");
const itineraryModel = require("../model/itineraryModel");

/*get all cities*/
router.get("/all", (_req, res) => {
  itineraryModel
    .find({})
    .then((itineraries) => {
      res.send(itineraries);
    })
    .catch((err) => console.log(err));
});
//this is how you implement a city route by specific city
router.get("/:name", (req, res) => {
  let itineraryRequested = req.params.name;
  console.log("itineraryRequested", itineraryRequested);
  itineraryModel
    .find({ name: itineraryRequested })
    .then((itinerary) => {
      res.send(itinerary);
    })
    .catch((err) => console.log(err));
});
/////////////post user to the itenerary
router.post("/:name/favorites", (req, res, next) => {
  let email = req.body.email;

  let name = req.params.name;

  itineraryModel.findOne({ name: name }).then((itinerary) => {
    itinerary.favorites.push(email);
    itinerary.save().then((saveditinerary) => {
      res.status(200).send(saveditinerary);
    });
  });
  userModel.findOne({ email: email }).then((user) => {
    user.favorites.push(name);
    user.save();
    res.send(user);
  });
});
///////////////////delete user from favorite itinerary

router.delete("/:name/favorites", (req, res, next) => {
  const name = req.params.name;
  const email = req.body.email;
  itineraryModel.findOne({ name: name }).then((itinerary) => {
    ///////apply js
    let index = itinerary.favorites.indexOf(email);
    itinerary.favorites.splice(index, 1);
    itinerary.save().then((saveditinerary) => {
      res.status(200).send(saveditinerary);
    });
  });
  userModel
    .findOne({ email: email })
    .then((user) => {
      let index = user.favorites.indexOf(name);
      user.favorites.splice(index, 1);
      user.save().then((saveditinerary) => {
        res.status(200).send(saveditinerary);
      });
    })

    .catch((err) => {
      res.status(500).send("Server error", err);
    });
});

/////////////post comment to the itenerary
router.post("/:name/comments", (req, res, next) => {
  const name = req.params.name;
  let comments = { msg: req.body.comments, email: req.body.email };

  itineraryModel.findOne({ name: name }).then((itinerary) => {
    itinerary.comments.push(comments);
    itinerary.save().then((saveditinerary) => {
      res.status(200).send(saveditinerary);
    });
  });
});

/////////////delete  comment from the itenerary
router.delete("/:name/comments", (req, res, next) => {
  const name = req.params.name;
  let comments = { msg: req.body.comments, email: req.body.email };

  itineraryModel.findOne({ name: name }).then((itinerary) => {
    let index = itinerary.comments.indexOf(comments);
    itinerary.comments.splice(index, 1);

    itinerary.save().then((saveditinerary) => {
      res.status(200).send(saveditinerary);
    });
  });
});
/////////Add itinerary
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body);
    const {
      name,
      profile,
      hashtags,
      price,
      rating,
      duration,
      activities,
    } = req.body;

    const newItinerary = new itineraryModel({
      name,
      profile,
      hashtags,
      price,
      rating,
      duration,
      activities,
    });
    newItinerary
      .save()
      .then((itinerary) => {
        res.send(itinerary);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Server error");
      });
  }
);

router.get("/test", (req, res) => {
  res.send({ msg: "itinerary test route." });
});
module.exports = router;
