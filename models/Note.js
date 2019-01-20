var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema ({

    body: {
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
var Article = mongoose.model("Notes", NoteSchema);

module.exports = Article;