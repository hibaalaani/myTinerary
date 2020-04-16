const express = require("express");
const passport = require("passport");
const router = express.Router();
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
  itineraryModel
    .find({ name: itineraryRequested })
    .then((itinerary) => {
      res.send(itinerary);
    })
    .catch((err) => console.log(err));
});
/////////////post user to the itenerary
router.post("/:name/favorites", (req, res) => {
  let email = req.body.email;
  // console.log(user);
  let name = req.params.name;
  itineraryModel.findOne({ name: name }).then((itinerary) => {
    itinerary.favorites.push(email);
    itinerary.save().then((saveditinerary) => {
      res.status(200).send(saveditinerary);
    });
  });
});
///////////////////delete user from favorite itinerary

router.delete("/:name/favorites", (req, res) => {
  const name = req.params.name;
  const email = req.body.email;
  itineraryModel
    .findOne({ name: name })
    .then((itinerary) => {
      ///////apply js
      let index = itinerary.favorites.indexOf(email);
      itinerary.favorites.splice(index, 1);
      itinerary.save().then((saveditinerary) => {
        res.status(200).send(saveditinerary);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server error");
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
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body);
    const newItinerary = new itineraryModel({
      name: req.body.name,
      profile: req.body.picture,
      hashtags: req.body.hashtags,
      price: req.body.price,
      rating: req.body.rating,
      duration: req.body.duration,
      activities: req.body.activities,
      //   favorites: req.body.favorites,
      //   comments: req.body.comments,
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
// router.post("/additinerary", (req, res) => {
//   const newItinerary = new itineraryModel({
//     name: req.body.name,
//     profile: req.body.picture,
//     hashtags: req.body.hashtags,
//     price: req.body.price,
//     rating: req.body.rating,
//     duration: req.body.duration,
//     activities: req.body.activities,
//   });
//   newItinerary
//     .save()
//     .then((itinerary) => {
//       res.send(itinerary);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send("Server error");
//     });
// });
router.get("/test", (req, res) => {
  res.send({ msg: "itinerary test route." });
});
module.exports = router;
