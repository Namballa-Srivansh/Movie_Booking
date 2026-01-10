const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv').config({quiet:true})
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, async () => {
  console.log(`Server is running at ${process.env.PORT}`);

  try{
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to the mongo successfully");
  } catch(err){
    console.log("Error connecting to mongo", err);
  }
  
});