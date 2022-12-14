

# AnimeWars
Developed as the final project of my web development bootcamp at Ironhack Barcelona. It's a MERN Stack application, check the back repository [here](https://github.com/JordiMartinezDev/AnimeWars-Front/).

## About
This project is based on the development of a Crunchyroll-style website in which users can register, log in as well as view, add, delete and follow their favorite anime.


## Deployment
You can check the app fully deployed [here](link). If you wish to view the API deployment instead, check [here](link)

## Work structure

We developed this project in group and used [Trello](https://trello.com/b/gPwpHZUL/proyecto-final-animewars) to organize our workflow.

## Installation guide

Fork this repo
Clone this repo

```
$ cd AnimeWars-Back
$ npm install
$ npm start
```

## User roles

| Role          | Capabilities  | Property      |
| ------------- |:-------------:|:-------------:|
| User          | Can Signup, login/logout, can edit his profile, can view (a limited number of chapters), add and delete chapters of his favorite anime.      | isAdmin: false, isPremium: false     |
| User Premium      | Can login/logout, can edit his profile, can view (an unlimited number of chapters), add and delete chapters of his favorite anime. | isAdmin: false isPremium: true     |
| Admin      | Can login/logout, performs content control, validates the episodes and series uploaded by users, can delete episodes if it considers that the content is not appropriate.  | isAdmin: true     |

### Models

1. User
```
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
    likedEpisodes: [{ type: Schema.Types.ObjectId, ref: "Episode" }],
    followedAnime: [{ type: Schema.Types.ObjectId, ref: "Anime" }],
  },
  
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
```
2. Anime
```
const animeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      
    },
    category: {
      type: String,
      enum : ["Shonen", "Drama", "Action"]
        
    },
    
    animeUrl: {
      type: String,
     
    },
    description: {
      type: String,
      default: "Serie Anime"
    },
    episodes: [{ type: Schema.Types.ObjectId, ref: "Episode" }],
    followedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
```
3. Episode
```
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
    isPremium:{
        type: Boolean,
        default: false,
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
```
  




## Routes

| Route Type    | Route     |Require|Response (200)|Action|
| ------------- |:-------------:|:-------------:|:--------------:|:---------------:|
| GET       | /  |-||
| POST       | /login    |const { email, password } = req.body|json({authToken: authToken})|Reads DB to Auth&Login user
| POST      | /signup     |const { username, email, password } = req.body|json({user: user})|Creates new User(unique)
| GET       | /profile/:userId  |-|json({thisUser})|Returns user if logged
| PUT       | /profile/:userId    |-|json({message: "Edition completed"})| Updates profile
| GET      | /showMyAnimeList/:userId | -|json({[animeId]}| Returns array of Anime IDs
| PUT       | /showMyAnimeList/:userId  |-|json({updatedAnimeList})}| Updates Animes folloed list
| POST      | /uploadVideo/:userId     |const { name, number, episodeImg, episodeUrl } = req.body | json({message: "Episode Uploaded"})| Uploads Episode to DB



