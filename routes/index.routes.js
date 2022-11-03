const express = require("express");
const router = express.Router();
const AnimeModel = require("../models/Anime.model");
const EpisodeModel = require("../models/Episode.model");

router.get("/animes", (req, res, next) => {
  console.log("THIS IS BACK" + "/" + " ROUTE'S RESPONSE");
  // res.json("All good in here");
});

router.get("/animes/:animeId", (req, res, next) => {
  console.log("this is : ROUTE GET /:animeId");
});
router.post("/animes", (req, res, next) => {
  console.log("this is add new anime: ROUTE POST /");
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
});
router.put("episodes/:episodeId", (req, res, next) => {
  console.log("this is EDIT: ROUTE PUT /:episodeId");
});
router.delete("episodes/:episodeId", (req, res, next) => {
  console.log("this is DELETe : ROUTE DEL /:episodeId");
});

module.exports = router;
