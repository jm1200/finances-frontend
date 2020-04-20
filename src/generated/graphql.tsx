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
  Upload: any;
};

export type CategoryEntity = {
   __typename?: 'CategoryEntity';
  id: Scalars['Int'];
  name: Scalars['String'];
  userId: Scalars['Int'];
  user: UserEntity;
  subCategories?: Maybe<Array<SubCategoryEntity>>;
  transactions: Array<TransactionEntity>;
};

export type LoginResponse = {
   __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: UserEntity;
};

export type MeResponse = {
   __typename?: 'MeResponse';
  user?: Maybe<UserEntity>;
};

export type Mutation = {
   __typename?: 'Mutation';
  uploadFile: UploadResponse;
  submitTransactions: SubmitTransactionsResponse;
  updateTheme?: Maybe<UserSettingsEntity>;
  logout: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  login: LoginResponse;
  register: LoginResponse;
  updateCategoriesInTransaction: Scalars['Boolean'];
  addCategory: Scalars['Boolean'];
  updateCategory: Scalars['Boolean'];
  deleteCategory: Scalars['Boolean'];
  addSubCategory: Scalars['Boolean'];
  deleteSubCategory: Scalars['Boolean'];
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};


export type MutationSubmitTransactionsArgs = {
  transactions: Array<TransactionInput>;
};


export type MutationUpdateThemeArgs = {
  id: Scalars['Int'];
  theme: Scalars['String'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['Int'];
};


export type MutationLoginArgs = {
  data: RegisterInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationUpdateCategoriesInTransactionArgs = {
  data: UpdateTransactionInput;
};


export type MutationAddCategoryArgs = {
  name: Scalars['String'];
};


export type MutationUpdateCategoryArgs = {
  categoryId: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['Int'];
};


export type MutationAddSubCategoryArgs = {
  categoryId: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationDeleteSubCategoryArgs = {
  subCategoryId: Scalars['Int'];
};

export type Query = {
   __typename?: 'Query';
  getUserSettings: UserSettingsEntity;
  hello: Scalars['String'];
  bye: Scalars['String'];
  user: UserEntity;
  users: Array<UserEntity>;
  me?: Maybe<MeResponse>;
  getAllTransactions: Array<TransactionEntity>;
  getTransactionsById: TransactionEntity;
  getUserCategories: Array<CategoryEntity>;
  getCategorybyId: CategoryEntity;
};


export type QueryGetUserSettingsArgs = {
  userId: Scalars['Int'];
};


export type QueryGetTransactionsByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetCategorybyIdArgs = {
  categoryId: Scalars['Int'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SubCategoryEntity = {
   __typename?: 'SubCategoryEntity';
  id: Scalars['Int'];
  name: Scalars['String'];
  categoryId: Scalars['Int'];
  category: CategoryEntity;
  userId: Scalars['Int'];
  user: UserEntity;
  transactions: Array<TransactionEntity>;
};

export type SubmitTransactionsResponse = {
   __typename?: 'SubmitTransactionsResponse';
  inserted: Scalars['Boolean'];
  message: Scalars['String'];
};

export type TransactionClass = {
   __typename?: 'TransactionClass';
  id: Scalars['String'];
  transId: Scalars['String'];
  userId: Scalars['Float'];
  account: Scalars['String'];
  type: Scalars['String'];
  datePosted: Scalars['String'];
  name: Scalars['String'];
  memo: Scalars['String'];
  amount: Scalars['Float'];
};

export type TransactionEntity = {
   __typename?: 'TransactionEntity';
  id: Scalars['String'];
  transId: Scalars['String'];
  userId: Scalars['Int'];
  user: UserEntity;
  account: Scalars['String'];
  type: Scalars['String'];
  datePosted: Scalars['String'];
  name: Scalars['String'];
  memo: Scalars['String'];
  amount: Scalars['Float'];
  subCategoryName?: Maybe<Scalars['String']>;
  categoryName?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['Int']>;
  category?: Maybe<CategoryEntity>;
  subCategory?: Maybe<SubCategoryEntity>;
};

export type TransactionInput = {
  id: Scalars['String'];
  userId: Scalars['Int'];
  transId: Scalars['String'];
  account: Scalars['String'];
  type: Scalars['String'];
  datePosted: Scalars['String'];
  name: Scalars['String'];
  memo: Scalars['String'];
  amount: Scalars['Float'];
};

export type UpdateTransactionInput = {
  ids: Array<Scalars['String']>;
  categoryId: Scalars['Int'];
  subCategoryName?: Maybe<Scalars['String']>;
};


export type UploadResponse = {
   __typename?: 'UploadResponse';
  uploaded: Scalars['Boolean'];
  name: Scalars['String'];
  account: Scalars['String'];
  rangeStart: Scalars['String'];
  rangeEnd: Scalars['String'];
  transactions: Array<TransactionClass>;
};

export type UserEntity = {
   __typename?: 'UserEntity';
  id: Scalars['Int'];
  email: Scalars['String'];
  userSettingsId: Scalars['Int'];
  userSettings: UserSettingsEntity;
  transactions: Array<TransactionEntity>;
  categories: Array<CategoryEntity>;
  subCategories: Array<SubCategoryEntity>;
};

export type UserSettingsEntity = {
   __typename?: 'UserSettingsEntity';
  id: Scalars['Int'];
  theme: Scalars['String'];
};

export type ByeQueryVariables = {};


export type ByeQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'bye'>
);

export type AddCategoryMutationVariables = {
  name: Scalars['String'];
};


export type AddCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addCategory'>
);

export type UpdateCategoryMutationVariables = {
  categoryId: Scalars['Int'];
  name: Scalars['String'];
};


export type UpdateCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateCategory'>
);

export type AddSubCategoryMutationVariables = {
  name: Scalars['String'];
  categoryId: Scalars['Int'];
};


export type AddSubCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addSubCategory'>
);

export type DeleteSubCategoryMutationVariables = {
  subCategoryId: Scalars['Int'];
};


export type DeleteSubCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteSubCategory'>
);

