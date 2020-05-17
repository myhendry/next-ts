import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { useLoginMutation } from "__generated__/graphql";
import withApollo from "../lib/withApollo";
import { GET_ME_QUERY } from "../graphql/queries";

type LoginType = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [loginMutation, { loading, error }] = useLoginMutation({
    refetchQueries: [{ query: GET_ME_QUERY }],
  });
  const { register, handleSubmit, errors } = useForm<LoginType>();

  const errorMessage = (error: any) => {
    return (
      (error.graphQLErrors && error.graphQLErrors[0].message) ||
      "Failed to submit form"
    );
  };

  const onSubmit = async (data: LoginType) => {
    const { email, password } = data;
    const res = await loginMutation({
      variables: {
        email,
        password,
      },
    });

    res.data && res.data.login && router.push("/portfolio");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          ref={register({ required: true })}
        />
        {errors.email && errors.email.type === "required" && (
          <div className="error">Your must enter your email.</div>
        )}
      </div>
      <div className="field">
        <label htmlFor="name">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          ref={register({ required: true })}
        />
        {errors.password && errors.password.type === "required" && (
          <div className="error">Your must enter your password.</div>
        )}
      </div>
      {error && <p>{errorMessage(error)}</p>}
      {loading ? <p>Loading...</p> : <button type="submit">Save</button>}
    </form>
  );
};

export default withApollo(Login);
