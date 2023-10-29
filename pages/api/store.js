import connectDB from "@/lib/db";
import Recipe from "@/models/recipe";

export default async function saveRecipeToDatabase(req, res) {
  await connectDB();
  if (req.method == "POST") {
    const { query } = req.body;
    console.log(query);
    const search = await Recipe.findOne({ name: query });
    if (search) {
      console.log(search.quantity);
      search.quantity = search.quantity + 1;
      await search.save();
      return;
    } else {
      const newRecipe = new Recipe({
        name: query,
        quantity: 1,
      });
      await newRecipe.save();
    }
  }
}
