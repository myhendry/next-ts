import gql from "graphql-tag";

export const ADD_TODO_MUTATION = gql`
  mutation AddTodo($name: String!) {
    addTodo(name: $name) {
      id
      name
      user {
        id
        name
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;
