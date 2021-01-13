const passport = require("passport");
const cookieSession = require("cookie-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy; // samo strategy nas zanima// mora biti oauth20 ili 10 ne bez
const { googleClientID, googleClientSecret } = require("../config/keys");
//importanje modela
const User = require("../models/User");

//definiramo funkciju koja ce serijalizirati usera valjda, hashirati
//funkcija je vec predefiniramo usera
passport.serializeUser((user, done) => {
  //user je instanca usera koju smo izvukli iz baze/ili novi ili postojeci
  done(null, user.id); // id je mongo objectid, koristimo njega jer ako se npr prijavi user sa fb racunom nece imati googleid
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

//trebas gledat dijagram da shvatis, prva dva arg su credentials, treci je ruta na koju ce se redirectat kad user prihvati autentikaciju sa googlom
passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const userExists = await User.findOne({ googleId: profile.id });
      if (!userExists) {
        const user = new User({
          googleId: profile.id,
        });
        await user.save((err, user) => {
          console.log("User saved!");
          done(null, user); // prvi
        });
      } else {
        console.log("User already exists");
        done(null, userExists); // prvi argument je objekt error u kojem se moze poslati poruka, drugi je instanca usera ili stagod
      }
    }
  )
);
//access token sluzi kao kontrola da je google dao nasoj aplikaciji dopustenje za citanje/mijenjanje? usera
//refresh sluzi za resetiranje access tokena ali to necemo koristiti
