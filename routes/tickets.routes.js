// Require Packages
const router = require("express").Router();

const mongoose = require("mongoose");
const {isAuthenticated} = require("../middleware/jwt.middleware")
// Require Data Models
const Ticket = require("../models/Tickets.models");
const User = require("../models/User.model")

// Post Route that creates a new ticket
router.post("/tickets/create", isAuthenticated, async (req, res) => {
  const user = req.payload;
  const { project, image, description, contact } = req.body;
  try {
    let newTicket = await Ticket.create({
      project,
      image,
      description,
      contact,
    });
    await Ticket.findByIdAndUpdate(newTicket._id, {
      $push: { userName: user._id },
    });
    await User.findByIdAndUpdate(user._id, {
        $push: { userTickets: newTicket._id },
      });
    res.json(newTicket);
  } catch (error) {
    res.json(error);
  }
});

// Get Route that gets all the tickets
router.get("/tickets", async (req, res) => {
  try {
    let allTickets = await Ticket.find();
    res.json(allTickets);
  } catch (error) {
    res.json(error);
  }
});

// Get Route that gets info of a specific ticket
router.get("/tickets/:ticketId", async (req, res) => {
  const { ticketId } = req.params;
  try {
    let foundTicket = await Ticket.findById(ticketId);
    res.json(foundTicket);
  } catch (error) {
    res.json(error);
  }
});

// Put Route to update ticekts info
router.put("/tickets/:ticketId/update", async (req, res) => {
  const { ticketId } = req.params;
  const { project, image, userName, description, contact } = req.body;

  try {
    let updateTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { project, image, userName, description, contact },
      { new: true }
    );
    res.json(updateTicket);
  } catch (error) {
    res.json(error);
  }
});

// Delete Route to delete a ticket
router.delete("/tickets/:ticketId/delete", async (req, res) => {
  const { ticketId } = req.params;
  try {
  } catch (error) {
    res.render(json);
  }
});

// Exporting Express Router with all its routes
module.exports = router;
