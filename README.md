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

## Models
**User.model.js**
```
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
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
  timestamps: true,
  }
})
```

**Anime.model.js**
```
const animeSchema = new Schema({
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
   timestamps: true,
  }
})
```

## User roles

| Role          | Capabilities  | Property      |
| ------------- |:-------------:|:-------------:|
| User          | Can Signup and login....     | is Admin: false     |
| Admin      | Can login/logout. Can...    | isAdmin: true     |

## API Reference

| Method        | Endpoint | Require | Response (200) | 
| ------------- |:-------------:|:-------------:|:-------------:|
| left foo      | right foo     | right foo     | right foo     |
| left bar      | right bar     | right bar     | right bar     |
| left baz      | right baz     | right baz     |right baz      |


