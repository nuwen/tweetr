"use strict";

// Basic express setup:

const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sassMiddleware = require('node-sass-middleware');
const path = require('path');

app.use(sassMiddleware({
  /* Options */
  src: '../public/sass',
  dest: '../public/styles',
  debug: true,
  outputStyle: 'compressed',
  prefix: '../public' // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

app.use('../public', express.static(path.join(__dirname, '../public')));



const {
  MongoClient
} = require('mongodb');
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // The in-memory database of tweets. It's a basic object with an array in it.
  // const db = require('mongodb://localhost:27017/tweeter');

  // The `data-helpers` module provides an interface to the database of tweets.
  // This simple interface layer has a big benefit: we could switch out the
  // actual database it uses and see little to no changes elsewhere in the code
  // (hint hint).
  //
  // Because it exports a function that expects the `db` as a parameter, we can
  // require it and pass the `db` parameter immediately:
  const DataHelpers = require("./lib/data-helpers.js")(db);

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

  app.post("/tweets/", (req, res) => {
    console.loq(req.body);
  });
});
