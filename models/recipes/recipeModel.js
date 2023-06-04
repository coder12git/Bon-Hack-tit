const mongoose = require("mongoose");

const recipesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
});

const Recipe = mongoose.model("Recipe", recipesSchema);

module.exports = Recipe;
