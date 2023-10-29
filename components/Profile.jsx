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
  };

  return (
    <div className={styles.main}>
      <div className="mb-3 text-center">
        <i
          class="bi bi-skip-backward-fill fs-1"
          onClick={() => router.back()}
        ></i>
      </div>
      <div class="card shadow">
        <img src="./images/avatar.jpg" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{session.user.fullname}</h5>
          <p class="card-text">Email: {session.user.email}</p>
          <a
            href="#"
            class="btn btn-danger"
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
