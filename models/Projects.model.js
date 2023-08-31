//defining the skeleton of a MONGODB Document
const { Schema, model } = require("mongoose");

const projectsSchema = new Schema ({
    image: String,
    name: String,
    link: String
});

// Export the Model
const Projects = model('Projects', projectsSchema);

module.exports = Projects;