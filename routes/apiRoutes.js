var db= require("../models");
var axios = require("axios");
module.exports = function (app) {

    // Main route (simple Hello World Message)
    app.get("/", function (req, res) {
        res.send("Hello world");
    });

    // Retrieve data from the db
    app.get("/api/all", function (req, res) {
        // Find all results from the NPR collection in the db
        article.findAll().then((results) => res.json(results))
    });

    // Scrape data from one site and place it into the mongodb db
    app.get("/scrape", function (req, res) {
        // Make a request via axios for the news section of `ycombinator`
        axios.get("https://www.npr.org/").then(function (response) {
            // Load the html body from axios into cheerio
            var $ = cheerio.load(response.data);
            // For each element with a "title" class
            $("h3.title").each(function (i, element) {
                // Save the text and href of each link enclosed in the current element
                var title = $(element).text();
                var link = $(element).parent().attr("href");
                // var summary = $(element).children().class("teaser");
                // If this found element had both a title and a link
                console.log(title + '<=====================================================================')
                if (title && link) {
                    article.create({ title: title, body: link })
                }
            });
        });

        // Send a "Scrape Complete" message to the browser
        res.send("Scrape Complete");
    });

}
