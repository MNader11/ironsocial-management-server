const router = require('express').Router();

const mongoose = require('mongoose');

const Project = require('../models/Projects.model');

// POST ROUTE that Creates a new Project
router.post('/projects/create', async (req,res) => {
    const {image, name, link} = req.body;
    try{
        let response =await Project.create({image, name, link})
        res.json(response);
    }catch (error){
        res.json(error)
    }
})

// GET ROUTE that gets all the projects
router.get('/projects', async(req,res) => {
    try{
        let allProjects = await Project.find()
        console.log(allProjects)
        res.json(allProjects)
    }
     catch (error) {
        res.json(error)
    } 
})

router.put('/projects/:projectId/update', async(req,res) =>
{
    const {projectId} = req.params;
    const {image, name, link} = req.body;

    try{
       let updateProjects = await Project.findByIdAndUpdate(projectId, {image, name, link}, {new:true});
       res,json(updateProjects);
    }
    catch(error){
        res.json(error);
    }
})

router.delete('/projects/:projectId/delete', async(req,res) =>{
    const {projectId} = req.params;

    try{
        await Project.findByIdAndDelete(projectId)
        res.json({message: 'Project Delete'})
    }
    catch (error) {
        res.json(error)
    }
})

module.exports = router;