export type DeleteCategoryMutationVariables = {
  categoryId: Scalars['Int'];
};


export type DeleteCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCategory'>
);

export type GetCategoryQueryVariables = {
  categoryId: Scalars['Int'];
};


export type GetCategoryQuery = (
  { __typename?: 'Query' }
  & { getCategorybyId: (
    { __typename?: 'CategoryEntity' }
    & Pick<CategoryEntity, 'id' | 'name'>
    & { subCategories?: Maybe<Array<(
      { __typename?: 'SubCategoryEntity' }
      & Pick<SubCategoryEntity, 'id' | 'name'>
    )>> }
  ) }
);

export type HelloQueryVariables = {};


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'email' | 'userSettingsId'>
      & { userSettings: (
        { __typename?: 'UserSettingsEntity' }
        & Pick<UserSettingsEntity, 'theme'>
      ) }
    ) }
  ) }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'MeResponse' }
    & { user?: Maybe<(
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'email' | 'id' | 'userSettingsId'>
      & { userSettings: (
        { __typename?: 'UserSettingsEntity' }
        & Pick<UserSettingsEntity, 'theme'>
      ) }
    )> }
  )> }
);

export type RegisterMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'email' | 'userSettingsId'>
      & { userSettings: (
        { __typename?: 'UserSettingsEntity' }
        & Pick<UserSettingsEntity, 'theme'>
      ) }
    ) }
  ) }
);

export type UpdateThemeMutationVariables = {
  id: Scalars['Int'];
  theme: Scalars['String'];
};


export type UpdateThemeMutation = (
  { __typename?: 'Mutation' }
  & { updateTheme?: Maybe<(
    { __typename?: 'UserSettingsEntity' }
    & Pick<UserSettingsEntity, 'theme'>
  )> }
);

export type GetAllTransactionsQueryVariables = {};


export type GetAllTransactionsQuery = (
  { __typename?: 'Query' }
  & { getAllTransactions: Array<(
    { __typename?: 'TransactionEntity' }
    & Pick<TransactionEntity, 'id' | 'name' | 'categoryId' | 'categoryName' | 'subCategoryName'>
  )> }
);

export type UpdateCategoriesInTransactionMutationVariables = {
  ids: Array<Scalars['String']>;
  categoryId: Scalars['Int'];
  subCategoryName?: Maybe<Scalars['String']>;
};


export type UpdateCategoriesInTransactionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateCategoriesInTransaction'>
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'UserEntity' }
    & Pick<UserEntity, 'id' | 'email'>
  )> }
);

export type UserQueryVariables = {};


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'UserEntity' }
    & Pick<UserEntity, 'id'>
    & { transactions: Array<(
      { __typename?: 'TransactionEntity' }
      & Pick<TransactionEntity, 'id' | 'transId' | 'name' | 'datePosted' | 'amount' | 'memo' | 'type' | 'account' | 'categoryId' | 'categoryName' | 'subCategoryName'>
    )>, categories: Array<(
      { __typename?: 'CategoryEntity' }
      & Pick<CategoryEntity, 'id' | 'name'>
      & { subCategories?: Maybe<Array<(
        { __typename?: 'SubCategoryEntity' }
        & Pick<SubCategoryEntity, 'id' | 'name'>
      )>> }
    )> }
  ) }
);


