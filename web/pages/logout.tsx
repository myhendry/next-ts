import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/react-hooks";

import withApollo from "../lib/withApollo";
import { LOGOUT_MUTATION } from "../graphql/mutations";

const Logout = (props: any) => {
  const { apollo } = props;
  const router = useRouter();

  const [logOut] = useMutation(LOGOUT_MUTATION);

  useEffect(() => {
    logOut().then(() => {
      apollo.resetStore().then(() => router.push("/login"));
    });
  }, []);

  return (
    <>
      <h3>Logging Out...</h3>
    </>
  );
};

export default withApollo(Logout);
