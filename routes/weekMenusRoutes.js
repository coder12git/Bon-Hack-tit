const express = require("express");
const router = express.Router();

const apiKey = process.env.SPOONACULAR_API_KEY;

// POST request to render menus for a week based on user input

router.post("/mealList", async (req, res) => {
  // Variables for meal planning based on user input
  const targetCalories = req.body.targetCalories;
  let diets = req.body.diets;
  if (typeof diets === "string") {
    diets = req.body.diets.split(",");
  }
  let cuisines = req.body.cusines;
  if (typeof cuisines === "string") {
    cuisines = req.body.cuisines.split(",");
  }
  let excludeIngredients = req.body.excludeIngredients;
  if (typeof excludeIngredients === "string") {
    excludeIngredients = req.body.excludeIngredients.split(",");
  }
  let includeIngredients = req.body.includeIngredients;
  if (typeof includeIngredients === "string") {
    includeIngredients = req.body.includeIngredients.split(",");
  }
  let preferences = req.body.preferences;
  if (typeof preferences === "string") {
    preferences = req.body.preferences.split(",");
  }

  try {
    const { default: fetch } = await import("node-fetch");

    // Week meal plan using user input
    const weekPlan = await fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=week&targetCalories=${targetCalories}&diet=${diets}&excludeIngredients=${excludeIngredients}&includeIngredients=${includeIngredients}&cuisine=${cuisines}&preferences=${preferences}`
    );

    const dataOfMeal = await weekPlan.json();
    const days = await dataOfMeal.week;

    res.render("planMeals", { meals: days });
  } catch (error) {
    res.send("Sorry! Some error occurred. Please try again!");
    console.log(error);
  }
});

module.exports = router;