export const ByeDocument = gql`
    query Bye {
  bye
}
    `;

/**
 * __useByeQuery__
 *
 * To run a query within a React component, call `useByeQuery` and pass it any options that fit your needs.
 * When your component renders, `useByeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useByeQuery({
 *   variables: {
 *   },
 * });
 */
export function useByeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ByeQuery, ByeQueryVariables>) {
        return ApolloReactHooks.useQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
      }
export function useByeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ByeQuery, ByeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
        }
export type ByeQueryHookResult = ReturnType<typeof useByeQuery>;
export type ByeLazyQueryHookResult = ReturnType<typeof useByeLazyQuery>;
export type ByeQueryResult = ApolloReactCommon.QueryResult<ByeQuery, ByeQueryVariables>;
export const AddCategoryDocument = gql`
    mutation AddCategory($name: String!) {
  addCategory(name: $name)
}
    `;
export type AddCategoryMutationFn = ApolloReactCommon.MutationFunction<AddCategoryMutation, AddCategoryMutationVariables>;

/**
 * __useAddCategoryMutation__
 *
 * To run a mutation, you first call `useAddCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCategoryMutation, { data, loading, error }] = useAddCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddCategoryMutation, AddCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<AddCategoryMutation, AddCategoryMutationVariables>(AddCategoryDocument, baseOptions);
      }
export type AddCategoryMutationHookResult = ReturnType<typeof useAddCategoryMutation>;
export type AddCategoryMutationResult = ApolloReactCommon.MutationResult<AddCategoryMutation>;
export type AddCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<AddCategoryMutation, AddCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($categoryId: Int!, $name: String!) {
  updateCategory(categoryId: $categoryId, name: $name)
}
    `;
export type UpdateCategoryMutationFn = ApolloReactCommon.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, baseOptions);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = ApolloReactCommon.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const AddSubCategoryDocument = gql`
    mutation AddSubCategory($name: String!, $categoryId: Int!) {
  addSubCategory(name: $name, categoryId: $categoryId)
}
    `;
export type AddSubCategoryMutationFn = ApolloReactCommon.MutationFunction<AddSubCategoryMutation, AddSubCategoryMutationVariables>;

/**
 * __useAddSubCategoryMutation__
 *
 * To run a mutation, you first call `useAddSubCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSubCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSubCategoryMutation, { data, loading, error }] = useAddSubCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useAddSubCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddSubCategoryMutation, AddSubCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<AddSubCategoryMutation, AddSubCategoryMutationVariables>(AddSubCategoryDocument, baseOptions);
      }
export type AddSubCategoryMutationHookResult = ReturnType<typeof useAddSubCategoryMutation>;
export type AddSubCategoryMutationResult = ApolloReactCommon.MutationResult<AddSubCategoryMutation>;
export type AddSubCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<AddSubCategoryMutation, AddSubCategoryMutationVariables>;
export const DeleteSubCategoryDocument = gql`
    mutation DeleteSubCategory($subCategoryId: Int!) {
  deleteSubCategory(subCategoryId: $subCategoryId)
}
    `;
export type DeleteSubCategoryMutationFn = ApolloReactCommon.MutationFunction<DeleteSubCategoryMutation, DeleteSubCategoryMutationVariables>;

/**
 * __useDeleteSubCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteSubCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubCategoryMutation, { data, loading, error }] = useDeleteSubCategoryMutation({
 *   variables: {
 *      subCategoryId: // value for 'subCategoryId'
 *   },
 * });
 */
export function useDeleteSubCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteSubCategoryMutation, DeleteSubCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteSubCategoryMutation, DeleteSubCategoryMutationVariables>(DeleteSubCategoryDocument, baseOptions);
      }
export type DeleteSubCategoryMutationHookResult = ReturnType<typeof useDeleteSubCategoryMutation>;
export type DeleteSubCategoryMutationResult = ApolloReactCommon.MutationResult<DeleteSubCategoryMutation>;
export type DeleteSubCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteSubCategoryMutation, DeleteSubCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($categoryId: Int!) {
  deleteCategory(categoryId: $categoryId)
}
    `;
export type DeleteCategoryMutationFn = ApolloReactCommon.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, baseOptions);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = ApolloReactCommon.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const GetCategoryDocument = gql`
    query GetCategory($categoryId: Int!) {
  getCategorybyId(categoryId: $categoryId) {
    id
    name
    subCategories {
      id
      name
    }
  }
}
    `;

/**
 * __useGetCategoryQuery__
 *
 * To run a query within a React component, call `useGetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useGetCategoryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, baseOptions);
      }
export function useGetCategoryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, baseOptions);
        }
