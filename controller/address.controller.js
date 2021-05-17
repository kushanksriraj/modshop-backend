const { catchError } = require('../utils');
const { Address } = require('../models/address.model');

const getAllAddresses = (req, res, next) => {
  catchError(next, async () => {
      const { userId } = req.params;
      const addressList = await Address.findById(userId);

      res.json({
        success: true,
        addressList
      });
    });
}

const addNewAddress = (req, res, next) => {
   catchError(next, async () => {
      const { userId } = req.params;
      const { newAddress } = req.body;

      let address = await Address.findById(userId);

      if (!address) {
        const newUserAddress = new Address({ _id: userId, addressList: [{ ...newAddress }] });
        newUserAddress.save();

        return res.status(201).json({
          success: true,
          newUserAddress
        })
      }

      address = _.extend(address, {
        addressList: _.concat(address.addressList, {
          ...newAddress
        })
      });
      await address.save();

      res.status(201).json({
        success: true,
        address
      })
    });
}



module.exports = { getAllAddresses, addNewAddress };