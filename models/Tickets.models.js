const { Schema, model } = require("mongoose");

const ticketSchema = new Schema({
    project: String,
    image: String,
    description: String,
    contact: String,
    userName: [{ type: Schema.Types.ObjectId, ref:'User' }],
    userComments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Ticket = model('Ticket', ticketSchema);

module.exports = Ticket;