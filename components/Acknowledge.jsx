import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";

const Acknowledge = ({ token }) => {
  console.log(token);

  const fetchData = async (token) => {
    try {
      const response = await axios.get(`/api/activate/${token}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (token) {
    fetchData(token);
  }

  return (
    <div className="mx-auto w-50 mt-5 text-center">
      <h1 className="mb-5 text-success">Verification Complete</h1>
      <Link href="/auth/signin" legacyBehavior>
        <button className="btn btn-outline-success w-50  rounded-5 fs-1">
          Sign in
        </button>
      </Link>
    </div>
  );
};

export default Acknowledge;
