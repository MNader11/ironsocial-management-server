const { Schema, model } = require("mongoose");

const CoworkSchema = new Schema ({
    image: String,
    name: String,
    location: String,
    price: Number,
    link: String
})

const Cowork = model('Cowork', CoworkSchema);

module.exports = Cowork;