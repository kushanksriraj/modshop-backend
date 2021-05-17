const express = require('express');
const router = express.Router();
const _ = require('lodash');

const { Address } = require('../models/address.model');

const { catchError } = require('../utils');

const { getAllAddresses, addNewAddress } = require('../controller/address.controller');

router.route("/:userId")
  .get(async (req, res, next) => {
    getAllAddresses(req, res, next);
  })

  .post(async (req, res, next) => {
    addNewAddress(req, res, next);
  });


router.route("/:userId/:addressId")
  .get(async (req, res, next) => {

    catchError(next, async () => {
      const { userId, addressId } = req.params;
      const addresses = await Address.findById(userId);
      const address = _.find(addresses.addressList, (address) => address._id.toString() === addressId);

      res.json({
        success: true,
        address
      });
    });
  })

  .post(async (req, res, next) => {

    catchError(next, async () => {
      const { userId, addressId } = req.params;
      const { addressUpdate } = req.body;
      let address = await Address.findById(userId);

      address = _.extend(address, {
        addressList: _.map(address.addressList, addObj =>
          addObj._id.toString() === addressId ?
            _.extend(addObj, { ...addressUpdate })
            :
            addObj
        )
      });
      address.save();
      res.json({
        success: true,
        address
      });
    });
  })


  .delete(async (req, res, next) => {

    catchError(next, async () => {
      const { userId, addressId } = req.params;
      let address = await Address.findById(userId);

      address = _.extend(address, {
        addressList: _.filter(address.addressList, ({ _id }) =>
          _id.toString() !== addressId)
      });

      address.save();
      res.json({
        success: true,
        address
      });
    });
  })

module.exports = router;