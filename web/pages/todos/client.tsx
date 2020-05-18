import React from "react";
import { NextPage } from "next";
import useSSR from "use-ssr";
import { Card } from "semantic-ui-react";

import withApollo from "../../lib/withApollo";
import withAuth from "../../lib/withAuth";
import { useTodosQuery } from "__generated__/graphql";
import Layout from "../../components/Layout";

interface IProps {
  testingData?: string;
}

const Todos: NextPage<IProps> = () => {
  const { isBrowser, isServer } = useSSR();
  console.log("TODO C IS BROWSER: ", isBrowser ? "👍" : "👎");
  console.log("TODO C IS SERVER: ", isServer ? "👍" : "👎");

  const { data, loading, error } = useTodosQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to Load </p>;

  return (
    <Layout>
      <h1>Todos</h1>
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

export default withApollo(withAuth(Todos));
