var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object

var CommentSchema = new Schema({
    // `title` is required and of type String
    name: {
        type: String,
        required: true
    },
    // `link` is required and of type String
    body: {
        type: String,
        required: true
    }
});

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;