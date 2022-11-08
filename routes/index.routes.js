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
//funciona desde postman ok! ruta: http://localhost:3001/api/animes
router.get("/animes", (req, res, next) => {
  // res.send(200, { animes: []});
  AnimeModel.find()
    .then((animesFromDB) => {
      res.status(200).json(animesFromDB);
      // res.json(animesFromDB);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving animes" });
    });
});

router.get("/animes/:animeId", (req, res, next) => {
  console.log("BACK ANIMES/:ANIMEID ");
  const { animeId } = req.params;
  // console.log(animeId)
  AnimeModel.findById(animeId)
    .then((animeFromDB) => {
      res.status(200).json(animeFromDB);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error finding anime" });
    });
});

router.post("/animes", fileUploader.single("animeImage"), (req, res, next) => {
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

//funciona el PUT desde postman ok! ruta: http://localhost:3001/api/animes/cualquier id de la bd
router.put("/animes/:animeId", (req, res, next) => {
  const { animeId } = req.params;
  const { name, category, animeUrl, description, animeImage } = req.body;
  AnimeModel.findByIdAndUpdate(animeId, {
    name,
    category,
    animeUrl,
    description,
    animeImage,
  })
    .then((response) => {
      res.json({ message: "Anime updated" });
    })
    .catch((e) => {
      console.log(e);
    });
});

router.delete("animes/:animeId", (req, res, next) => {});

// ------- Episodes
router.get("/episodes", (req, res, next) => {
  // res.json("All good in here");
  EpisodeModel.find()
    .then((episodesFromDB) => {
      res.status(200).json(episodesFromDB);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving episodes" });
    });
});

router.get("/episodes/:episodeId", (req, res, next) => {
  console.log("this is : ROUTE GET /:episodeId");
  const { episodeId } = req.params;
  EpisodeModel.findById(episodeId)
    .then((episodeFromDB) => {
      res.status(200).json(episodeFromDB);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error finding episode" });
    });
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

router.put("episodes/:episodeId", (req, res, next) => {});
router.delete("episodes/:episodeId", (req, res, next) => {});

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
