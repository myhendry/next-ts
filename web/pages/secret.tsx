import React from "react";
import withApollo from "../lib/withApollo";
import withAuth from "../lib/withAuth";

const Secret = () => {
  return <h1>This is secret</h1>;
};

export default withApollo(withAuth(Secret));
