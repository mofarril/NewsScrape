// Dependencies
var express = require("express");
//var mongojs = require("mongojs");
var mongoose = require('mongoose')
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");
var article = require('./controller/article')
// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Database configuration
var databaseNPR = "scraper";
var collections = ["nprScrapeData"];

// Hook mongojs configuration to the db variable
// var db = mongojs(databaseNPR, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoheadlines";
mongoose.connect(MONGODB_URI)
// Main route (simple Hello World Message)
app.get("/", function(req, res) {
  res.send("Hello world");
});

// Retrieve data from the db
app.get("/api/all", function(req, res) {
  // Find all results from the NPR collection in the db
  article.findAll().then((results)=>res.json(results))
});

// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req, res) {
  // Make a request via axios for the news section of `ycombinator`
  axios.get("https://www.npr.org/").then(function(response) {
    // Load the html body from axios into cheerio
    var $ = cheerio.load(response.data);
    // For each element with a "title" class
    $("h3.title").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      var title = $(element).text();
      var link = $(element).parent().attr("href");
     // var summary = $(element).children().class("teaser");
      // If this found element had both a title and a link
      console.log(title+'<=====================================================================')
      if (title && link) {
        // Insert the data in the NPR db
        // db.Summary.insert({
        //   title: title,
        //   link: link, 
        // //  summary: summary
        // },
        // function(err, inserted) {
        //   if (err) {
        //     // Log the error if one is encountered during the query
        //     console.log(err);
        //   }
        //   else {
        //     // Otherwise, log the inserted data
        //     console.log(inserted);
        //   }
        // });
        article.create({title:title, body: link})
      }
    });
  });

  // Send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});


// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port" + PORT + "!");
});
