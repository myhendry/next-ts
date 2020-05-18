import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_ME_QUERY } from "../graphql/queries";
import Redirect from "./Redirect";

export default (WrappedComponent: any, role: string = "guest") => (
  props: any
) => {
  const { data: { getMe = {} } = {}, loading, error } = useQuery(GET_ME_QUERY, {
    fetchPolicy: "network-only",
  });

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
};
