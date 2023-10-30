import Lottie from "lottie-react";
import Recipe from "../Recipe.json";
import styles from "../styles/NotSignedinPage.module.css";
import Link from "next/link";
import Slide from "react-reveal/Slide";

const NotSignedinPage = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.text}>
          <Slide left>
            <h3>Welcome to Mrs. Ore Foods</h3>
            <p className={styles.para}>
              Where you can find your favorite recipe with their calories count
              and prices
            </p>
            <p>To start enjoying the amazing benefit that this app offers</p>
            <div className={styles.link}>
              <Link href="/auth/signin" legacyBehavior>
                <a className="text-decoration-none">Sign in</a>
              </Link>
            </div>
          </Slide>
        </div>

        <div className={styles.lottie}>
          <Slide right>
            <Lottie animationData={Recipe} />
          </Slide>
        </div>
      </div>
    </>
  );
};

export default NotSignedinPage;
