const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipes/recipeModel");

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

router.get("/trendingRecipes", async (req, res) => {
  try {
    const recipe = await Recipe.find();
    if (!recipe) {
      return res.status(404).send("Recipes not found");
    } else {
      res.render("trendingRecipes", {
        recipes: recipe,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
