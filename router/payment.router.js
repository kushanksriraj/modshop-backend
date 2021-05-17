const express = require('express');
const router = express.Router();
const _ = require('lodash');

const { Payment } = require('../models/payments.model');
const { catchError } = require('../utils');

router.route("/:userId")
  .get(async (req, res, next) => {

    catchError(next, async () => {
      const { userId } = req.params;

      const payments = await Payment.findById(userId);

      res.json({
        success: true,
        payments
      });
    });
  })

  .post(async (req, res, next) => {

    catchError(next, async () => {
      const { userId } = req.params;
      const { newPayment } = req.body;

      let payment = await Payment.findById(userId);

      if (!payment) {
        const newPaymentFromDb = new Payment({ _id: userId, paymentMethodList: [{ ...newPayment }] });
        await newPaymentFromDb.save();
        return res.status(201).json({
          success: true,
          newPaymentFromDb
        });
      }

      payment = _.extend(payment, { paymentMethodList: _.concat(payment.paymentMethodList, { ...newPayment }) });

      await payment.save();

      res.status(201).json({
        success: true,
        payment
      });

    });
  });

router.route("/:userId/:paymentId")

  .get(async (req, res, next) => {

    catchError(next, async () => {
      const { userId, paymentId } = req.params;
      const payments = await Payment.findById(userId);

      const payment = _.find(payments.paymentMethodList, (payment) => payment._id.toString() === paymentId);

      res.json({
        success: true,
        payment
      });
    });
  })

  .post(async (req, res, next) => {

    catchError(next, async () => {
      const { userId, paymentId } = req.params;
      const { updatePayment } = req.body;
      let payment = await Payment.findById(userId);

      payment = _.extend(payment, {
        paymentMethodList: _.map(payment.paymentMethodList, (item) =>
          item._id.toString() === paymentId ?
            _.extend(item, { ...updatePayment })
            : item
        )
      });

      await payment.save();

      res.json({
        success: true,
        payment
      });
    });
  })

  .delete(async (req, res, next) => {

    catchError(next, async () => {
      const { userId, paymentId } = req.params;
      let payment = await Payment.findById(userId);

      payment = _.extend(payment, { paymentMethodList: _.filter(payment.paymentMethodList, (item) => item._id.toString() !== paymentId) })

      await payment.save();

      res.json({
        success: true,
        payment
      });
    });

  });


module.exports = router;