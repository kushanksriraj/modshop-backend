const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  mobileNo: {
    type: String,
    trim: true,
    required: "Mobile number is required!"
  },
  address: {
    type: String,
    trim: true,
    required: "Address is required!"
  },
  pinCode: {
    type: String,
    trim: true,
    required: "Pin code is required!"
  },
  city: {
    type: String,
    trim: true,
    required: "City is required!"
  },
  state: {
    type: String,
    trim: true,
    required: "State is required!"
  }
});

const addressListSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  },
  addressList: [addressSchema]
}, { timestamps: true });

const Address = mongoose.model('Address', addressListSchema);

module.exports = { Address };