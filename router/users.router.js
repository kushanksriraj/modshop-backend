const express = require('express');
const router = express.Router();
const _ = require('lodash');

const { User } = require('../models/users.model');
const { catchError } = require('../utils');

router.route("/")
  .post(async (req, res, next) => {

    catchError(next, async () => {
      const { user: { email, password } } = req.body;
      const user = await User.findOne({email});

      if (user && user.password === password) {
        return res.json({
          success: true,
          user: _.pick(user, ["_id", "name", "email"])
        });
      }

      res.json({
        success: false,
        message: "User not found!"
      });
    });
  })

router.route("/:userId")
  .get(async (req, res, next) => {

    catchError(next, async () => {

      const { userId } = req.params;
      let user = await User.findById(userId);
      user = _.pick(user, ["_id", "name", "email"]);

      res.json({
        success: true,
        user
      });
    });
  })

router.route("/new")
  .post(async (req, res, next) => {

    catchError(next, async () => {

      const { user } = req.body;
      let newUser = new User(user);
      newUser = await newUser.save();

      res.json({
        success: true,
        user: _.pick(newUser, ["_id", "name", "email"])
      });
    });
  })

module.exports = router;