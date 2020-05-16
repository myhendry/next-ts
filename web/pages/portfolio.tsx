import React from "react";
import { NextPage } from "next";
import { useQuery } from "@apollo/react-hooks";
// import { getDataFromTree } from "@apollo/react-ssr";
import useSSR from "use-ssr";

import { withApollo } from "../lib/apollo";
import { TEST_TODOS } from "../graphql/queries";

interface IProps {
  testingData?: string;
}

const Portfolio: NextPage<IProps> = () => {
  const { isBrowser, isServer } = useSSR();
  console.log("IS BROWSER: ", isBrowser ? "👍" : "👎");
  console.log("IS SERVER: ", isServer ? "👍" : "👎");

  const { data } = useQuery(TEST_TODOS);
  console.log("data", data);
  const todos = (data && data.testTodos) || [];

  const testFunc = (arg1: number) => {
    return arg1;
    console.log("test");
  };

  return (
    <div>
      <h1>Portfolio</h1>
      {testFunc(3)}
      {todos.map((x: any) => {
        return (
          <h5 key={x.id}>
            {x.id}
            {x.name}
          </h5>
        );
      })}
    </div>
  );
};

export default withApollo({ ssr: true })(Portfolio);
