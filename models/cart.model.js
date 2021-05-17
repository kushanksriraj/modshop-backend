const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  },
  cartItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId, ref: "Product"
    },
    quantity: {
      type: Number,
      required: "Cannot add to cart without quantity!"
    }
  }]
}, { timestamps: true });

const CartList = mongoose.model('CartList', cartSchema);

module.exports = { CartList };
