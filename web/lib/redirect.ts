import { useEffect } from "react";
import { useRouter } from "next/router";

interface IRedirect {
  to: string;
}

const Redirect = ({ to }: IRedirect) => {
  const router = useRouter();

  useEffect(() => {
    router.push({ pathname: to });
  }, []);

  return null;
};

export default Redirect;
