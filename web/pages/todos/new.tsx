import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import withApollo from "../../lib/withApollo";
import withAuth from "../../lib/withAuth";
import { useAddTodoMutation } from "__generated__/graphql";
import { TEST_TODOS } from "graphql/queries";
import Layout from "components/Layout";

type TodoNewType = {
  name: string;
};

const TodoNew = () => {
  const router = useRouter();
  const [addTodoMutation, { loading, error }] = useAddTodoMutation();
  const { register, handleSubmit, errors } = useForm<TodoNewType>();

  const errorMessage = (error: any) => {
    return (
      (error.graphQLErrors && error.graphQLErrors[0].message) ||
      "Failed to submit form"
    );
  };

  const onSubmit = async (data: TodoNewType) => {
    const { name } = data;
    console.log(name);
    const res = await addTodoMutation({
      variables: {
        name,
      },
      update: (cache, res) => {
        // console.log("update res", res);
        // console.log("cache", cache);
        const newTodo = res.data?.addTodo;
        const data: any = cache.readQuery({ query: TEST_TODOS });
        const { testTodos } = data;
        // console.log("new todo", newTodo);
        // console.log("todos ", todos);
        cache.writeQuery({
          query: TEST_TODOS,
          data: { testTodos: [newTodo, ...testTodos] },
        });
      },
    });
    res.data && res.data.addTodo && router.push("/todos");
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            id="name"
            name="name"
            ref={register({ required: true })}
          />
          {errors.name && errors.name.type === "required" && (
            <div className="error">Your must enter your name.</div>
          )}
        </div>
        {error && <p>{errorMessage(error)}</p>}
        {loading ? <p>Loading...</p> : <button type="submit">Submit</button>}
      </form>
    </Layout>
  );
};

export default withApollo(withAuth(TodoNew));
