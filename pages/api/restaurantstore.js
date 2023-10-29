import connectDB from "@/lib/db";
import Restaurant from "@/models/restaurant";

export default async function saveRestaurantToDatabase(req, res) {
  await connectDB();
  if (req.method == "POST") {
    const { query } = req.body;
    console.log(query);
    const search = await Restaurant.findOne({ name: query });
    if (search) {
      console.log(search.quantity);
      search.quantity = search.quantity + 1;
      await search.save();
      return;
    } else {
      const newRestaurant = new Restaurant({
        name: query,
        quantity: 1,
      });
      await newRestaurant.save();
    }
  }
}
