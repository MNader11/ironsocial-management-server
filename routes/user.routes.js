// Require Packages
const router = require("express").Router();

const mongoose = require("mongoose");
const {isAuthenticated} = require("../middleware/jwt.middleware")

// Require Data Models
const User = require('../models/User.model');

// Get Route that gets user profile
router.get("/profile", isAuthenticated, async (req, res) => {
    const user = req.payload;
    try {
      let userInfo = await User.findById(user._id).populate('userTickets').populate('userProjects');
      res.json(userInfo);
    } catch (error) {
      res.json(error);
    }
  });

module.exports = router;

