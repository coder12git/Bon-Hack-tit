const express = require("express");
const striptags = require("striptags");
const router = express.Router();

const apiKey = process.env.SPOONACULAR_API_KEY;

router.get("/recipe/:mealId", async (req, res) => {
  const mealId = req.params.mealId;

  const { default: fetch } = await import("node-fetch");

  //Recipe info based on meal id
  const recipeInfo =
    await fetch(`https://api.spoonacular.com/recipes/${mealId}/information?apiKey=${apiKey}&includeNutrition=true
    `);
  const info = await recipeInfo.json();

  // Summary of the recipe based on meal id

  const summaryInfo = await fetch(
    `https://api.spoonacular.com/recipes/${mealId}/summary?apiKey=${apiKey}`
  );
  const summary = await summaryInfo.json();

  //Ingredient info based on meal id
  const ingredientsInfo =
    await fetch(`https://api.spoonacular.com/recipes/${mealId}/ingredientWidget.json?apiKey=${apiKey}
    `);
  const ingredientsData = await ingredientsInfo.json();

  res.render("recipe", {
    title: info.title,
    readyInMinutes: info.readyInMinutes,
    image: info.image,
    nutrition: info.nutrition,
    summary: striptags(summary.summary),
    analyzedInstructions: info.analyzedInstructions,
    ingredients: ingredientsData.ingredients,
    id: mealId,
  });
  // res.send(summary.summary);
});

module.exports = router;
