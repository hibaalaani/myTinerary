const express = require("express");

const router = express.Router();
const cityModel = require("../model/cityModel");

/*get all cities*/
router.get("/all", (_req, res) => {
  cityModel
    .find({})
    .then(cities => {
      res.send(cities);
    })
    .catch(err => console.log(err));
});

router.post("/", (req, res) => {
  console.log(req.body);
  const newCity = new cityModel({
    name: req.body.name,
    country: req.body.country,
    picture: req.body.picture
  });
  newCity
    .save()
    .then(city => {
      res.send(city);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Server error");
    });
});
router.get("/test", (req, res) => {
  res.send({ msg: "Cities test route." });
});
module.exports = router;
