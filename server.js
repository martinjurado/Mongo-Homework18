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

// Home page
app.get('/', function (req, res) {
    res.render('home');
});

// Saved articles page
app.get("/saved", function(req, res) {
    res.render("savedarticles");
});

// Get route for scraping the buzzfeed website
app.get("/scrape", function (req, res) {
    axios.get("https://www.elitedaily.com/").then(function (response) {

        var $ = cheerio.load(response.data);

        $(".fL").each(function (i, element) {
            
            // Empty Object to save the data scraped
            var result = {};

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

// display all articles
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

// shows article for specific id
app.get("/showall/:id", function(req, res) {
    
    // get id for each article
    var id = req.params.id;
    
    db.Article.findOne({_id: id})

    .then(function(dbArticle){
        
        // object containing article you just clicked
        var result = {
            title: dbArticle.title,
            subtitle: dbArticle.subtitle,
            link: dbArticle.link
        };

        // creates a new saved collection to mongodb
        db.savedArticle.create(result);
        console.log(dbArticle);
        res.json(dbArticle);
        
    })
    .catch(function(err) {
        res.json(err)
    });
});

// Shows all saved articles
app.get("/showsaved", function(req, res) {
    
    db.savedArticle.find({})
    .then(function(dbSaved){
        res.json(dbSaved);
    })
    .catch(function(err){
        res.json(err);
    });
})

app.delete("/deleteart/:id", function(req, res){
    
    var artID = req.params.id;
    db.savedArticle.findByIdAndDelete(artID, function(){
        res.render("savedarticles")
    })
});

// // posts article saved to savedarticles.handlebars
// app.post("/showall/:id", function(req, res){

//     res.render("savedarticles");
//     db.savedArticle.create(req.body)
//     .then(function(dbSaved){
//         res.json(dbSaved);
//     })
//     .catch(function(err){
//         res.json(err);
//     })
// });

app.listen(PORT, function () {
    console.log("App listening on port " + PORT + "!");
});