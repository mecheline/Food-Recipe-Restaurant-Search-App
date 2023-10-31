import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "../styles/ForgotPassword.module.css"

const ForgetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/forget-password",
        { email }
      );
      console.log(response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };
  return (
    <div className={styles.main}>
      
      <form onSubmit={submitHandler}>
        <div className="card p-4 shadow">
          <h3 className="text-center pb-5">Enter your Email</h3>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We&lsquo;ll never share your email with anyone else.
            </div>
          </div>
         
          <button type="submit" className={styles.button}>
            Submit
          </button>
         
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
