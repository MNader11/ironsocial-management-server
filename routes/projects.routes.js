const router = require('express').Router();

const mongoose = require('mongoose');

const Project = require('../models/Projects.model')

router.get('/projects', async(req,res) => {
    try{
        let allProjects = await Project.find()
        res.json(allProjects)
    } catch (error) {
        res.json(error)
    } 
})

module.exports = router;