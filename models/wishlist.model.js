const mongoose = require('mongoose');

const wishListSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  },
  wishListItems: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Product"
  }]
}, { timestamps: true });

const WishList = mongoose.model('WishList', wishListSchema);

module.exports = { WishList };