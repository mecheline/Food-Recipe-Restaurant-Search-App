import Layout from "@/components/Layout";

import connectDB from "@/lib/db";
import Recipe from "@/models/recipe";

import dynamic from "next/dynamic";
const Recipes = dynamic(() => import("@/components/Recipes"), {
  ssr: false,
});

const recipes = ({ data }) => {
  return (
    <Layout
      title="Recipe"
      description="The recipe page shows all the search recipes in the application"
    >
      <Recipes data={data} />
    </Layout>
  );
};

export default recipes;

export async function getServerSideProps(params) {
  let response;
  let data;

  await connectDB();
  try {
    data = await Recipe.find();
    // data = response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      data: data.map((record) => {
        return {
          name: record ? record.name : "",
          quantity: record ? record.quantity : "",

          id: record ? record._id.toString() : "",
        };
      }),
    },
  };
}
