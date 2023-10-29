import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import User from "@/models/user";
import connectDB from "@/lib/db";

import dynamic from "next/dynamic";
const UserProfile = dynamic(() => import("@/components/UserProfile"), {
  ssr: false,
});

const id = ({ data }) => {
  return (
    <Layout>
      <UserProfile data={data} />
    </Layout>
  );
};

export default id;

export async function getServerSideProps(context) {
  const { id } = context.params;
  console.log(id);
  let data;

  await connectDB();
  try {
    data = await User.findOne({ _id: id });
    // data = response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      data: {
        name: data ? data.fullname : "",
        email: data ? data.email : "",
        gender: data ? data.gender : "",

        id: data ? data._id.toString() : "",
      },
    },
  };
}
