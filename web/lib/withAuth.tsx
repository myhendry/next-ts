import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_ME_QUERY } from "../graphql/queries";
import Redirect from "./Redirect";

export default (
  WrappedComponent: any,
  options = { ssr: false },
  role: string = "guest"
) => {
  function withAuth(props: any) {
    const { data: { getMe = {} } = {}, loading, error } = useQuery(
      GET_ME_QUERY,
      {
        fetchPolicy: "network-only",
      }
    );

    if (loading) {
      return <p>Authenticating...</p>;
    }

    if (!loading && (!getMe || error) && typeof window !== "undefined") {
      return <Redirect to="/login" />;
    }

    // TODO: Check for role
    if (getMe) {
      console.log("role", role);
      // if (role !== "guest") {
      //   return <Redirect to="/" />;
      // }
      return <WrappedComponent {...props} />;
    }

    return <p>Authenticating...</p>;
  }

  if (options.ssr) {
    const serverRedirect = (res: any, to: string) => {
      res.redirect(to);
      res.end();
      return {};
    };

    withAuth.getInitialProps = async (context: any) => {
      const { req, res } = context;
      if (req) {
        //todo find req user
        console.log("withAuth req", req.headers);
        console.log("Authenticating on Server Side");

        const user = req.headers.cookie;

        if (!user) {
          return serverRedirect(res, "/login");
        }

        // todo roles
        // if (role && !role.includes(user.role)) {
        //   return serverRedirect(res, "/login");
        // }
      }

      const pageProps =
        (await WrappedComponent.getInitialProps) &&
        WrappedComponent.getInitialProps(context);
      return { ...pageProps };
    };
  }

  return withAuth;
};
