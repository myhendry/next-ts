import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
   __typename?: 'Query';
  profile?: Maybe<Profile>;
  testQueryBuilder: Scalars['Boolean'];
  testTodos: Array<Todo>;
  todos: Array<Todo>;
  getMe?: Maybe<User>;
  me?: Maybe<User>;
  users: Array<User>;
  getUser?: Maybe<User>;
  getUserProfile?: Maybe<User>;
};

export type Profile = {
   __typename?: 'Profile';
  id: Scalars['ID'];
  gender?: Maybe<Gender>;
  photo: Scalars['String'];
  user: User;
};

/** Gender */
export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE'
}

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  facebookId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  nickname: Scalars['String'];
  created: Scalars['DateTime'];
  updated: Scalars['DateTime'];
  profile?: Maybe<Profile>;
  todos: Array<Todo>;
  comments: Array<Comment>;
};


export type Todo = {
   __typename?: 'Todo';
  id: Scalars['ID'];
  name: Scalars['String'];
  userId: Scalars['String'];
  created: Scalars['DateTime'];
  updated: Scalars['DateTime'];
  user: User;
  comments: Array<Comment>;
};

export type Comment = {
   __typename?: 'Comment';
  id: Scalars['ID'];
  body: Scalars['String'];
  created: Scalars['DateTime'];
  updated: Scalars['DateTime'];
  user: User;
  todo: Todo;
};

export type Mutation = {
   __typename?: 'Mutation';
  addTodo?: Maybe<Todo>;
  addComment: Scalars['Boolean'];
  deleteTodo: Scalars['Boolean'];
  deleteComment: Scalars['Boolean'];
  createProfile?: Maybe<Profile>;
  deleteUser: Scalars['Boolean'];
  confirmUser: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword?: Maybe<User>;
  logout: Scalars['Boolean'];
  login: Scalars['Boolean'];
  register: Scalars['Boolean'];
};


export type MutationAddTodoArgs = {
  name: Scalars['String'];
};


export type MutationAddCommentArgs = {
  addCommentInput: AddCommentInput;
};


export type MutationDeleteTodoArgs = {
  todoId: Scalars['ID'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID'];
};


export type MutationCreateProfileArgs = {
  photo: Scalars['String'];
  gender: Gender;
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};

export type AddCommentInput = {
  body: Scalars['String'];
  todoId: Scalars['String'];
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type RegisterInput = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type Subscription = {
   __typename?: 'Subscription';
  addedTodo: Todo;
};

export type PasswordInput = {
  password: Scalars['String'];
};

export type AddTodoMutationVariables = {
  name: Scalars['String'];
};


export type AddTodoMutation = (
  { __typename?: 'Mutation' }
  & { addTodo?: Maybe<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'name'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  )> }
);

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type TodosQueryVariables = {};


export type TodosQuery = (
  { __typename?: 'Query' }
  & { todos: Array<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'name'>
  )> }
);

export type TestTodosQueryVariables = {};


export type TestTodosQuery = (
  { __typename?: 'Query' }
  & { testTodos: Array<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'name'>
  )> }
);

export type GetMeQueryVariables = {};


export type GetMeQuery = (
  { __typename?: 'Query' }
  & { getMe?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'name' | 'nickname' | 'created'>
  )> }
);


export const AddTodoDocument = gql`
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
export type AddTodoMutationFn = ApolloReactCommon.MutationFunction<AddTodoMutation, AddTodoMutationVariables>;

/**
 * __useAddTodoMutation__
 *
 * To run a mutation, you first call `useAddTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTodoMutation, { data, loading, error }] = useAddTodoMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddTodoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddTodoMutation, AddTodoMutationVariables>) {
        return ApolloReactHooks.useMutation<AddTodoMutation, AddTodoMutationVariables>(AddTodoDocument, baseOptions);
      }
export type AddTodoMutationHookResult = ReturnType<typeof useAddTodoMutation>;
export type AddTodoMutationResult = ApolloReactCommon.MutationResult<AddTodoMutation>;
export type AddTodoMutationOptions = ApolloReactCommon.BaseMutationOptions<AddTodoMutation, AddTodoMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const TodosDocument = gql`
    query Todos {
  todos {
    id
    name
  }
}
    `;

/**
 * __useTodosQuery__
 *
 * To run a query within a React component, call `useTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useTodosQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TodosQuery, TodosQueryVariables>) {
        return ApolloReactHooks.useQuery<TodosQuery, TodosQueryVariables>(TodosDocument, baseOptions);
      }
export function useTodosLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TodosQuery, TodosQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TodosQuery, TodosQueryVariables>(TodosDocument, baseOptions);
        }
export type TodosQueryHookResult = ReturnType<typeof useTodosQuery>;
export type TodosLazyQueryHookResult = ReturnType<typeof useTodosLazyQuery>;
export type TodosQueryResult = ApolloReactCommon.QueryResult<TodosQuery, TodosQueryVariables>;
export const TestTodosDocument = gql`
    query TestTodos {
  testTodos {
    id
    name
  }
}
    `;

/**
 * __useTestTodosQuery__
 *
 * To run a query within a React component, call `useTestTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestTodosQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TestTodosQuery, TestTodosQueryVariables>) {
        return ApolloReactHooks.useQuery<TestTodosQuery, TestTodosQueryVariables>(TestTodosDocument, baseOptions);
      }
export function useTestTodosLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TestTodosQuery, TestTodosQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TestTodosQuery, TestTodosQueryVariables>(TestTodosDocument, baseOptions);
        }
export type TestTodosQueryHookResult = ReturnType<typeof useTestTodosQuery>;
export type TestTodosLazyQueryHookResult = ReturnType<typeof useTestTodosLazyQuery>;
export type TestTodosQueryResult = ApolloReactCommon.QueryResult<TestTodosQuery, TestTodosQueryVariables>;
export const GetMeDocument = gql`
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

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, baseOptions);
      }
export function useGetMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, baseOptions);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = ApolloReactCommon.QueryResult<GetMeQuery, GetMeQueryVariables>;