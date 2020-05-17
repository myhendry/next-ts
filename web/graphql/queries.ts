import gql from "graphql-tag";

export const TEST_TODOS = gql`
  query TestTodos {
    testTodos {
      id
      name
    }
  }
`;

export const GET_ME_QUERY = gql`
  query GetMe {
    getMe {
      id
      email
      name
      nickname
      created
    }
  }
`;
