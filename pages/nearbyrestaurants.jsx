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
    <Layout
      title="Nearby Restaurants"
      description="The nearby restaurant page shows all the restaurants within the location of the user in the application"
    >
      <NearbyRestaurants />
    </Layout>
  );
};

export default nearbyrestaurants;
