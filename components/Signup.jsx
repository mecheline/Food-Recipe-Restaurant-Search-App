import { useState } from "react";
import styles from "../styles/Signup.module.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Signup = () => {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const sendData = async (e) => {
    e.preventDefault();
    console.log(fullname, gender, email, password, confirmpassword);
    if (confirmpassword !== password) {
      return toast.error("Password not match", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    const data = {
      fullname,
      gender,
      email,
      password,
    };
    try {
      const res = await axios.post("/api/signup", data);
      console.log(res.data);
      if (res.status === 200) {
        router.push("/auth/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.main} onSubmit={sendData}>
      <div className="card p-4 shadow">
        <h3 className="text-center">Sign up</h3>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            aria-describedby="fullName"
            placeholder="Enter your name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            id="gender"
            defaultValue={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option selected disabled>
              ---Select---
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="abc@xyz.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We&lsquo;ll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputCPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputCPassword1"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.button}>
          Signup
        </button>
        <small className="mt-2">
          Already have an account?{" "}
          <Link href="/auth/signin" legacyBehavior>
            <a className="text-decoration-none text-black fw-bold">Signin</a>
          </Link>
        </small>
      </div>
    </form>
  );
};

export default Signup;
