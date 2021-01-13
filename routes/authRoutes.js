const passport = require("passport");
const express = require("express");
const router = express.Router();

//google arg govori passportu da koristi googlestrategy za autentikaciju, drugi je kojim podacima zelimo pristupiti
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], // to su opcije za koje google trazi dopustenje, to je ono sto se vidi na kartici
  })
);

//ovo je ruta na koju se vraca nakon redirecta od googla, treba bit ovako, da zna da je poslan code prema kojem dohvaca usera
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/surveys");
  }
);

router.get("/api/logout", (req, res) => {
  //passport kad deserijalizira usera i zakaci ga na req objekt takodjer zakaci funkciju logout koja brise taj cookie i logouta se
  req.logout();
  res.redirect("/");
  //res.send(req.user);
});

router.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
