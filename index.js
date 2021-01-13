const express = require("express");
require("./services/passport");
const { mongoURI, cookieKey } = require("./config/keys");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // trajanje cookiea, racunamo 30 dana u milisekunde
    keys: [process.env.COOKIE_KEY || cookieKey], // ovo je secret za hashiranje, moze ih biti vise
  })
);
app.use(passport.initialize()); // ovo valjda govori passportu da koristi cookies
app.use(passport.session());

const cors = require("cors");
const authRouter = require("./routes/authRoutes");

mongoose.connect(
  process.env.MONGO_URI || mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw new Error(err);
    console.log("Connected to database!");
  }
);
app.use(cors());
app.use(express.json());

//mounutanje routera
app.use(authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
