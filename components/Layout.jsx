import Head from "next/head";
import Navigation from "./Navigation";
import styles from "../styles/Layout.module.css";
import dynamic from "next/dynamic";

const LottieComponent = dynamic(() => import("./LottieComponent"), {
  ssr: false,
});
// import LottieComponent from "./LottieComponent";

const Layout = ({ children, title, description }) => {
  return (
    <div>
      <Head>
        <title>{title?"Find Recipe - " + title:"Find Recipe" }</title>
        <meta name="description" content={description?description:"A food recipe and restaurant search application"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <div className={`container ${styles.main}`}>
        <LottieComponent />
        {children}
      </div>

      <div className={styles.footer}>
        <h4>
          <span>findRecipe</span> © 2023. ALL RIGHTS RESERVED.
        </h4>
      </div>
    </div>
  );
};

export default Layout;
