
import { useRouter } from "next/router";
import NewPassword from "@/components/NewPassword";


const Token = () => {
  const router = useRouter();
  const { token } = router.query;
  console.log(token);
  if (!token) return <h3>Loading...</h3>;
  return (
    <div>
      <NewPassword token={token} />
    </div>
  );
};

export default Token;
