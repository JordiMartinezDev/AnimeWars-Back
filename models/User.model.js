const { Schema, model } = require("mongoose");
// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+.\S+$/, "Please use a valid email address."],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
      default: "/images/profileuser.png",
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isPremium:{
      type: Boolean,
      default: false
    },
    likedEpisodesId: [{ type: Schema.Types.ObjectId, ref: "Episode" }],
    followedAnimeId: [{ type: Schema.Types.ObjectId, ref: "Anime" }],
    uploadedEpisodesId: [{ type: Schema.Types.ObjectId, ref: "Episode" }],
  },
  
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
const User = model("User", userSchema);
module.exports = User;


