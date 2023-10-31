import axios from "axios";
import Link from "next/link";
import styles from "../styles/Acknowledge.module.css";
import Slide from "react-reveal/Slide";
import Lottie from "lottie-react";
import Complete from "../Complete.json";

const Acknowledge = ({ token }) => {
  console.log(token);

  const fetchData = async (token) => {
    try {
      const response = await axios.get(`/api/activate/${token}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (token) {
    fetchData(token);
  }

  return (
    <div className={styles.main}>
      <h1>Activation Complete</h1>
      <div className={styles.lottie}>
        <Slide top>
          <Lottie animationData={Complete} />
        </Slide>
      </div>
      <Link href="/auth/signin" legacyBehavior>
        <button>Sign in</button>
      </Link>
    </div>
  );
};

export default Acknowledge;
