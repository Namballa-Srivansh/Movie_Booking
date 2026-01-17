const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv').config({quiet:true})
const mongoose = require('mongoose');

const app = express();

const MovieRoutes = require('./routes/movie.routes');
const TheatreRoutes = require('./routes/theatre.routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

MovieRoutes(app); // invoking movie routes function and passing express app object
TheatreRoutes(app); // invoking theatre routes function and passing express app object

app.listen(process.env.PORT, async () => {
  console.log(`Server is running at ${process.env.PORT}`);

  try{
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to the mongo successfully");

  } catch(err){
    console.log("Error connecting to mongo", err);
  }
  
});