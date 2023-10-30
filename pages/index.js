// import Homepage from "@/components/Homepage";
import Layout from "@/components/Layout";
// import NotSignedinPage from "@/components/NotSignedinPage";
import { getSession, useSession } from "next-auth/react";

import dynamic from "next/dynamic";
const Homepage = dynamic(() => import("@/components/Homepage"), {
  ssr: false,
});

const NotSignedinPage = dynamic(() => import("@/components/NotSignedinPage"), {
  ssr: false,
});

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <Layout>
        <Homepage />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <NotSignedinPage />
      </Layout>
    );
  }
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}
