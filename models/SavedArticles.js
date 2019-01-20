var mongoose = require("mongoose");

// save a reference to the schema constructor
var Schema = mongoose.Schema;

// Create a new schema
var SavedArticleSchema = new Schema ({

    title: {
        type: String,
        required: true
    },

    subtitle: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    }
});

// Creates our model from the above schema, using mongoose's model method
var savedArticle = mongoose.model("Saved", SavedArticleSchema);

module.exports = savedArticle;