export type GetCategoryQueryHookResult = ReturnType<typeof useGetCategoryQuery>;
export type GetCategoryLazyQueryHookResult = ReturnType<typeof useGetCategoryLazyQuery>;
export type GetCategoryQueryResult = ApolloReactCommon.QueryResult<GetCategoryQuery, GetCategoryQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return ApolloReactHooks.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
export function useHelloLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = ApolloReactCommon.QueryResult<HelloQuery, HelloQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(data: {email: $email, password: $password}) {
    accessToken
    user {
      id
      email
      userSettingsId
      userSettings {
        theme
      }
    }
  }
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
export const MeDocument = gql`
    query Me {
  me {
    user {
      email
      id
      userSettingsId
      userSettings {
        theme
      }
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(data: {email: $email, password: $password}) {
    accessToken
    user {
      id
      email
      userSettingsId
      userSettings {
        theme
      }
    }
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateThemeDocument = gql`
    mutation UpdateTheme($id: Int!, $theme: String!) {
  updateTheme(id: $id, theme: $theme) {
    theme
  }
}
    `;
export type UpdateThemeMutationFn = ApolloReactCommon.MutationFunction<UpdateThemeMutation, UpdateThemeMutationVariables>;

/**
 * __useUpdateThemeMutation__
 *
 * To run a mutation, you first call `useUpdateThemeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateThemeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateThemeMutation, { data, loading, error }] = useUpdateThemeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      theme: // value for 'theme'
 *   },
 * });
 */
export function useUpdateThemeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateThemeMutation, UpdateThemeMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateThemeMutation, UpdateThemeMutationVariables>(UpdateThemeDocument, baseOptions);
      }
export type UpdateThemeMutationHookResult = ReturnType<typeof useUpdateThemeMutation>;
export type UpdateThemeMutationResult = ApolloReactCommon.MutationResult<UpdateThemeMutation>;
export type UpdateThemeMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateThemeMutation, UpdateThemeMutationVariables>;
export const GetAllTransactionsDocument = gql`
    query GetAllTransactions {
  getAllTransactions {
    id
    name
    categoryId
    categoryName
    subCategoryName
  }
}
    `;

/**
 * __useGetAllTransactionsQuery__
 *
 * To run a query within a React component, call `useGetAllTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTransactionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTransactionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>(GetAllTransactionsDocument, baseOptions);
      }
export function useGetAllTransactionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>(GetAllTransactionsDocument, baseOptions);
        }
export type GetAllTransactionsQueryHookResult = ReturnType<typeof useGetAllTransactionsQuery>;
export type GetAllTransactionsLazyQueryHookResult = ReturnType<typeof useGetAllTransactionsLazyQuery>;
export type GetAllTransactionsQueryResult = ApolloReactCommon.QueryResult<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>;
export const UpdateCategoriesInTransactionDocument = gql`
    mutation UpdateCategoriesInTransaction($ids: [String!]!, $categoryId: Int!, $subCategoryName: String) {
  updateCategoriesInTransaction(data: {ids: $ids, categoryId: $categoryId, subCategoryName: $subCategoryName})
}
    `;
export type UpdateCategoriesInTransactionMutationFn = ApolloReactCommon.MutationFunction<UpdateCategoriesInTransactionMutation, UpdateCategoriesInTransactionMutationVariables>;

/**
 * __useUpdateCategoriesInTransactionMutation__
 *
 * To run a mutation, you first call `useUpdateCategoriesInTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoriesInTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoriesInTransactionMutation, { data, loading, error }] = useUpdateCategoriesInTransactionMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *      categoryId: // value for 'categoryId'
 *      subCategoryName: // value for 'subCategoryName'
 *   },
 * });
 */
export function useUpdateCategoriesInTransactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCategoriesInTransactionMutation, UpdateCategoriesInTransactionMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCategoriesInTransactionMutation, UpdateCategoriesInTransactionMutationVariables>(UpdateCategoriesInTransactionDocument, baseOptions);
      }
export type UpdateCategoriesInTransactionMutationHookResult = ReturnType<typeof useUpdateCategoriesInTransactionMutation>;
export type UpdateCategoriesInTransactionMutationResult = ApolloReactCommon.MutationResult<UpdateCategoriesInTransactionMutation>;
export type UpdateCategoriesInTransactionMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCategoriesInTransactionMutation, UpdateCategoriesInTransactionMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    email
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
export const UserDocument = gql`
    query User {
  user {
    id
    transactions {
      id
      transId
      name
      datePosted
      amount
      memo
      type
      account
      categoryId
      categoryName
      subCategoryName
    }
    categories {
      id
      name
      subCategories {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;