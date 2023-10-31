import React, { useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import styles from "../styles/ForgotPassword.module.css";
// import { config } from "dotenv";

const NewPassword = ({ token }) => {
  const router = useRouter();
  const passwordInput = useRef();
  const newpasswordInput = useRef();

  const postData = (e) => {
    e.preventDefault();
    const password = passwordInput.current.value;
    const newpassword = newpasswordInput.current.value;

    const payload = {
      password,
      newpassword,
    };

    console.log(payload);

    fetch(`/api/forget-password/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          return toast.error(data.error);
        }
        toast.success(data.message);
        router.push("/auth/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form className={styles.main} onSubmit={postData}>
        <div className="card p-4 shadow">
          <h3 className="text-center pb-5">Reset Password</h3>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              ref={passwordInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Re-Enter New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              ref={newpasswordInput}
            />
          </div>

          <button type="submit" className={styles.button}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
