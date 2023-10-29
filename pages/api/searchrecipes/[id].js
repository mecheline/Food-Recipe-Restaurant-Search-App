import axios from "axios";

export default async function handler(req, res) {
  const { id } = req.query;
  const ID = id.toLowerCase();

  try {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${ID}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
}
