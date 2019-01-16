var express = require("express");
var mongoose = require("mongoose");

// Scraping Tools
var axios = require("axios");
var cheerio = require("cheerio");

// Require models
var db = require("./models")

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/buzzfeed_db", { useNewUrlParser: true });

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

// Routes

// get route for scraping the buzzfeed website
app.get("/scrape", function (req, res) {
    axios.get("https://www.buzzfeed.com/").then(function (response) {

        var $ = cheerio.load(response.data);

        $("div.xs-px05").each(function (i, element) {
            
            // Empty Object to save the data scraped
            var result = {};

            // Add title and subtitle 
            result.title = $(this).children("h2").text();
            result.subtitle = $(this).children("p").text();
            
            // logs scraped data
            console.log(result);
            
            // db.Article comes out undefined
            // db.Article.create(result)
            // .then(function(dbArticle){
            //     console.log(dbArticle);
            // })
            // .catch(function(err) {
            //     console.log(err)
            // });
        });
        // Send message to client
        res.send("Scrape Complete!");
    });
});

app.get('/', function (req, res) {
    res.render('home');
});

app.listen(PORT, function () {
    console.log("App listening on port " + PORT + "!");
});