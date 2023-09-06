// Require Packages
const router = require("express").Router();

const mongoose = require("mongoose");
const {isAuthenticated} = require("../middleware/jwt.middleware")

const Project = require("../models/Projects.model");
const Ticket = require('../models/Tickets.models')
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");

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
  
  // Favorites Routes (R-U-D)
  // Read
  router.get("/user/favorites", isAuthenticated, async (req, res) => {
    const currentUser = req.payload;
    try {
      const userFavorites = await User.findById(currentUser._id).populate(
        "favorites"
      );
      res.render("user/favorites", { currentUser, userFavorites });
    } catch (error) {
      console.log("Error Favorites: ", error);
    }
  });
  
  // Update
  router.post("/user/favorites/add/:ticketId", isAuthenticated, async (req, res) => {
    const currentUser = req.payload;
    try {
      const { ticketId } = req.params;
      await User.findByIdAndUpdate(currentUser._id, {
        $push: { favorites: ticketId },
      });
      res.json("/user/favorites");
    } catch (error) {
      console.log("Error Setting Favorite: ", error);
    }
  });
  
  // Delete
  router.post("/user/favorites/remove/:ticketId", isAuthenticated, async (req, res) => {
    const currentUser = req.payload;
    try {
      const { ticketId } = req.params;
      await User.findByIdAndUpdate(currentUser._id, {
        $pull: { favorites: ticketId },
      });
      res.json(`/user/favorites`);
    } catch (error) {
      console.log("Error Setting Favorite: ", error);
    }
  });
  
  // Comments Routes (C-(R)-D)
  // Read - This page is not implemented and the route isn't finished... yet
  router.get("/user/comments", isAuthenticated, async (req, res) => {
    const currentUser = req.payload;
    try {
      await User.findById(currentUser._id).populate(
        "comments"
      );
      res.json("user/comments", { currentUser });
    } catch (error) {
      console.log("Error Comments: ", error);
    }
  });
  
  // Create
  router.post("/user/comments/add/:ticketId", isAuthenticated, async (req, res) => {
    const currentUser = req.payload;
    const { ticketId } = req.params;
    try {
      const { content } = req.body;
      let newComment = await Comment.create({ content });
      await Comment.findByIdAndUpdate(newComment._id, {
        $push: { author: currentUser._id },
      });
      await Comment.findByIdAndUpdate(newComment._id, {
        $push: { projectRelated: ticketId },
      });
      await User.findByIdAndUpdate(currentUser._id, {
        $push: { comments: newComment._id },
      });
      await Project.findByIdAndUpdate(ticketId, {
        $push: { comments: newComment._id },
      });
      res.json(`/projects/${ticketId}`);
    } catch (error) {
      console.log("Error Setting Comment: ", error);
    }
  });
  
  // Delete
  router.post(
    "/user/comments/remove/:commentId/:ticketId",
    isAuthenticated,
    async (req, res) => {
      const currentUser = req.payload.currentUser;
      const { commentId, ticketId } = req.params;
      try {
        await Comment.findByIdAndRemove(commentId);
        await User.findByIdAndUpdate(currentUser._id, {
          $pull: { comments: commentId },
        });
        await Project.findByIdAndUpdate(ticketId, {
          $pull: { comments: commentId },
        });
        res.redirect(`/projects/${ticketId}`);
      } catch (error) {
        console.log("Error Deleting Comment: ", error);
      }
    }
  );

module.exports = router;


