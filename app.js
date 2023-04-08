// const dotenv = require("dotenv");
// dotenv.config({ path: "./config.env" });
const express = require("express");
const bodyParser = require("body-parser");
const striptags = require("striptags");
const cheerio = require("cheerio");

const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const apiKey = "c7d40af634094a53a02a542268b9f073";

// All the get request to render differrent page.

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/inputWeekPlanMeals", (req, res) => {
  res.render("inputWeekPlanMeals");
});

app.get("/inputIngredient", (req, res) => {
  res.render("inputIngredient");
});

// POST request to render menus for a week based on user input

app.post("/mealList", async (req, res) => {
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

//POST request to generate recipe based on ingredients provided by user

app.post("/ingredientList", async (req, res) => {
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
    res.send(error);
    console.log(error);
  }
});

app.get("/recipe/:mealId", async (req, res) => {
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
  });
  // res.send(summary.summary);
});

module.exports.main = app;
