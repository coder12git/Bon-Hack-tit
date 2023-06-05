const express = require("express");
const router = express.Router();

const apiKey = process.env.SPOONACULAR_API_KEY;

//POST request to generate random list of recipes based on tags provided by user
router.post("/randomList", async (req, res) => {
  // Tags and number provided by user

  const number = req.body.number;
  let tags = req.body.tags;
  if (typeof tags === "strings") {
    tags = req.body.tags.split(",");
  }

  try {
    const { default: fetch } = await import("node-fetch");
    const generateRandomRecipes =
      await fetch(`https://api.spoonacular.com/recipes/random?number=${number}&tags=${tags}&apiKey=${apiKey}
      `);

    const randomData = await generateRandomRecipes.json();

    // Generate Recipe information including nutrients

    const recipeInfoPromises = randomData.recipes.map(async (recipe) => {
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

    res.render("randomMeals", {
      recipes: recipesWithNutrients,
    });
  } catch (error) {
    res.send("Sorry! Some error occurred. Please try again!");
    console.log(error);
  }
});

module.exports = router;
