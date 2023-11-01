import Layout from "@/components/Layout";
import Signin from "@/components/Signin";
import React from "react";

const signin = () => {
  return (
    <Layout
      title="Sign in"
      description="Sign in Page of the food recipe application"
    >
      <Signin />
    </Layout>
  );
};

export default signin;
