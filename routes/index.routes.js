const express = require("express");
const { create } = require("hbs");
const router = express.Router();
const multer = require("multer");

//REQ MODELS
const AnimeModel = require("../models/Anime.model");
const EpisodeModel = require("../models/Episode.model");

//CLOUDINARY
const fileUploader = require("../config/cloudinary.config");
//CLOUDINARY
multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 500000 },
});

router.get("/animes", (req, res, next) => {
  AnimeModel.find()
    .then((animesFromDB) => {
      res.status(200).json(animesFromDB);
    })
    .catch((error) => {
      console.log(error);
      // res.status(500).json({ message: "Error finding animes" });
    });
});
router.get("/animes/searchvalue", (req, res, next) => {
  console.log("SearchValue", req.params);
});

router.post("/animes", fileUploader.single("animeImage"), (req, res, next) => {
  console.log("ANIMES POST ROUTE HERE!!");

  AnimeModel.create({
    name: req.body.name,
    category: req.body.category,
    animeUrl: req.body.animeUrl,
    description: req.body.description,
    animeImage: req.file.path,
  })
    .then((response) => {
      //res.json({ animeImageUrl: req.file.path });
      res.json({ animeImage: req.file.path });
    })
    .catch((e) => {
      console.log(e);
    });
});

router.get("/animes/:animeId", (req, res, next) => {
  console.log("GET ONE CONCRETE ANIME, REQ BODY : ", req.body);
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

router.post(
  "/episodes",
  fileUploader.single("episodeImage"),
  (req, res, next) => {
    EpisodeModel.create({
      name: req.body.name,
      number: req.body.number,
      isPremium: req.body.isPremium,
      episodeUrl: req.body.episodeUrl,
      episodeImg: req.file.path,
    })
      .then((response) => {
        //res.json({ animeImageUrl: req.file.path });
        res.json({ episodeImageUrl: req.file.path });
      })
      .catch((e) => {
        console.log(e);
      });
  }
);

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
