// Imports from libraries
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// Imports from projects
const viewsRoutes = require("./routes/viewsRoutes");
const weekMenusRoutes = require("./routes/weekMenusRoutes");
const fridgeRoutes = require("./routes/fridgeRoutes");
const tagRoutes = require("./routes/tagRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const dbRoutes = require("./routes/db");
const { db } = require("./models/recipes/recipeModel");

const app = express();

// Req body modifiers
app.use(bodyParser.urlencoded({ extended: true }));

// Views middleware
app.set("view engine", "ejs");
app.use(express.static("public"));

// -----------------------------------
// ROUTERS
app.use("/", viewsRoutes);
app.post("/mealList", weekMenusRoutes);
app.post("/ingredientList", fridgeRoutes);
app.post("/randomList", tagRoutes);
app.get("/recipe/:mealId", recipeRoutes);
app.post("/savedRecipe", dbRoutes);

module.exports = app;
