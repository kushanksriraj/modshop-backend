const express = require('express');
const router = express.Router();
const _ = require('lodash');

const { Order } = require('../models/orders.model');
const { catchError } = require('../utils');

router.route("/:userId")
  .get(async (req, res, next) => {

    catchError(next, async () => {

      const { userId } = req.params;

      const orders = await Order.findById(userId).populate("orderList.product");

      res.json({
        success: true,
        orders
      });
    });
  })

  .post(async (req, res, next) => {

    catchError(next, async () => {

      const { userId } = req.params;
      const { newOrder } = req.body;

      let order = await Order.findById(userId);

      if(!order){
        const newUserOrder = new Order({ _id: userId, orderList:[{...newOrder}]});
        newUserOrder.save();

        return res.status(201).json({
          success: true,
          order: newUserOrder
         });
      }

      order = _.extend(order, { orderList: _.concat(order.orderList, { ...newOrder }) });
      order.save();

      res.status(201).json({
        success: true,
        order
      });
    });
  })

module.exports = router;