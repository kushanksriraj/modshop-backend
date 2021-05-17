const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  paymentMethod: {
    type: String,
    trim: true,
    enum: ["UPI", "CREDIT CARD", "DEBIT CARD", "COD"],
    required: "Method name is required",
  },
  cardNo: {
    type: String,
    trim: true,
  },
  nameOnCard: {
    type: String,
    trim: true,
  },
  expiry: {
    type: String,
    trim: true,
  },
  upi: {
    type: String,
    trim: true,
  }
});

const paymentListSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  },
  paymentMethodList: [paymentSchema]
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentListSchema);
module.exports = { Payment };