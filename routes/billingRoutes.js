const express = require("express");
const router = express.Router();
const { stripeSecretKey } = require("../config/keys");
const stripe = require("stripe")(stripeSecretKey);

//google arg govori passportu da koristi googlestrategy za autentikaciju, drugi je kojim podacima zelimo pristupiti
router.post("/api/stripe", async (req, res) => {
  //passport zakaci instancu usera u requestu pri loginu, temelji se na cookieu

  const { id } = req.body;

  const charge = await stripe.charges.create({
    amount: 500,
    currency: "usd",
    source: id,
    description: "$5 for 5 email credits",
  });

  req.user.credits += 5;
  const user = await req.user.save(); // ovo radimo da uvijek saljemo nazan najnoviji updateanog usera

  res.send(user);
});

router.get("/api/test", (req, res) => {
  res.send({ message: "Success" });
});

module.exports = router;
