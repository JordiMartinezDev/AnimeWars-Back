# Portafolio-back

## AnimeWars
Developed as the final project of my web development bootcamp at Ironhack Barcelona. It's a MERN Stack application, check the back repository here<link>

## About
ededededdee.


## Deployment

You can check the app fully deployed here(link). If you wish to view the API deployment instead, check here(link)

## Work structure

We developed this project in group and used Trello(link) to organize our workflow.

## Installation guide

*Fork this repo
*Clone this repo

```
$ cd portafolio-front
$ npm install
$ npm start
```



## User roles

| Role          | Capabilities  | Property      |
| ------------- |:-------------:|:-------------:|
| User          | Can Signup and login....     | is Admin: false     |
| Admin      | Can login/logout. Can...    | isAdmin: true     |

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
1. Anime
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
1. Episode
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

| Route Type    | Route     |
| ------------- |:-------------:|
| GET       | /  |
| POST       | /login    |
| POST      | /signup     |
| GET       | /profile/:userId  |
| PUT       | /profile/:userId    |
| GET      | /showMyAnimeList/:userId     |
| PUT       | /showMyAnimeList/:userId  |
| GET       | /showMyEpisodes/:userId    |
| POST      | /uploadVideo/:userId     |

