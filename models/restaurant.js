import { Schema, models, model } from "mongoose";

const restaurantSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },

  quantity: {
    type: Number,
  },
});

export default models.Restaurant || model("Restaurant", restaurantSchema);
