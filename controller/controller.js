var db = require("../models");
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
            //creating empty array to hold article data
            var articleHolder = [];

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
                else {
                    console.log("Not saved. Missing data.")
                };
                if (articleHolder.indexOf(title) == -1) {
                    articleHolder.push(title && link);

                    Article.count((title), function (err, test){
                        if(test === 0 ){
                        var addArticle = new Article (articleHolder);
                        addArticle.save(function (err, doc){
                            if(err){
                                console.log(err);
                            } else {
                                console.log(doc);
                            }
                        })
                    }
                })
                }
                else {
                    console.log("article already exists")
                }
            }
            );
        });

        // Send a "Scrape Complete" message to the browser
        res.send("Scrape Complete");
        res.redirect("/");
    });

    app.get ("/articles", function (req, res){
        Article.find()
    })

}
