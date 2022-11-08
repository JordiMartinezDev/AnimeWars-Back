const { Schema, model } = require("mongoose");
// TODO: Please make sure you edit the User model to whatever makes sense in this case
const episodeSchema = new Schema(
  {
    anime: {
      type: String,
      required:true
    },
    number: {
      type: Number,
      required: true,
    },

    episodeImg: {
      type: String,
      default: "https://www3.animeflv.net/uploads/animes/thumbs/3707.jpg",
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    episodeUrl: {
      type: String,
    },
    views: {
      type: Number,
    },

    animeId: { type: Schema.Types.ObjectId, ref: "Anime" }, //Si vols treure el nom del anime fes servir populate.
    likeByUsersId: [{ type: Schema.Types.ObjectId, ref: "User" }],
    uploadedByUserId: [{ type: Schema.Types.ObjectId, ref: "User" }],
    
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
const Episode = model("Episode", episodeSchema);
module.exports = Episode;
