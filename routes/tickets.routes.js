// Require Packages
const router = require('express').Router();

const mongoose = require('mongoose');

// Require Data Models
const Ticket = require('../models/Tickets.models')

// Post Route that creates a new ticket
router.post('/tickets', async (req,res) => {
    const {project, image, userName, description, contact} = req.body;
    try {
        let response = await Ticket.create({project, image, userName, description, contact})
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})

// Get Route that gets all the tickets
router.get('/tickets', async(req,res) => {
    try {
        let allTickets = await Ticket.find();
        res.json(allTickets)
    } catch (error) {
        res.json(error)
    }
})

// Get Route that gets info of a specific ticekt
router.get('/tickets/:ticketId', async (req,res) => {
    const {ticketId} = req.params;
    try {
        let foundTicket = await Ticket.findById(ticketId);
        res.json(foundTicket);
    } catch (error) {
        res.json(error);
    }
})

// Put Route to update ticekts info
router.put('/tickets/:ticketId', async(req,res) => {
    const {ticketId} = req.params;
    const {project, image, userName, description, contact} = req.body;

    try {
        let updateTicket = await Ticket.findByIdAndUpdate(ticketId, {project, image, userName, description, contact}, {new: true});
        res.json(updateTicket);
    } catch (error) {
        res.json(error);
    }
})

// Delete Route to delete a ticket
router.delete('/tickets/:ticketId', async(req,res) => {
    const {ticketId} = req.params;
    try {

    } catch (error) {
        res.render(json);
    }
});

// Exporting Express Router with all its routes
module.exports = router;