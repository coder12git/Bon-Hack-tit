const express = require("express");
const router = express.Router();

const apiKey = process.env.SPOONACULAR_API_KEY;

//POST request to generate recipe based on ingredients provided by user
router.post("/ingredientList", async (req, res) => {
  // Storing the input provided by user in a variable in backend

  let ingredients = req.body.ingredients;
  if (typeof ingredients === "string") {
    ingredients = req.body.ingredients.split(",");
  }

  let number = req.body.number;
  if (typeof number === "string") {
    number = req.body.number.split(",");
  }

  try {
    const { default: fetch } = await import("node-fetch");

    //Generate recipes by ingredients
    const generateRecipesByIngredients = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=${number}&apiKey=${apiKey}`
    );
    const recipesData = await generateRecipesByIngredients.json();

    // Generate recipe information
    const recipeInfoPromises = recipesData.map(async (recipe) => {
      const recipeInfo = await fetch(
        `https://api.spoonacular.com/recipes/${recipe.id}/nutritionWidget.json?apiKey=${apiKey}`
      );
      const infoData = await recipeInfo.json();
      return {
        ...recipe,
        nutrients: infoData,
      };
    });

    // Wait for all recipe nutrient information to be fetched
    const recipesWithNutrients = await Promise.all(recipeInfoPromises);

    res.render("planMealsByIngredients", {
      recipes: recipesWithNutrients,
    });

    // res.send(recipesWithNutrients);
  } catch (error) {
    res.send("Sorry! Some error occurred. Please try again!");
    console.log(error);
  }
});

module.exports = router;
