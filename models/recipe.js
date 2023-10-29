import { Schema, models, model } from "mongoose";

const recipeSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },

    quantity: {
      type:Number
  }



});

export default models.Recipe || model("Recipe", recipeSchema);
