import Layout from "@/components/Layout";

import connectDB from "@/lib/db";
import User from "@/models/user";

import dynamic from "next/dynamic";
const Users = dynamic(() => import("@/components/Users"), {
  ssr: false,
});

const users = ({ data }) => {
  return (
    <Layout title="Users" description="The users page shows all the registered users in the application">
      <Users data={data} />
    </Layout>
  );
};

export async function getServerSideProps(params) {
  let response;
  let data;

  await connectDB();
  try {
    data = await User.find({ isAdmin: false });
    // data = response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      data: data.map((record) => {
        return {
          fullname: record ? record.fullname : "",
          email: record ? record.email : "",
          gender: record ? record.gender : "",
          isAdmin: record ? record.isAdmin : "",
          id: record ? record._id.toString() : "",
        };
      }),
    },
  };
}

export default users;
