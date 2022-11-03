const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Anime = require("../models/Anime.model");
const Episode = require("../models/Episode.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// router.post("/uploadVideo/:userId", (req, res, next) => {
//   Episode.create({
//     name: req.body.name,
//     number: req.body.number,
//     episodeImg: req.body.episodeImg,
//   })
//     .then((episode) => {
//       return User.findByIdAndUpdate(
//         req.params.userId,
//         { $push: { episodes: episode._id } },
//         { new: true }
//       );
//     })
// })

router.post("/uploadVideo/:userId", (req, res, next) => {
  Episode.create({
    name: "naruto",
    number: 12,
    episodeImg: "episodio 12",
    isPremium: false,
  })
    .then((episode) => {
      return User.findByIdAndUpdate(
        req.params.userId,
        { $push: { episodes: episode._id } },
        { new: true }
      );
    })
})

module.exports = router;
