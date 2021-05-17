const express = require('express');
const router = express.Router();
const _ = require('lodash');

const { CartList } = require('../models/cart.model');
const { catchError } = require('../utils');

router.route("/:userId")
  .get(async (req, res, next) => {

    catchError(next, async () => {
      const { userId } = req.params;
      const cartlist = await CartList.findById(userId).populate('cartItems.product');
      
      res.json({
        success: true,
        cartlist
      });
    });
  })

  .post(async (req, res, next) => {

    catchError(next, async () => {
      const { userId } = req.params;
      const { product } = req.body;

      let cartlist = await CartList.findById(userId);

      if (!cartlist) {
        const newCart = new CartList({ _id: userId, cartItems: [{ product: product._id, quantity: 1 }] })
        await newCart.save();

        return res.status(201).json({
          success: true,
          newCart
        });
      }

      cartlist = _.extend(cartlist, { cartItems: _.concat(cartlist.cartItems, { product: product._id, quantity: 1 }) });
      await cartlist.save();

      res.status(201).json({
        success: true,
        cartlist
      });

    });
  });

router.route("/:userId/:productId")
  .post(async (req, res, next) => {

    catchError(next, async () => {
      const { userId, productId } = req.params;
      const { quantity } = req.body;
      let cartlist = await CartList.findById(userId);

      cartlist = _.extend(cartlist, {
        cartItems: _.map(cartlist.cartItems, (item) =>
          item.product.toString() === productId ?
            _.extend(item, { quantity: quantity })
            : item
        )
      });
      await cartlist.save();

      res.json({
        success: true,
        cartlist
      });
    });
  })

  .delete(async (req, res, next) => {

    catchError(next, async () => {
      const { userId, productId } = req.params;
      let cartlist = await CartList.findById(userId);

      cartlist = _.extend(cartlist, { cartItems: _.filter(cartlist.cartItems, (item) => item.product.toString() !== productId) })
      await cartlist.save();

      res.json({
        success: true,
        cartlist
      });
    });

  });


module.exports = router;