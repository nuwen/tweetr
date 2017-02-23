"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // ==> We have a connection to the "test-tweets" db,
  //     starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // ==> In typical node-callback style, any program
  //     logic that needs to use the connection needs
  //     to be invoked from within here.
  //
  // Another way to say: this is an "entry point" for
  // a database-connected application!
  function getTweets(callback) {
    db.collection("tweets").find().toArray(callback);

    // db.collection('tweets').find().toArray((err, tweets) => {
    //   if (err){
    //     return callback(err);
    //   }
    //   const sortNewestFirst = (a, b) => a.created_at - b.created_at;
    //   callback(null, db.collection("tweets").find().sort(sortNewestFirst).toArray());
    // });
  }


  getTweets((err, tweets) => {
    if(err) {
      throw err;
    }

    console.log("Logging of each tweet: ");
    for (let tweet of tweets){
      console.log(tweet);
    }
    db.close();
  });
  // ==> At the end, we close the connection:
});
