const router = require('express').Router();

const mongoose = require('mongoose');
const { isAuthenticated } = require('../middleware/jwt.middleware');
// Require Data Models
const Project = require('../models/Projects.model');
const User = require('../models/User.model');

// POST ROUTE that Creates a new Project
router.post('/projects/create', isAuthenticated, async (req,res) => {
    const user = req.payload;
    const {image, name, link, description} = req.body;
    try{
      let newProject = await Project.create({image, name, link, description})
      await Project.findByIdAndUpdate(newProject._id, {
        $push:  {userName: user._id},
      });
      await User.findByIdAndUpdate(user._id, {
        $push: { userProjects: newProject._id},
      });
    res.json(newProject);
    } catch (error) {
        res.json(error)
    }
});

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

// Get Route that gets all the projects of each user
router.get("/myProjects", isAuthenticated, async (req, res) => {
  const user = req.payload;
  try {
    const userWithProjects = await User.findById(user._id).populate("userProjects");
    res.json(userWithProjects);
  } catch (error) {
    res.json(error);
  }
});

// Get Route that gets info of a specific ticket
router.get("/projects/:projectId", async (req, res) => {
    const { projectId } = req.params;
    try {
      let foundProject = await Project.findById(projectId);
      res.json(foundProject);
    } catch (error) {
      res.json(error);
    }
  });

  // Put Route to update ticekts info
router.put('/projects/:projectId/update', async(req,res) =>
{
    const {projectId} = req.params;
    const {image, name, link, description} = req.body;

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

