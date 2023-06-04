const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/inputWeekPlanMeals", (req, res) => {
  res.render("inputWeekPlanMeals");
});

router.get("/inputIngredient", (req, res) => {
  res.render("inputIngredient");
});

router.get("/inputRandom", (req, res) => {
  res.render("inputRandom");
});


module.exports = router;