import Layout from "@/components/Layout";
import Restaurants from "@/components/Restaurants";
import React from "react";
import connectDB from "@/lib/db";
import Restaurant from "@/models/restaurant";

// import dynamic from "next/dynamic";
// const Restaurants = dynamic(() => import("@/components/Restaurants"), {
//   ssr: false,
// });

const RestaurantPage = ({data}) => {
  return (
    <Layout>
      <Restaurants data={data} />
    </Layout>
  );
};

export default RestaurantPage;


export async function getServerSideProps(params) {
  let response;
  let data;

  await connectDB();
  try {
    data = await Restaurant.find();
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