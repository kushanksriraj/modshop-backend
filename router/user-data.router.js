const express = require('express');
const router = express.Router();

const { CartList } = require('../models/cart.model');
const { WishList } = require('../models/wishlist.model');
const { Order } = require('../models/orders.model');
const { Address } = require('../models/address.model');
const { Payment } = require('../models/payments.model');

const { catchError } = require('../utils');

router.get("/:userId", async (req, res, next) => {

  catchError(next, async () => {
    const { userId } = req.params;

    const [cart, wishlist, order, address, payment] = await Promise.all([
      CartList.findById(userId),
      WishList.findById(userId),
      Order.findById(userId),
      Address.findById(userId),
      Payment.findById(userId),
    ]);

    res.json({
      success: true,
      cartList: cart && cart.cartItems,
      wishList: wishlist && wishlist.wishListItems,
      orderList: order && order.orderList,
      addressList: address && address.addressList,
      paymentList: payment && payment.paymentMethodList
    });
  });
})

module.exports = router;