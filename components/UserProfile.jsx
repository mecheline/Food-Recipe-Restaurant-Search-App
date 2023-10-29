import { signOut, useSession } from "next-auth/react";
import styles from "../styles/Profile.module.css";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

const UserProfile = ({ data }) => {
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
      // await signOut({ redirect: false });
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
      <div key={data.id} class="card shadow">
        <img
          src="https://media.istockphoto.com/id/1698148398/photo/3d-user-profile-icon-person-icon-employee-icon-avatar-icon-people-icon-web-user-symbol-social.jpg?s=612x612&w=0&k=20&c=3pOYEitRjh8KrFoUaLWuYxiz8kK9hiHr8-ph-gZDzuQ="
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">{data.name}</h5>
          <p class="card-text">Email: {data.email}</p>
          <p class="card-text">Gender: {data.gender}</p>
          {/* <a
            href="#"
            class="btn btn-danger"
            onClick={() => handleDelete(data.id)}
          >
            Deactivate account
          </a> */}
        </div>
      </div>
      ;
    </div>
  );
};

export default UserProfile;
