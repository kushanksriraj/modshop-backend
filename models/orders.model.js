const mongoose = require('mongoose');
const { Payment } = require('../models/payments.model');

const orderSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId, ref: "Product"
  },
  quantity: {
    type: Number, 
    required: "Quantity is required!"
  },
  deliveryAddress: {
    type: mongoose.Schema.Types.ObjectId
  },
  paymentMethod: {
    type: mongoose.Schema.Types.ObjectId
  }
});


const orderListSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  },
  orderList: [orderSchema]
}, { timestamps: true });

const Order = mongoose.model('Order', orderListSchema);

module.exports = { Order };