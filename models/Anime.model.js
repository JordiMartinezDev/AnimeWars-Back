const { Schema, model } = require("mongoose");
// TODO: Please make sure you edit the User model to whatever makes sense in this case
const animeSchema = new Schema(
  {
    name: {
      type: String,

      unique: true,
    },
    category: {
      type: String,
      enum: ["Shonen", "Drama", "Action"],
    },

    
    description: {
      type: String,
      default: "Serie Anime",
    },
    animeImage: {
      type: String,
      default: "https://www3.animeflv.net/uploads/animes/thumbs/3707.jpg",
    },
    episodes: [{ type: Schema.Types.ObjectId, ref: "Episode" }],
    followedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
const Anime = model("Anime", animeSchema);
module.exports = Anime;
