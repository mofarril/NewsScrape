// Dependencies
var express = require("express");
var mongoose = require('mongoose')
var logger = require('morgan');
var exphbs = require("express-handlebars");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");
var article = require('./controller/article')

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Database configuration
var databaseNPR = "scraper";
var collections = ["nprScrapeData"];

// Routes
require("./routes/apiRoutes")(app);
//require("./routes/htmlRoutes")(app);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://user:password1@ds347298.mlab.com:47298/heroku_k935zqtq";
mongoose.connect(MONGODB_URI)


// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port" + PORT + "!");
});
