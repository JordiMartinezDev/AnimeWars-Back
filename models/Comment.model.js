const { Schema, model } = require("mongoose");
// TODO: Please make sure you edit the User model to whatever makes sense in this case
const commentSchema = new Schema({
  text: {
    type: string,
  },
  commentByUser: [{ type: Schema.Types.ObjectId, ref: "User" }],
  likeByUsersId: [{ type: Schema.Types.ObjectId, ref: "User" }],
  episodeCommented: [{ type: Schema.Types.ObjectId, ref: "Episode" }],
  // this second object adds extra properties: `createdAt` and `updatedAt`
  timestamps: true,
});
const Comment = model("Comment", commentSchema);
module.exports = Comment;
