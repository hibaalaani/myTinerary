const express = require("express");

const router = express.Router();
const itineraryModel = require("../model/itineraryModel");

/*get all cities*/
router.get("/all", (_req, res) => {
  itineraryModel
    .find({})
    .then(itineraries => {
      res.send(itineraries);
    })
    .catch(err => console.log(err));
});
//this is how you implement a city route by specific city
router.get("/:name", (req, res) => {
  let itineraryRequested = req.params.name;
  itineraryModel
    .find({ name: itineraryRequested })
    .then(itinerary => {
      res.send(itinerary);
    })
    .catch(err => console.log(err));
});

router.post("/", (req, res) => {
  console.log("itinerary", req.body);
  const newItinerary = new itineraryModel({
    name: req.body.name,
    profile: req.body.profile,
    rating: req.body.rating,
    duration: req.body.duration,
    price: req.body.price,
    hashtags: req.body.hashtags,
    activities: req.body.activities
  });
  newItinerary
    .save()
    .then(itinerary => {
      res.send(itinerary);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Server error");
    });
});
router.get("/test", (req, res) => {
  res.send({ msg: "itinerary test route." });
});
module.exports = router;
