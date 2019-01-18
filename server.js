var express = require("express");
var mongoose = require("mongoose");

// Scraping Tools
var axios = require("axios");
var cheerio = require("cheerio");

// Require models
var db = require("./models")

var PORT = 3000;

// Initialize Express
var app = express();

// Handlebars 
var exphbs = require("express-handlebars");
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Configure middleware

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make a public static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/elite_db", { useNewUrlParser: true });

// Routes

// get route for scraping the buzzfeed website
app.get("/scrape", function (req, res) {
    axios.get("https://www.elitedaily.com/").then(function (response) {

        var $ = cheerio.load(response.data);

        $(".fL").each(function (i, element) {
            
            // Empty Object to save the data scraped
            var result = {};

            // Pic source 
            // $(this).find(".gg .je").each(function(i, element){
            //     result.source = $(this).attr("img", "src");
            // });


            // Title of article
            $(this).find(".gg .fN .fZ").each(function(i, element){
                result.title = $(this).text();
            });

            // Author 
            $(this).find(".gg .fN .f_").each(function(i, element){
                result.subtitle = $(this).text();
            });
            
            // Link to article
            result.link = $(this).attr("href");
            
            // logs scraped data
            console.log(result);

            db.Article.create(result)
            .then(function(dbArticle){
                console.log(dbArticle);
            })
            .catch(function(err) {
                console.log(err)
            });
            
        });
        // Send message to client
        res.send("Scrape Complete!");
    });
});

app.get("/showall", function(req, res) {

    // grabs all articles
    db.Article.find({})
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
});

app.get('/', function (req, res) {
    res.render('home');
});

app.listen(PORT, function () {
    console.log("App listening on port " + PORT + "!");
});