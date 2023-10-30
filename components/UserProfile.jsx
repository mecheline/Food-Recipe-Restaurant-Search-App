import { useSession } from "next-auth/react";
import styles from "../styles/Profile.module.css";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

const UserProfile = ({ data }) => {
  console.log(data);
  const router = useRouter();
  const { data: session } = useSession();

  const handleDelete = async (id) => {
    console.log(id);
    if (prompt(`Do you want to deactivate ${data.name} account`, "Yes")) {
      try {
        const res = await axios.delete(`/api/delete/${id}`);
        console.log(res.data);
        toast.success(res.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        // await signOut({ redirect: false });
        router.push("/users");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.main}>
      <div className="mb-3 text-center">
        <button onClick={() => router.back()} className={styles.button}>
          <i class="bi bi-chevron-double-left"></i> Go Back
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.image}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/002/608/327/original/mobile-application-avatar-web-button-menu-digital-silhouette-style-icon-free-vector.jpg"
            alt="..."
          />
        </div>

        <div class={styles.text}>
          <h5 class="">{data.name}</h5>
          <h6>{data.gender}</h6>
          <div className={styles.email}>
            <p class="">Email: </p>
            <p>{data.email}</p>
          </div>

          <a
            href="#"
            class="btn btn-danger"
            onClick={() => handleDelete(data.id)}
          >
            Deactivate account
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
