import { useRouter } from "next/router";
import axios from "axios";
import Acknowledge from "@/components/Acknowledge";

export default function token() {
  const router = useRouter();
  const { token } = router.query;
  console.log(token);
  if (!token) return <div>Loading...</div>;

  return (
    <div>

      <Acknowledge token={token} />
    </div>
  );
}

// export default async function activateUser(req, res) {
//   console.log(req.query.token);
//   const token = req.query.token;
//   console.log(token);
//   if (!token) {
//     return res.status(401).json({ message: "Invalid user4" });
//   }
//   try {
//     const response = await axios.get(
//       `http://localhost:3000/api/activate/${token}`
//     );
//     console.log(response.data);
//     if (response.status >= 400) {
//       return res.status(401).json({ message: "Invalid user3" });
//     }
//     res.writeHead(307, { Location: "/users/activated" });

//     res.end();
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function getServerSideProps({ req, res, params }) {
//   const token = params.token;
//   console.log(token);
//   const response = await axios.get(
//     `${process.env.NEXTAUTH_URL}/api/activate/${token}`
//   );
//   const output = await response.data;
//   console.log(output, "right");
//   if (output.status >= 400) {
//     throw new Error({ message: "Invalid user3" });
//   }

//   return {
//     props: { token: token },
//   };
// }
