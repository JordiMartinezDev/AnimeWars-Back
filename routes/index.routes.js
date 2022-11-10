const express = require("express");
const { create } = require("hbs");
const router = express.Router();
const multer = require("multer");

//REQ MODELS
const AnimeModel = require("../models/Anime.model");
const EpisodeModel = require("../models/Episode.model");
const UserModel = require("../models/User.model");
const CommentModel = require("../models/Comment.model");

//CLOUDINARY
const fileUploader = require("../config/cloudinary.config");
const { populate } = require("../models/Anime.model");
const User = require("../models/User.model");
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
      // console.log("Retrieved animes from DB:", animesFromDB);
      // console.log("hasta aqui entra");
      res.status(200).json(animesFromDB);
      // res.json(animesFromDB);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving animes" });
    });
});

router.get("/animes/:animeId", (req, res, next) => {
  const { animeId } = req.params;
  // console.log(animeId)
  AnimeModel.findById(animeId)
    .populate("episodes")
    .then((animeFromDB) => {
      // console.log("Retrieved anime from DB:", animeFromDB);
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
router.put("/animes/followanime/:animeId", (req, res, next) => {
  const { animeId } = req.params;
  let followed = false;

  UserModel.findById(req.body.user)
    .then((user) => {
      user.followedByAnimeId.map((animeIdFollowed) => {
        if (animeIdFollowed == animeId) followed = true;
      });

      if (!followed) user.followedByAnimeId.push(animeId);
      else user.followedByAnimeId.remove(animeId);
      user.save();
      res.json({ message: "User updated correctly" });
      AnimeModel.findById(animeId)
        .then((animeFromDb) => {
          if (!followed) animeFromDb.followedUsers.push(req.body.user);
          else animeFromDb.followedUsers.remove(req.body.user);
          animeFromDb.save();
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((e) => console.log(e));
});
//funciona el PUT desde postman ok! ruta: http://localhost:3001/api/animes/cualquier id de la bd
router.put("/animes/:animeId", (req, res, next) => {
  const { animeId } = req.params;

  console.log("PUT IN BACK FROM ANIMES/:ANIMEID : OBJECT: ", followedUsers);
  console.log("REQ.BODY IN BACK : ", req.body);
  AnimeModel.findById(animeId)
    .then((animeFromDb) => {
      animeFromDb.followedUsers.push(followedUsers);
      animeFromDb.save();
    })

    .then((response) => {
      //console.log("this is response", response);
      res.json({ message: "Anime updated" });
    })
    .catch((e) => {
      console.log(e);
    });
});

router.delete("animes/:animeId", (req, res, next) => {});

// ------- Episodes
router.get("/episodes", (req, res, next) => {
  //console.log("THIS IS BACK, GET EPISODES FULL LIST");
  // res.json("All good in here");
  EpisodeModel.find()
    .then((episodesFromDB) => {
      //console.log("Retrieved episodes from DB:", episodesFromDB);
      res.status(200).json(episodesFromDB);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving episodes" });
    });
});

router.get("/episodes/:episodeId", (req, res, next) => {
  //console.log("this is : ROUTE GET /:episodeId");
  const { episodeId } = req.params;
  EpisodeModel.findById(episodeId)
    .populate("commentId")
    .populate({ path: "commentId", populate: "commentByUser" })
    .then((episodeFromDB) => {
      console.log("Episode Populated:", episodeFromDB);
      // console.log("Retrieved episode from DB:", episodeFromDB);
      res.status(200).json(episodeFromDB);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error finding episode" });
    });
});
//aa 
router.post(
  "/episodes",
  fileUploader.single("episodeImage"),
  (req, res, next) => {
    console.log("Added Episode from user:", req.body);
    EpisodeModel.create({
      anime: req.body.anime,
      number: req.body.number,
      isPremium: req.body.isPremium,
      episodeUrl: req.body.episodeUrl,
      episodeImg: req.file.path,
      uploadedByUserId: req.body.userId,
      // animeId: req.body.animeId,
    })
      .then((response) => {
        console.log("req.boby cl: ", req.body);
        console.log("response.data: ", response);
        AnimeModel.findOne;
        AnimeModel.findOne({ name: req.body.anime })
          .then((anime) => {
            console.log("ANIME FOUND IN DB: ", anime);
            anime.episodes.push(response._id);
            anime.save();
          })

          .catch((e) => console.log(e));
        //res.json({ animeImageUrl: req.file.path });
        res.json({ episodeImageUrl: req.file.path });
      })
      .catch((e) => {
        console.log(e);
      });
  }
);

router.put("/episodes/:episodeId", (req, res, next) => {});

router.delete("/episodes/:episodeId", (req, res, next) => {
  const { episodeId } = req.params;
  EpisodeModel.findByIdAndDelete(episodeId)
    .then((response) => {
      res.json({ message: "Episode deleted" });
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post("/episode/:episodeId", (req, res, next) => {
  console.log("Try to post COMMENT  SEE REQ BODy: ", req.body);

  CommentModel.create({
    text: req.body.newComment,
    commentByUser: req.body.user._id,
    episodeCommented: req.body.episodeId,
  })
    .then((commentCreated) => {
      //-- Episodemodel
      EpisodeModel.findById(req.body.episodeId)
        .then((episode) => {
          episode.commentId.push(commentCreated._id);
          episode.save();
        })
        .catch((e) => res.json(e));

      //-- Episodemodel
    })
    .catch((e) => console.log(e));
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

router.put("/user", (req, res, next) => {
  console.log("USER._ID FROM THE BACK?", req.body._id);

  UserModel.findById(req.body._id).then((result) => {
    res.json(result);
  });
});

router.put("/profile/edit/:profileId", fileUploader.single("profileImg"),(req, res, next)=>{
  
  const {username}=req.body
  const profileUpdate ={
    username,
    profileImg :req.file.path
    
  }
  console.log("Req. file desdeback: ", req.file)
  console.log("req.body desdeBack: ", req.body)
  console.log("req.body.username: ",req.body.userId)
  console.log("profileUpdate: ",profileUpdate)
  //el profileId es el parametre de ruta.
  User.findByIdAndUpdate(req.body.userId, profileUpdate) 
   
   .then(results=>{
     console.log("results desde el back edit profile: ",results)
   })
   

})


module.exports = router;
