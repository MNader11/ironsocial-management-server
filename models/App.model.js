const { Schema, model } = require("mongoose");

const appSchema = new Schema ({
    image: String,
    name: String,
    deliveryType: String,
    link: String,
})

const App = model('App', appSchema);

module.exports = App;