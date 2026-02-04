const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv').config({quiet:true})
const cors = require("cors")
const mongoose = require('mongoose');

const MovieRoutes = require('./routes/movie.routes');
const TheatreRoutes = require('./routes/theatre.routes');
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes")
const bookingRoutes = require("./routes/booking.routes");
const showRoutes = require("./routes/show.routes");
const paymentRoutes = require("./routes/payment.routes");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

mongoose.set("debug", true);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

MovieRoutes(app);       // invoking movie routes function and passing express app object
TheatreRoutes(app);    // invoking theatre routes function and passing express app object
authRoutes(app);      // invoking auth routes
userRoutes(app);     // invoking user routes
bookingRoutes(app)  // invoking booking routes
showRoutes(app)    // invoking show routes
paymentRoutes(app) // invoking payment routes

app.listen(process.env.PORT, async () => {
  console.log(`Server is running at ${process.env.PORT}`);

  try{
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to the mongo successfully");

  } catch(err){
    console.log("Error connecting to mongo", err);
  }
  
});