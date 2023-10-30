import Lottie from "lottie-react";
import LoggedInShow from "../LoggedInShow.json";
import Slide from "react-reveal/Slide";
import styles from "../styles/Lottie.module.css";

const LottieComponent = () => {
  return (
    <div className={styles.lottie}>
      <Slide top>
        <Lottie animationData={LoggedInShow} />
      </Slide>
    </div>
  );
};

export default LottieComponent;
