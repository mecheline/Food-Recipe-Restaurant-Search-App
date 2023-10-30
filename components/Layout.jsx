import Head from "next/head";
import Navigation from "./Navigation";
import styles from "../styles/Layout.module.css";
import LottieComponent from "./LottieComponent";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
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
