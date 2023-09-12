// models/Order.js

const mongoose = require('mongoose')
const Customer = require('./Customer')
const Book = require('./Book')

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Customer,
    required: true,
  },
  books: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Book,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Order', orderSchema)
