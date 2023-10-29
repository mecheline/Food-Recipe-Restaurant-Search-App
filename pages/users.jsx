import Layout from "@/components/Layout";
import Users from "@/components/Users";
import connectDB from "@/lib/db";
import User from "@/models/user";

const users = ({ data }) => {
  return (
    <Layout>
      <Users data={data} />
    </Layout>
  );
};

export async function getServerSideProps(params) {
  let response;
  let data;

  await connectDB();
  try {
    data = await User.find();
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

          id: record ? record._id.toString() : "",
        };
      }),
    },
  };
}

export default users;
