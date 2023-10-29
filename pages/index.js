import Homepage from "@/components/Homepage";
import Layout from "@/components/Layout";
import NotSignedinPage from "@/components/NotSignedinPage";
import { getSession, useSession } from "next-auth/react";

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
