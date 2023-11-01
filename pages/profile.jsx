import Layout from "@/components/Layout";

import { getSession } from "next-auth/react";

import dynamic from "next/dynamic";
const Profile = dynamic(() => import("@/components/Profile"), {
  ssr: false,
});

const profile = () => {
  // const { data: session } = useSession();
  // console.log(session);
  // if (session) {
    return (
      <Layout
        title="Profile"
        description="The profile page shows the profile details of logged in users"
      >
        <Profile />
      </Layout>
    );
  }
// };
export default profile;

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}
