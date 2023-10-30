import { signOut, useSession } from "next-auth/react";
import styles from "../styles/Profile.module.css";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleDelete = async (id) => {
    console.log(id);
    if (prompt("Do you want to deactivate your account", "Yes")) {
      try {
        const res = await axios.delete(`/api/delete/${id}`);
        console.log(res.data);
        toast.success(res.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        await signOut({ redirect: false });
        router.push("/auth/signin");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.main}>
      <div className="mb-3 text-center">
        {/* <i
          className="bi bi-skip-backward-fill fs-1"
          onClick={() => router.back()}
        ></i> */}
        <button onClick={() => router.back()} className={styles.button}>
          <i className="bi bi-chevron-double-left"></i> Go Back
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src="./images/avatar.jpg" alt="..." />
        </div>

        <div className={styles.text}>
          <h5 className="">{session.user.fullname}</h5>
          <h6>{session.user.gender}</h6>
          <div className={styles.email}>
            <p className="">Email: </p>
            <p>{session.user.email}</p>
          </div>

          <a
            href="#"
            className="btn btn-danger"
            onClick={() => handleDelete(session.user.id)}
          >
            Deactivate account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
