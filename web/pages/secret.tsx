import React from "react";
import { NextPage } from "next";
import useSSR from "use-ssr";

import withApollo from "../lib/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import withAuth from "../lib/withAuth";
import { useTodosQuery } from "__generated__/graphql";
import Layout from "../components/Layout";
interface IProps {
  testingData?: string;
}

const Secret: NextPage<IProps> = () => {
  const { isBrowser, isServer } = useSSR();
  console.log("IS BROWSER: ", isBrowser ? "👍" : "👎");
  console.log("IS SERVER: ", isServer ? "👍" : "👎");

  const { data, loading, error } = useTodosQuery();

  const testFunc = (arg1: number) => {
    return arg1;
    console.log("test");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to Load </p>;

  return (
    <Layout>
      <h1>Secret</h1>
      {testFunc(3)}
      {data &&
        data.todos.map((x: any) => {
          return (
            <h5 key={x.id}>
              {x.id}
              {x.name}
            </h5>
          );
        })}
    </Layout>
  );
};

export default withApollo(withAuth(Secret), { getDataFromTree });
