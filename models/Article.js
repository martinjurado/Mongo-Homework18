var mongoose = require("mongoose");

// save a reference to the schema constructor
var Schema = mongoose.Schema;

// Create a new schema
var ArticleSchema = new Schema ({

    // source:{
    //     type: String,
    //     required: true
    // },

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

    // note: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Note"
    // }

});

// Creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;