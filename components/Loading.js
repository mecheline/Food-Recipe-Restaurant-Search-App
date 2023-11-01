import Lottie from "lottie-react";
import Loader from "../Loader.json";
import Zoom from "react-reveal/Zoom";
import styles from "../styles/Loader.module.css"

const Loading = () => {
  return (
    <div className={styles.lottie}>
      <Zoom>
        <Lottie animationData={Loader} />
      </Zoom>
    </div>
  );
};

export default Loading;
