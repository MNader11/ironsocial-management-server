const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    content: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userProjects: [{ type: Schema.Types.ObjectId, ref:'Project' }]
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;