import  { useState } from "react";
import styles from "../styles/Signin.module.css";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const status = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      console.log(status);
      if (status.ok) {
        toast.success("Signed in successfully");
        router.push("/");
      }
      toast.error(status.error);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.main}>
      <div className="mb-3 text-center">
        <i
          className="bi bi-house-door fs-1"
          onClick={() => router.push("/")}
        ></i>
      </div>
      <form onSubmit={submitHandler}>
        <div className="card p-4 shadow">
          <h3 className="text-center">Sign in</h3>

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
          <button type="submit" className={styles.button}>
            Signin
          </button>
          <div className="d-flex justify-content-between mt-3">
            <small className="mt-2">
              Don&lsquo;t have an account?{" "}
              <Link href="/auth/signup" legacyBehavior>
                <a className="text-decoration-none text-black fw-bold">
                  Signup
                </a>
              </Link>
            </small>
            <small className="mt-2">
              <Link href="/forget-password" legacyBehavior>
                <a className="text-decoration-none text-black fw-bold">
                  Forget Password
                </a>
              </Link>
            </small>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
