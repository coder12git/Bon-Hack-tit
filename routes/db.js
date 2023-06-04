const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipes/recipeModel");

router.post("/savedRecipe", (req, res) => {
  try {
    const recipe = new Recipe({
      name: req.body.name,
      image: req.body.image,
      id: req.body.id,
      time: req.body.time,
    });

    recipe.save();
    res.send("Recipe saved successfully!");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
