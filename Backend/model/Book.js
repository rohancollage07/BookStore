const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    author: {
        type : String,
        required : true
    },
    description: {
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
    },
    image: {
        type : String,
        required : true
    },
   quantity: {
        type : Number,
        required : true
    },
    quantity_available: { // Add the new field
        type : Number,
       
        default: this.quantity} // Set its value to the quantity field
})

module.exports = mongoose.model("book", bookSchema);












