import gql from "graphql-tag";

export const TEST_TODOS = gql`
  query TestTodos {
    testTodos {
      id
      name
    }
  }
`;
