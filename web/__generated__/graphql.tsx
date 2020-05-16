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
  users: Array<User>;
  getUser?: Maybe<User>;
  getUserProfile?: Maybe<User>;
  profile?: Maybe<Profile>;
  testQueryBuilder: Scalars['Boolean'];
  testTodos: Array<Todo>;
  todos: Array<Todo>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  facebookId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  created: Scalars['DateTime'];
  updated: Scalars['DateTime'];
  profile?: Maybe<Profile>;
  todos: Array<Todo>;
  comments: Array<Comment>;
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
  createProfile?: Maybe<Profile>;
  deleteUser: Scalars['Boolean'];
  authFacebook?: Maybe<Scalars['String']>;
  login?: Maybe<Scalars['String']>;
  register: Scalars['Boolean'];
  addTodo?: Maybe<Todo>;
  addComment: Scalars['Boolean'];
  deleteTodo: Scalars['Boolean'];
  deleteComment: Scalars['Boolean'];
};


export type MutationCreateProfileArgs = {
  photo: Scalars['String'];
  gender: Gender;
};


export type MutationAuthFacebookArgs = {
  facebookAccessToken: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
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

export type AddCommentInput = {
  body: Scalars['String'];
  todoId: Scalars['String'];
};

export type Subscription = {
   __typename?: 'Subscription';
  addedTodo: Todo;
};

export type TestTodosQueryVariables = {};


export type TestTodosQuery = (
  { __typename?: 'Query' }
  & { testTodos: Array<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'name'>
  )> }
);


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