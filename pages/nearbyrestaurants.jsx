import Layout from "@/components/Layout";

import dynamic from "next/dynamic";
const NearbyRestaurants = dynamic(
  () => import("@/components/NearbyRestaurants"),
  {
    ssr: false,
  }
);

const nearbyrestaurants = () => {
  return (
    <Layout>
      <NearbyRestaurants />
    </Layout>
  );
};

export default nearbyrestaurants;
