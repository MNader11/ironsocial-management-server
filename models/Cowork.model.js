const { Schema, model } = require("mongoose");

const coworkSchema = new Schema ({
    image: String,
    name: String,
    location: String,
    price: Number,
    link: String
})

const Cowork = model('Cowork', coworkSchema);

module.exports = Cowork;