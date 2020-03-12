const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./keys").mongoURI;

const port = process.env.PORT || 5000;

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Connection to Mongo DB established"))
  .catch(err => console.log(err));

app.use(cors());

app.use(bodyParser.json()); // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
); // for parsing application/x-www-form-urlencoded

app.use("/api/cities", require("./routes/cities"));

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});
