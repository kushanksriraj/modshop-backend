const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

name: {
  type: String,
  trim: true,
  required: "Name is required!",
  maxLength: 50
},

brandName: {
  type: String,
  trim: true,
  required: "Brand name is required!",
  maxLength: 32
},
  
price: {
  type: Number,
  required: "Price is required!"
},

description: {
  type: String,
  trim: true,
  required: "Description is required!",
  minLength: [80, "Product description of minimum 80 characters required!"],
  maxLength: [200, "Product description of maximum 200 characters allowed!"],
},

imageUrl: {
  type: String,
  trim: true,
  required: "Product image url is required!"
},

stock: {
  type: Number,
  required: "Stock of product is required!",
},

assuredDelivery: {
  type: Boolean,
  required: true,
  default: false
},

discountPercentage: {
  type: Number,
  default: 0,
},

rating: {
  type: String,
  trim: true,
  default: "0",
},

onSale: {
  type: Boolean,
  default: false,
},

category: {
  type: String,
  trim: true,
  enum: ["Caps", "T-Shirt", "Hoodie", "Model car", "Keyring", "Backpack", "iPhone case"],
  required: "Product category is required!"
}

}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };