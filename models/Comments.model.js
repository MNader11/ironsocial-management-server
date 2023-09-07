const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    content: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userProjects: [{ type: Schema.Types.ObjectId, ref:'Projects' }]
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;