const router = require('express').Router();

const mongoose = require('mongoose');

const App = require('../models/App.model');

// GET ROUTE that gets all the projects
router.get('/apps', async(req,res) => {
    try{
        let allApps = await App.find()
        res.json(allApps)
    } catch (error) {
        res.json(error);
    } 
})

module.exports = router;