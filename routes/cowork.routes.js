const router = require('express').Router();

const mongoose = require('mongoose');

const Cowork = require('../models/cowork.model');

// Get Route that gets all coworks
router.get('/coworks', async(req,res) => {
    try{
        let allCoworks = await Cowork.find();
        res.json(allCoworks)
    } catch (error) {
    res.json(error) 
}
})
 
module.exports = router;