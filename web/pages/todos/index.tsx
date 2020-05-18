import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import useSSR from "use-ssr";
import { Card, Icon } from "semantic-ui-react";

import withApollo from "../../lib/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import withAuth from "../../lib/withAuth";
import { useTodosQuery } from "__generated__/graphql";
import Layout from "../../components/Layout";

interface IProps {
  testingData?: string;
}

const Todos: NextPage<IProps> = () => {
  const { isBrowser, isServer } = useSSR();
  console.log("TODOS S IS BROWSER: ", isBrowser ? "👍" : "👎");
  console.log("TODOS S IS SERVER: ", isServer ? "👍" : "👎");

  const { data, loading, error } = useTodosQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to Load </p>;

  return (
    <Layout>
      <h1>Todos</h1>
      <Link href="/todos/new" passHref>
        <a>
          <Icon color="red" name="plus" />
        </a>
      </Link>

      {data &&
        data.todos.map((x: any) => {
          return (
            <Card
              key={x.id}
              href="#card-example-link-card"
              header={x.name}
              meta={x.id}
              description={`gadflkglkd asdkfad;sfkads;lkfasdfkaksdfkadf`}
            />
          );
        })}
    </Layout>
  );
};

Todos.getInitialProps = (ctx): any => {
  console.log("getInitialProps", ctx);
  return {};
};

export default withApollo(withAuth(Todos), { getDataFromTree });
