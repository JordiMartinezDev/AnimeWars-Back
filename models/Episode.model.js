const { Schema, model } = require("mongoose");
// TODO: Please make sure you edit the User model to whatever makes sense in this case
const episodeSchema = new Schema(
  {
    name: {
      type: String,
    },
    number: {
      type: Number,
      required: true,
    },

    episodeImg: {
      type: String,
      default: "/images/profileuser.png",
    },
    isPremium: {
      type: Boolean,
      default: false,
      require: true,
    },
    episodeUrl: {
      type: String,
      require: true,
    },

    animeTitle: { type: Schema.Types.ObjectId, ref: "Anime" }, //Si vols treure el nom del anime fes servir populate.
    likeUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
const Episode = model("Episode", episodeSchema);
module.exports = Episode;
