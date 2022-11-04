const express = require("express");
const { create } = require("hbs");
const router = express.Router();
const AnimeModel = require("../models/Anime.model");
const EpisodeModel = require("../models/Episode.model");

router.get("/animes", (req, res, next) => {
  console.log("THIS IS BACK" + "/" + " ROUTE'S RESPONSE");
  AnimeModel.find()
    .then((animesFromDB) => {
      console.log("Retrieved animes from DB:", animesFromDB);
      res.status(200).json(animesFromDB);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error finding animes" });
    });
});



router.get("/animes/:animeId", (req, res, next) => {
  console.log("this is : ROUTE GET /:animeId");
});
router.post("/animes", (req, res, next) => {
  console.log("this is add new anime: ROUTE POST /");

  AnimeModel.create(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((e) => {
      console.log(e);
    });
});
router.put("animes/:animeId", (req, res, next) => {
  console.log("this is EDIT: ROUTE PUT /:animeId");
});
router.delete("animes/:animeId", (req, res, next) => {
  console.log("this is DELETe : ROUTE DEL /:animeId");
});

// ------- Episodes

router.get("/episodes", (req, res, next) => {
  console.log("THIS IS BACK, GET EPISODES FULL LIST");
  // res.json("All good in here");
  next();
});

router.get("/episodes/:episodeId", (req, res, next) => {
  console.log("this is : ROUTE GET /:episodeId");
});
router.post("/episodes", (req, res, next) => {
  console.log("this is add new episode: ROUTE POST /");
  EpisodeModel.create(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((e) => {
      console.log(e);
    });
});
router.put("episodes/:episodeId", (req, res, next) => {
  console.log("this is EDIT: ROUTE PUT /:episodeId");
});
router.delete("episodes/:episodeId", (req, res, next) => {
  console.log("this is DELETe : ROUTE DEL /:episodeId");
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
  }).then((episode) => {
    return User.findByIdAndUpdate(
      req.params.userId,
      { $push: { episodes: episode._id } },
      { new: true }
    );
  });
});

module.exports = router;
