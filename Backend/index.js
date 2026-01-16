const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv').config({quiet:true})
const mongoose = require('mongoose');
const app = express();

const MovieRoutes = require('./routes/movie.routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

MovieRoutes(app); // invoking movie routes function and passing express app object

app.listen(process.env.PORT, async () => {
  console.log(`Server is running at ${process.env.PORT}`);

  try{
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to the mongo successfully");
    // await Movie.create({
    //     name: "Bacchan Pandey",
    //     description: "Action Comedy film",
    //     casts: ["Akshay Kumar", "Jacqueline Fernandez", "Arshad Warsi"],
    //     trailerUrl: "https://www.youtube.com/watch?v=Uj0uYpG7E6c",
    //     language: "Hindi",
    //     releaseDate: "18th March 2022",
    //     director: "Farhad Samji",
    //     releaseStatus: "RELEASED"
    // })

  } catch(err){
    console.log("Error connecting to mongo", err);
  }
  
});