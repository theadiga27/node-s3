const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    name: {
        type:String,
        required:[true, "Book should have name"],
    },
    author:{
        type:String,
        required:[true, "Book should have author"],
    },
    imageUrl:{
        type:String,
        required:[true,"Book should have image"],
    },
    key:{
        type:String,
        required:[true, "Book should have key"],
    },
})

module.exports = mongoose.model("Book",bookSchema);