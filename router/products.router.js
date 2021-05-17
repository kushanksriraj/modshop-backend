const express = require('express');
const router = express.Router();

const { Product } = require('../models/products.model');
const { catchError } = require('../utils');

router.route("/")
  .get(async (req, res, next) => {

    catchError(next, async () => {

      const products = await Product.find({});

      res.json({
        success: true,
        products
      });

    });
  })

  .post(async (req, res, next) => {

    catchError(next, async () => {

      const product = Product(req.body);
      await product.save();

      res.status(201).json({
        success: true,
        message: "Product saved",
        product
      });

    });

  })

router.get("/:id", async (req, res, next) => {

  catchError(next, async () => {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.json({
      success: true,
      product
    });
  });
})

module.exports = router;