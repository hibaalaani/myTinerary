const express = require("express");

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
  let user = req.body.email;
  console.log(user);
  let itineraryRequested = req.params.name;
  itineraryModel.findOne({ name: itineraryRequested }).then((itinerary) => {
    itinerary.favorites.push(user);
    res.send(itinerary);
  });
});
///////////////////delete user from favorite itinerary

router.delete("/:name/favorites", (req, res) => {
  console.log("itinerary", req.body);
  const itinerary = req.params.name;
  const user = req.body.email;
  itineraryModel
    .findOneAndDelete({ favorites: user })
    .then((itinerary) => {
      res.send(itinerary.favorites);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server error");
    });
});

router.get("/test", (req, res) => {
  res.send({ msg: "itinerary test route." });
});
module.exports = router;
