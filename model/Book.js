const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    desciption: {
        type : String,
        required : true
    },
    price: {
        type : Number,
        required : true
    },
    available: {
        type : Boolean,
        required : true
    }

})

module.exports = mongoose.model("book", bookSchema);












