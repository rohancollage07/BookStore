const mongoose = require('mongoose');
const schema = mongoose.Schema

const CustomerSchema = new schema({
    firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  address: {
   type: String,
   trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

})


module.exports = mongoose.model("Customer", CustomerSchema);








