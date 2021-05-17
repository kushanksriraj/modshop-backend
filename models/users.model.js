const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required!"
  },

  email: {
    type: String,
    trim: true,
    unique: true,
    required: "Email is required!"
  },

  password: {
    type: String,
    trim: true,
    required: true
  },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = { User };
