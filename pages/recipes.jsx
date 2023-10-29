import Layout from "@/components/Layout";
import Recipes from "@/components/Recipes";
import connectDB from "@/lib/db";
import Recipe from "@/models/recipe";
import React from "react";

const recipes = ({ data }) => {
  return (
    <Layout>
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
