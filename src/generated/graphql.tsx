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
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type ArrayedBudgetCategoryRow = {
   __typename?: 'ArrayedBudgetCategoryRow';
  categoryId: Scalars['String'];
  categoryName: Scalars['String'];
  subCategoryLength: Scalars['Float'];
  subCategories: Array<DisplaySubCategoryRow>;
};

export type BudgetsEntity = {
   __typename?: 'BudgetsEntity';
  id: Scalars['String'];
  userId: Scalars['String'];
  name: Scalars['String'];
  values: Scalars['String'];
};

export type CategoryEntity = {
   __typename?: 'CategoryEntity';
  id: Scalars['String'];
  name: Scalars['String'];
  userId: Scalars['String'];
  user: UserEntity;
  subCategories?: Maybe<Array<SubCategoryEntity>>;
  transactions: Array<TransactionEntity>;
  savedCategories: Array<SavedCategoriesEntity>;
  categoryTotals: Array<CategoryTotalsEntity>;
};

export type CategoryTotalsEntity = {
   __typename?: 'CategoryTotalsEntity';
  id: Scalars['String'];
  userId: Scalars['String'];
  lastUpdate: Scalars['Timestamp'];
  user: UserEntity;
  month: Scalars['String'];
  year: Scalars['String'];
  total: Scalars['Float'];
  subCategoryId?: Maybe<Scalars['String']>;
  categoryId: Scalars['String'];
  category: CategoryEntity;
  subCategory?: Maybe<SubCategoryEntity>;
};

export type DisplaySubCategoryRow = {
   __typename?: 'DisplaySubCategoryRow';
  subCategoryId: Scalars['String'];
  subCategoryName: Scalars['String'];
  inputValue: Scalars['Float'];
  avg: Scalars['Float'];
  currentMonth: Scalars['Float'];
  lastMonth: Scalars['Float'];
  lastYearCurrentMonth: Scalars['Float'];
  lastYearLastMonth: Scalars['Float'];
};

export type DisplayYear = {
   __typename?: 'DisplayYear';
  year: Scalars['String'];
  amount: Scalars['Float'];
};

export type IDisplayData = {
   __typename?: 'IDisplayData';
  categoryName: Scalars['String'];
  subCategoryName: Scalars['String'];
  categoryId: Scalars['String'];
  subCategoryLength: Scalars['Float'];
  Jan: Scalars['String'];
  Feb: Scalars['String'];
  Mar: Scalars['String'];
  Apr: Scalars['String'];
  May: Scalars['String'];
  Jun: Scalars['String'];
  Jul: Scalars['String'];
  Aug: Scalars['String'];
  Sep: Scalars['String'];
  Oct: Scalars['String'];
  Nov: Scalars['String'];
  Dec: Scalars['String'];
  low: Scalars['String'];
  high: Scalars['String'];
  avg: Scalars['String'];
  med: Scalars['String'];
  subCategories: Array<IDisplaySubCategoryRow>;
};

export type IDisplayDataSummary = {
   __typename?: 'IDisplayDataSummary';
  categoryName: Scalars['String'];
  subCategoryName: Scalars['String'];
  categoryId: Scalars['String'];
  subCategoryLength: Scalars['Float'];
  years: Array<DisplayYear>;
  subCategories: Array<IDisplaySubCategoryRowSummary>;
};

export type IDisplaySubCategoryRow = {
   __typename?: 'IDisplaySubCategoryRow';
  subCategoryName: Scalars['String'];
  subCategoryId: Scalars['String'];
  Jan: Scalars['String'];
  Feb: Scalars['String'];
  Mar: Scalars['String'];
  Apr: Scalars['String'];
  May: Scalars['String'];
  Jun: Scalars['String'];
  Jul: Scalars['String'];
  Aug: Scalars['String'];
  Sep: Scalars['String'];
  Oct: Scalars['String'];
  Nov: Scalars['String'];
  Dec: Scalars['String'];
  low: Scalars['String'];
  high: Scalars['String'];
  avg: Scalars['String'];
  med: Scalars['String'];
};

export type IDisplaySubCategoryRowSummary = {
   __typename?: 'IDisplaySubCategoryRowSummary';
  subCategoryName: Scalars['String'];
  subCategoryId: Scalars['String'];
  years: Array<DisplayYear>;
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
  updateCategoriesInTransactions: Scalars['Boolean'];
  addCategory: Scalars['Boolean'];
  updateCategory: Scalars['Boolean'];
  deleteCategory: Scalars['Boolean'];
  addSubCategory: Scalars['Boolean'];
  deleteSubCategory: Scalars['Boolean'];
  createSavedCategory: SavedCategoriesEntity;
  deleteSavedCategory: Scalars['Boolean'];
  createBudget: BudgetsEntity;
  deleteBudget: Scalars['Boolean'];
};


export type MutationUploadFileArgs = {
  book: Scalars['String'];
  file: Scalars['Upload'];
};


export type MutationSubmitTransactionsArgs = {
  transactions: Array<TransactionInput>;
};


export type MutationUpdateThemeArgs = {
  id: Scalars['String'];
  theme: Scalars['String'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['String'];
};


export type MutationLoginArgs = {
  data: RegisterInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationUpdateCategoriesInTransactionsArgs = {
  data: UpdateCategoriesInTransactionsInput;
};


export type MutationAddCategoryArgs = {
  name: Scalars['String'];
};


export type MutationUpdateCategoryArgs = {
  categoryId: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['String'];
};


export type MutationAddSubCategoryArgs = {
  categoryId: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteSubCategoryArgs = {
  subCategoryId: Scalars['String'];
};


export type MutationCreateSavedCategoryArgs = {
  data: SavedCategoriesInput;
};


export type MutationDeleteSavedCategoryArgs = {
  savedCategoryId: Scalars['String'];
};


export type MutationCreateBudgetArgs = {
  values: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteBudgetArgs = {
  budgetId: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  getUserSettings: UserSettingsEntity;
  hello: Scalars['String'];
  bye: Scalars['String'];
  user: UserEntity;
  users: Array<UserEntity>;
  me?: Maybe<MeResponse>;
  getUserTransactions: Array<TransactionEntity>;
  getTransactionsById: TransactionEntity;
  getTransactionsByMonth: Array<TransactionEntity>;
  getTotalsForSummary: Array<IDisplayDataSummary>;
  getUserTransactionsForBudget: Array<ArrayedBudgetCategoryRow>;
  getUserTransactionsForTransactionsPage: TransPageReturn;
  getUserCategories: Array<CategoryEntity>;
  getOnlyUserSubCategories: Array<SubCategoryEntity>;
  getUserSubCategoriesForCashFlow: Array<IDisplayData>;
  getCategorybyId: CategoryEntity;
  getUserSavedCategories: Array<SavedCategoriesEntity>;
  getUserBudgets: Array<BudgetsEntity>;
};


export type QueryGetUserSettingsArgs = {
  userId: Scalars['Int'];
};


export type QueryGetTransactionsByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetTransactionsByMonthArgs = {
  year: Scalars['Int'];
  month: Scalars['String'];
};


export type QueryGetUserTransactionsForBudgetArgs = {
  selectedBudget: Scalars['String'];
  selectedTimeFrame: Scalars['Float'];
  book: Scalars['String'];
};


export type QueryGetUserTransactionsForTransactionsPageArgs = {
  year?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['String']>;
  orderBy: Scalars['String'];
  order: Scalars['Boolean'];
  filter: Scalars['String'];
  take: Scalars['Int'];
  skip: Scalars['Int'];
};


export type QueryGetUserSubCategoriesForCashFlowArgs = {
  filteredCategory: Scalars['String'];
  selectedYear: Scalars['Int'];
};


export type QueryGetCategorybyIdArgs = {
  categoryId: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SavedCategoriesEntity = {
   __typename?: 'SavedCategoriesEntity';
  id: Scalars['String'];
  name: Scalars['String'];
  memo?: Maybe<Scalars['String']>;
  book: Scalars['String'];
  amounts: Array<Scalars['Float']>;
  keyName: Scalars['String'];
  userId: Scalars['String'];
  categoryId: Scalars['String'];
  category: CategoryEntity;
  subCategoryId?: Maybe<Scalars['String']>;
  subCategory?: Maybe<SubCategoryEntity>;
  transactions: Array<TransactionEntity>;
};

export type SavedCategoriesInput = {
  name?: Maybe<Scalars['String']>;
  memo?: Maybe<Scalars['String']>;
  amounts?: Maybe<Array<Scalars['Float']>>;
  categoryId: Scalars['String'];
  subCategoryId: Scalars['String'];
};

export type SubCategoryEntity = {
   __typename?: 'SubCategoryEntity';
  id: Scalars['String'];
  name: Scalars['String'];
  categoryId: Scalars['String'];
  category: CategoryEntity;
  userId: Scalars['String'];
  user: UserEntity;
  transactions: Array<TransactionEntity>;
  savedCategories: Array<SavedCategoriesEntity>;
  categoryTotals: Array<CategoryTotalsEntity>;
};

export type SubmitTransactionsResponse = {
   __typename?: 'SubmitTransactionsResponse';
  inserted: Scalars['Boolean'];
  message: Scalars['String'];
};


export type TransactionClass = {
   __typename?: 'TransactionClass';
  id: Scalars['String'];
  userId: Scalars['String'];
  book: Scalars['String'];
  account: Scalars['String'];
  type: Scalars['String'];
  datePosted: Scalars['String'];
  name: Scalars['String'];
  savedCategoryId?: Maybe<Scalars['String']>;
  categoryId: Scalars['String'];
  subCategoryId: Scalars['String'];
  memo: Scalars['String'];
  amount: Scalars['Float'];
};

export type TransactionEntity = {
   __typename?: 'TransactionEntity';
  id: Scalars['String'];
  userId: Scalars['String'];
  user: UserEntity;
  book: Scalars['String'];
  account: Scalars['String'];
  type: Scalars['String'];
  datePosted: Scalars['String'];
  name: Scalars['String'];
  memo: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  savedCategoryId?: Maybe<Scalars['String']>;
  savedCategory?: Maybe<SavedCategoriesEntity>;
  keyName: Scalars['String'];
  amount: Scalars['Float'];
  subCategoryId: Scalars['String'];
  categoryId: Scalars['String'];
  category: CategoryEntity;
  subCategory: SubCategoryEntity;
};

export type TransactionInput = {
  id: Scalars['String'];
  userId: Scalars['String'];
  account: Scalars['String'];
  book: Scalars['String'];
  type: Scalars['String'];
  datePosted: Scalars['String'];
  name: Scalars['String'];
  categoryId: Scalars['String'];
  subCategoryId: Scalars['String'];
  savedCategoryId?: Maybe<Scalars['String']>;
  memo: Scalars['String'];
  amount: Scalars['Float'];
};

export type TransPageReturn = {
   __typename?: 'TransPageReturn';
  length: Scalars['Int'];
  transactions: Array<TransactionEntity>;
};

export type UpdateCategoriesInTransactionsInput = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  memo?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  amount: Scalars['Float'];
  savedCategoryId?: Maybe<Scalars['String']>;
  selectedCategoryId: Scalars['String'];
  selectedSubCategoryId: Scalars['String'];
  book: Scalars['String'];
  selectedBook: Scalars['String'];
  applyToAll: Scalars['Boolean'];
  noConflict: Scalars['Boolean'];
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
  id: Scalars['String'];
  email: Scalars['String'];
  userSettingsId: Scalars['String'];
  userSettings: UserSettingsEntity;
  transactions: Array<TransactionEntity>;
  categories: Array<CategoryEntity>;
  subCategories: Array<SubCategoryEntity>;
};

export type UserSettingsEntity = {
   __typename?: 'UserSettingsEntity';
  id: Scalars['String'];
  theme: Scalars['String'];
};

export type GetUserBudgetsQueryVariables = {};


export type GetUserBudgetsQuery = (
  { __typename?: 'Query' }
  & { getUserBudgets: Array<(
    { __typename?: 'BudgetsEntity' }
    & Pick<BudgetsEntity, 'id' | 'name' | 'values'>
  )> }
);

export type CreateBudgetMutationVariables = {
  name: Scalars['String'];
  values: Scalars['String'];
};


export type CreateBudgetMutation = (
  { __typename?: 'Mutation' }
  & { createBudget: (
    { __typename?: 'BudgetsEntity' }
    & Pick<BudgetsEntity, 'id' | 'name' | 'values'>
  ) }
);

export type DeleteBudgetMutationVariables = {
  budgetId: Scalars['String'];
};


export type DeleteBudgetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteBudget'>
);

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
  categoryId: Scalars['String'];
  name: Scalars['String'];
};


export type UpdateCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateCategory'>
);

export type AddSubCategoryMutationVariables = {
  name: Scalars['String'];
  categoryId: Scalars['String'];
};


export type AddSubCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addSubCategory'>
);

export type DeleteSubCategoryMutationVariables = {
  subCategoryId: Scalars['String'];
};


export type DeleteSubCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteSubCategory'>
);

export type DeleteCategoryMutationVariables = {
  categoryId: Scalars['String'];
};


export type DeleteCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCategory'>
);

export type GetCategoryQueryVariables = {
  categoryId: Scalars['String'];
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

export type GetUserCategoriesQueryVariables = {};


export type GetUserCategoriesQuery = (
  { __typename?: 'Query' }
  & { getUserCategories: Array<(
    { __typename?: 'CategoryEntity' }
    & Pick<CategoryEntity, 'name' | 'id'>
    & { subCategories?: Maybe<Array<(
      { __typename?: 'SubCategoryEntity' }
      & Pick<SubCategoryEntity, 'name' | 'id'>
    )>> }
  )> }
);

export type GetUserSubCategoriesForCashFlowQueryVariables = {
  selectedYear: Scalars['Int'];
  filteredCategory: Scalars['String'];
};


export type GetUserSubCategoriesForCashFlowQuery = (
  { __typename?: 'Query' }
  & { getUserSubCategoriesForCashFlow: Array<(
    { __typename?: 'IDisplayData' }
    & Pick<IDisplayData, 'subCategoryName' | 'categoryName' | 'categoryId' | 'subCategoryLength' | 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec' | 'low' | 'high' | 'avg' | 'med'>
    & { subCategories: Array<(
      { __typename?: 'IDisplaySubCategoryRow' }
      & Pick<IDisplaySubCategoryRow, 'subCategoryId' | 'subCategoryName' | 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec' | 'low' | 'high' | 'avg' | 'med'>
    )> }
  )> }
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

export type CreateSavedCategoryMutationVariables = {
  name?: Maybe<Scalars['String']>;
  memo?: Maybe<Scalars['String']>;
  amounts?: Maybe<Array<Scalars['Float']>>;
  categoryId: Scalars['String'];
  subCategoryId: Scalars['String'];
};


export type CreateSavedCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createSavedCategory: (
    { __typename?: 'SavedCategoriesEntity' }
    & Pick<SavedCategoriesEntity, 'id'>
  ) }
);

export type GetUserSavedCategoriesQueryVariables = {};


export type GetUserSavedCategoriesQuery = (
  { __typename?: 'Query' }
  & { getUserSavedCategories: Array<(
    { __typename?: 'SavedCategoriesEntity' }
    & Pick<SavedCategoriesEntity, 'id' | 'name' | 'memo' | 'amounts' | 'userId'>
    & { category: (
      { __typename?: 'CategoryEntity' }
      & Pick<CategoryEntity, 'name' | 'id'>
    ), subCategory?: Maybe<(
      { __typename?: 'SubCategoryEntity' }
      & Pick<SubCategoryEntity, 'name' | 'id'>
    )> }
  )> }
);

export type DeleteSavedCategoryMutationVariables = {
  savedCategoryId: Scalars['String'];
};


export type DeleteSavedCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteSavedCategory'>
);

export type UpdateThemeMutationVariables = {
  id: Scalars['String'];
  theme: Scalars['String'];
};


export type UpdateThemeMutation = (
  { __typename?: 'Mutation' }
  & { updateTheme?: Maybe<(
    { __typename?: 'UserSettingsEntity' }
    & Pick<UserSettingsEntity, 'theme'>
  )> }
);

export type GetUserTransactionsQueryVariables = {};


export type GetUserTransactionsQuery = (
  { __typename?: 'Query' }
  & { getUserTransactions: Array<(
    { __typename?: 'TransactionEntity' }
    & Pick<TransactionEntity, 'id' | 'name' | 'categoryId' | 'subCategoryId'>
  )> }
);

export type GetTransactionsByMonthQueryVariables = {
  month: Scalars['String'];
  year: Scalars['Int'];
};


export type GetTransactionsByMonthQuery = (
  { __typename?: 'Query' }
  & { getTransactionsByMonth: Array<(
    { __typename?: 'TransactionEntity' }
    & Pick<TransactionEntity, 'id' | 'datePosted' | 'name' | 'memo' | 'book' | 'note' | 'amount' | 'keyName'>
    & { savedCategory?: Maybe<(
      { __typename?: 'SavedCategoriesEntity' }
      & Pick<SavedCategoriesEntity, 'id' | 'name' | 'amounts'>
    )>, category: (
      { __typename?: 'CategoryEntity' }
      & Pick<CategoryEntity, 'id' | 'name'>
    ), subCategory: (
      { __typename?: 'SubCategoryEntity' }
      & Pick<SubCategoryEntity, 'id' | 'name'>
    ) }
  )> }
);

export type UpdateCategoriesInTransactionsMutationVariables = {
  id: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  memo?: Maybe<Scalars['String']>;
  book: Scalars['String'];
  selectedBook: Scalars['String'];
  amount: Scalars['Float'];
  selectedCategoryId: Scalars['String'];
  selectedSubCategoryId: Scalars['String'];
  savedCategoryId?: Maybe<Scalars['String']>;
  applyToAll: Scalars['Boolean'];
  noConflict: Scalars['Boolean'];
};


export type UpdateCategoriesInTransactionsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateCategoriesInTransactions'>
);

export type GetTotalsForSummaryQueryVariables = {};


export type GetTotalsForSummaryQuery = (
  { __typename?: 'Query' }
  & { getTotalsForSummary: Array<(
    { __typename?: 'IDisplayDataSummary' }
    & Pick<IDisplayDataSummary, 'categoryName' | 'subCategoryName' | 'subCategoryLength'>
    & { years: Array<(
      { __typename?: 'DisplayYear' }
      & Pick<DisplayYear, 'year' | 'amount'>
    )>, subCategories: Array<(
      { __typename?: 'IDisplaySubCategoryRowSummary' }
      & Pick<IDisplaySubCategoryRowSummary, 'subCategoryId' | 'subCategoryName'>
      & { years: Array<(
        { __typename?: 'DisplayYear' }
        & Pick<DisplayYear, 'year' | 'amount'>
      )> }
    )> }
  )> }
);

export type GetUserTransactionsForBudgetQueryVariables = {
  book: Scalars['String'];
  selectedTimeFrame: Scalars['Float'];
  selectedBudget: Scalars['String'];
};


export type GetUserTransactionsForBudgetQuery = (
  { __typename?: 'Query' }
  & { getUserTransactionsForBudget: Array<(
    { __typename?: 'ArrayedBudgetCategoryRow' }
    & Pick<ArrayedBudgetCategoryRow, 'categoryId' | 'categoryName' | 'subCategoryLength'>
    & { subCategories: Array<(
      { __typename?: 'DisplaySubCategoryRow' }
      & Pick<DisplaySubCategoryRow, 'currentMonth' | 'lastMonth' | 'lastYearCurrentMonth' | 'lastYearLastMonth' | 'subCategoryId' | 'subCategoryName' | 'avg' | 'inputValue'>
    )> }
  )> }
);

export type GetUserTransactionsForTransactionsPageQueryVariables = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
  filter: Scalars['String'];
  orderBy: Scalars['String'];
  order: Scalars['Boolean'];
  month?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
};


export type GetUserTransactionsForTransactionsPageQuery = (
  { __typename?: 'Query' }
  & { getUserTransactionsForTransactionsPage: (
    { __typename?: 'TransPageReturn' }
    & Pick<TransPageReturn, 'length'>
    & { transactions: Array<(
      { __typename?: 'TransactionEntity' }
      & Pick<TransactionEntity, 'id' | 'datePosted' | 'name' | 'memo' | 'book' | 'amount' | 'note'>
      & { category: (
        { __typename?: 'CategoryEntity' }
        & Pick<CategoryEntity, 'id' | 'name'>
      ), subCategory: (
        { __typename?: 'SubCategoryEntity' }
        & Pick<SubCategoryEntity, 'id' | 'name'>
      ), savedCategory?: Maybe<(
        { __typename?: 'SavedCategoriesEntity' }
        & Pick<SavedCategoriesEntity, 'id' | 'name' | 'amounts'>
      )> }
    )> }
  ) }
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
      & Pick<TransactionEntity, 'id' | 'name' | 'datePosted' | 'amount' | 'memo' | 'type' | 'account' | 'categoryId' | 'subCategoryId'>
    )>, categories: Array<(
      { __typename?: 'CategoryEntity' }
      & Pick<CategoryEntity, 'id' | 'name'>
      & { subCategories?: Maybe<Array<(
        { __typename?: 'SubCategoryEntity' }
        & Pick<SubCategoryEntity, 'id' | 'name'>
      )>> }
    )>, subCategories: Array<(
      { __typename?: 'SubCategoryEntity' }
      & Pick<SubCategoryEntity, 'id' | 'name'>
    )> }
  ) }
);


export const GetUserBudgetsDocument = gql`
    query GetUserBudgets {
  getUserBudgets {
    id
    name
    values
  }
}
    `;

/**
 * __useGetUserBudgetsQuery__
 *
 * To run a query within a React component, call `useGetUserBudgetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserBudgetsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserBudgetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserBudgetsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserBudgetsQuery, GetUserBudgetsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserBudgetsQuery, GetUserBudgetsQueryVariables>(GetUserBudgetsDocument, baseOptions);
      }
export function useGetUserBudgetsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserBudgetsQuery, GetUserBudgetsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserBudgetsQuery, GetUserBudgetsQueryVariables>(GetUserBudgetsDocument, baseOptions);
        }
export type GetUserBudgetsQueryHookResult = ReturnType<typeof useGetUserBudgetsQuery>;
export type GetUserBudgetsLazyQueryHookResult = ReturnType<typeof useGetUserBudgetsLazyQuery>;
export type GetUserBudgetsQueryResult = ApolloReactCommon.QueryResult<GetUserBudgetsQuery, GetUserBudgetsQueryVariables>;
export const CreateBudgetDocument = gql`
    mutation CreateBudget($name: String!, $values: String!) {
  createBudget(name: $name, values: $values) {
    id
    name
    values
  }
}
    `;
export type CreateBudgetMutationFn = ApolloReactCommon.MutationFunction<CreateBudgetMutation, CreateBudgetMutationVariables>;

/**
 * __useCreateBudgetMutation__
 *
 * To run a mutation, you first call `useCreateBudgetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBudgetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBudgetMutation, { data, loading, error }] = useCreateBudgetMutation({
 *   variables: {
 *      name: // value for 'name'
 *      values: // value for 'values'
 *   },
 * });
 */
export function useCreateBudgetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateBudgetMutation, CreateBudgetMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateBudgetMutation, CreateBudgetMutationVariables>(CreateBudgetDocument, baseOptions);
      }
export type CreateBudgetMutationHookResult = ReturnType<typeof useCreateBudgetMutation>;
export type CreateBudgetMutationResult = ApolloReactCommon.MutationResult<CreateBudgetMutation>;
export type CreateBudgetMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateBudgetMutation, CreateBudgetMutationVariables>;
export const DeleteBudgetDocument = gql`
    mutation DeleteBudget($budgetId: String!) {
  deleteBudget(budgetId: $budgetId)
}
    `;
export type DeleteBudgetMutationFn = ApolloReactCommon.MutationFunction<DeleteBudgetMutation, DeleteBudgetMutationVariables>;

/**
 * __useDeleteBudgetMutation__
 *
 * To run a mutation, you first call `useDeleteBudgetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBudgetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBudgetMutation, { data, loading, error }] = useDeleteBudgetMutation({
 *   variables: {
 *      budgetId: // value for 'budgetId'
 *   },
 * });
 */
export function useDeleteBudgetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteBudgetMutation, DeleteBudgetMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteBudgetMutation, DeleteBudgetMutationVariables>(DeleteBudgetDocument, baseOptions);
      }
export type DeleteBudgetMutationHookResult = ReturnType<typeof useDeleteBudgetMutation>;
export type DeleteBudgetMutationResult = ApolloReactCommon.MutationResult<DeleteBudgetMutation>;
export type DeleteBudgetMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteBudgetMutation, DeleteBudgetMutationVariables>;
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
    mutation UpdateCategory($categoryId: String!, $name: String!) {
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
    mutation AddSubCategory($name: String!, $categoryId: String!) {
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
    mutation DeleteSubCategory($subCategoryId: String!) {
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
    mutation DeleteCategory($categoryId: String!) {
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
    query GetCategory($categoryId: String!) {
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
export const GetUserCategoriesDocument = gql`
    query GetUserCategories {
  getUserCategories {
    name
    id
    subCategories {
      name
      id
    }
  }
}
    `;

/**
 * __useGetUserCategoriesQuery__
 *
 * To run a query within a React component, call `useGetUserCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserCategoriesQuery, GetUserCategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserCategoriesQuery, GetUserCategoriesQueryVariables>(GetUserCategoriesDocument, baseOptions);
      }
export function useGetUserCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserCategoriesQuery, GetUserCategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserCategoriesQuery, GetUserCategoriesQueryVariables>(GetUserCategoriesDocument, baseOptions);
        }
export type GetUserCategoriesQueryHookResult = ReturnType<typeof useGetUserCategoriesQuery>;
export type GetUserCategoriesLazyQueryHookResult = ReturnType<typeof useGetUserCategoriesLazyQuery>;
export type GetUserCategoriesQueryResult = ApolloReactCommon.QueryResult<GetUserCategoriesQuery, GetUserCategoriesQueryVariables>;
export const GetUserSubCategoriesForCashFlowDocument = gql`
    query GetUserSubCategoriesForCashFlow($selectedYear: Int!, $filteredCategory: String!) {
  getUserSubCategoriesForCashFlow(selectedYear: $selectedYear, filteredCategory: $filteredCategory) {
    subCategoryName
    categoryName
    categoryId
    subCategoryLength
    Jan
    Feb
    Mar
    Apr
    May
    Jun
    Jul
    Aug
    Sep
    Oct
    Nov
    Dec
    low
    high
    avg
    med
    subCategories {
      subCategoryId
      subCategoryName
      Jan
      Feb
      Mar
      Apr
      May
      Jun
      Jul
      Aug
      Sep
      Oct
      Nov
      Dec
      low
      high
      avg
      med
    }
  }
}
    `;

/**
 * __useGetUserSubCategoriesForCashFlowQuery__
 *
 * To run a query within a React component, call `useGetUserSubCategoriesForCashFlowQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserSubCategoriesForCashFlowQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserSubCategoriesForCashFlowQuery({
 *   variables: {
 *      selectedYear: // value for 'selectedYear'
 *      filteredCategory: // value for 'filteredCategory'
 *   },
 * });
 */
export function useGetUserSubCategoriesForCashFlowQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserSubCategoriesForCashFlowQuery, GetUserSubCategoriesForCashFlowQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserSubCategoriesForCashFlowQuery, GetUserSubCategoriesForCashFlowQueryVariables>(GetUserSubCategoriesForCashFlowDocument, baseOptions);
      }
export function useGetUserSubCategoriesForCashFlowLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserSubCategoriesForCashFlowQuery, GetUserSubCategoriesForCashFlowQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserSubCategoriesForCashFlowQuery, GetUserSubCategoriesForCashFlowQueryVariables>(GetUserSubCategoriesForCashFlowDocument, baseOptions);
        }
export type GetUserSubCategoriesForCashFlowQueryHookResult = ReturnType<typeof useGetUserSubCategoriesForCashFlowQuery>;
export type GetUserSubCategoriesForCashFlowLazyQueryHookResult = ReturnType<typeof useGetUserSubCategoriesForCashFlowLazyQuery>;
export type GetUserSubCategoriesForCashFlowQueryResult = ApolloReactCommon.QueryResult<GetUserSubCategoriesForCashFlowQuery, GetUserSubCategoriesForCashFlowQueryVariables>;
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
export const CreateSavedCategoryDocument = gql`
    mutation CreateSavedCategory($name: String, $memo: String, $amounts: [Float!], $categoryId: String!, $subCategoryId: String!) {
  createSavedCategory(data: {name: $name, memo: $memo, categoryId: $categoryId, subCategoryId: $subCategoryId, amounts: $amounts}) {
    id
  }
}
    `;
export type CreateSavedCategoryMutationFn = ApolloReactCommon.MutationFunction<CreateSavedCategoryMutation, CreateSavedCategoryMutationVariables>;

/**
 * __useCreateSavedCategoryMutation__
 *
 * To run a mutation, you first call `useCreateSavedCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSavedCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSavedCategoryMutation, { data, loading, error }] = useCreateSavedCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *      memo: // value for 'memo'
 *      amounts: // value for 'amounts'
 *      categoryId: // value for 'categoryId'
 *      subCategoryId: // value for 'subCategoryId'
 *   },
 * });
 */
export function useCreateSavedCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateSavedCategoryMutation, CreateSavedCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateSavedCategoryMutation, CreateSavedCategoryMutationVariables>(CreateSavedCategoryDocument, baseOptions);
      }
export type CreateSavedCategoryMutationHookResult = ReturnType<typeof useCreateSavedCategoryMutation>;
export type CreateSavedCategoryMutationResult = ApolloReactCommon.MutationResult<CreateSavedCategoryMutation>;
export type CreateSavedCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateSavedCategoryMutation, CreateSavedCategoryMutationVariables>;
export const GetUserSavedCategoriesDocument = gql`
    query GetUserSavedCategories {
  getUserSavedCategories {
    id
    name
    memo
    amounts
    userId
    category {
      name
      id
    }
    subCategory {
      name
      id
    }
  }
}
    `;

/**
 * __useGetUserSavedCategoriesQuery__
 *
 * To run a query within a React component, call `useGetUserSavedCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserSavedCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserSavedCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserSavedCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserSavedCategoriesQuery, GetUserSavedCategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserSavedCategoriesQuery, GetUserSavedCategoriesQueryVariables>(GetUserSavedCategoriesDocument, baseOptions);
      }
export function useGetUserSavedCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserSavedCategoriesQuery, GetUserSavedCategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserSavedCategoriesQuery, GetUserSavedCategoriesQueryVariables>(GetUserSavedCategoriesDocument, baseOptions);
        }
export type GetUserSavedCategoriesQueryHookResult = ReturnType<typeof useGetUserSavedCategoriesQuery>;
export type GetUserSavedCategoriesLazyQueryHookResult = ReturnType<typeof useGetUserSavedCategoriesLazyQuery>;
export type GetUserSavedCategoriesQueryResult = ApolloReactCommon.QueryResult<GetUserSavedCategoriesQuery, GetUserSavedCategoriesQueryVariables>;
export const DeleteSavedCategoryDocument = gql`
    mutation DeleteSavedCategory($savedCategoryId: String!) {
  deleteSavedCategory(savedCategoryId: $savedCategoryId)
}
    `;
export type DeleteSavedCategoryMutationFn = ApolloReactCommon.MutationFunction<DeleteSavedCategoryMutation, DeleteSavedCategoryMutationVariables>;

/**
 * __useDeleteSavedCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteSavedCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSavedCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSavedCategoryMutation, { data, loading, error }] = useDeleteSavedCategoryMutation({
 *   variables: {
 *      savedCategoryId: // value for 'savedCategoryId'
 *   },
 * });
 */
export function useDeleteSavedCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteSavedCategoryMutation, DeleteSavedCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteSavedCategoryMutation, DeleteSavedCategoryMutationVariables>(DeleteSavedCategoryDocument, baseOptions);
      }
export type DeleteSavedCategoryMutationHookResult = ReturnType<typeof useDeleteSavedCategoryMutation>;
export type DeleteSavedCategoryMutationResult = ApolloReactCommon.MutationResult<DeleteSavedCategoryMutation>;
export type DeleteSavedCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteSavedCategoryMutation, DeleteSavedCategoryMutationVariables>;
export const UpdateThemeDocument = gql`
    mutation UpdateTheme($id: String!, $theme: String!) {
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
export const GetUserTransactionsDocument = gql`
    query GetUserTransactions {
  getUserTransactions {
    id
    name
    categoryId
    subCategoryId
  }
}
    `;

/**
 * __useGetUserTransactionsQuery__
 *
 * To run a query within a React component, call `useGetUserTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTransactionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserTransactionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>(GetUserTransactionsDocument, baseOptions);
      }
export function useGetUserTransactionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>(GetUserTransactionsDocument, baseOptions);
        }
export type GetUserTransactionsQueryHookResult = ReturnType<typeof useGetUserTransactionsQuery>;
export type GetUserTransactionsLazyQueryHookResult = ReturnType<typeof useGetUserTransactionsLazyQuery>;
export type GetUserTransactionsQueryResult = ApolloReactCommon.QueryResult<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>;
export const GetTransactionsByMonthDocument = gql`
    query GetTransactionsByMonth($month: String!, $year: Int!) {
  getTransactionsByMonth(month: $month, year: $year) {
    id
    datePosted
    name
    memo
    book
    note
    amount
    keyName
    savedCategory {
      id
      name
      amounts
    }
    category {
      id
      name
    }
    subCategory {
      id
      name
    }
  }
}
    `;

/**
 * __useGetTransactionsByMonthQuery__
 *
 * To run a query within a React component, call `useGetTransactionsByMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsByMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsByMonthQuery({
 *   variables: {
 *      month: // value for 'month'
 *      year: // value for 'year'
 *   },
 * });
 */
export function useGetTransactionsByMonthQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTransactionsByMonthQuery, GetTransactionsByMonthQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTransactionsByMonthQuery, GetTransactionsByMonthQueryVariables>(GetTransactionsByMonthDocument, baseOptions);
      }
export function useGetTransactionsByMonthLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTransactionsByMonthQuery, GetTransactionsByMonthQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTransactionsByMonthQuery, GetTransactionsByMonthQueryVariables>(GetTransactionsByMonthDocument, baseOptions);
        }
export type GetTransactionsByMonthQueryHookResult = ReturnType<typeof useGetTransactionsByMonthQuery>;
export type GetTransactionsByMonthLazyQueryHookResult = ReturnType<typeof useGetTransactionsByMonthLazyQuery>;
export type GetTransactionsByMonthQueryResult = ApolloReactCommon.QueryResult<GetTransactionsByMonthQuery, GetTransactionsByMonthQueryVariables>;
export const UpdateCategoriesInTransactionsDocument = gql`
    mutation UpdateCategoriesInTransactions($id: String!, $note: String, $name: String, $memo: String, $book: String!, $selectedBook: String!, $amount: Float!, $selectedCategoryId: String!, $selectedSubCategoryId: String!, $savedCategoryId: String, $applyToAll: Boolean!, $noConflict: Boolean!) {
  updateCategoriesInTransactions(data: {id: $id, name: $name, memo: $memo, note: $note, book: $book, selectedBook: $selectedBook, amount: $amount, selectedCategoryId: $selectedCategoryId, selectedSubCategoryId: $selectedSubCategoryId, savedCategoryId: $savedCategoryId, applyToAll: $applyToAll, noConflict: $noConflict})
}
    `;
export type UpdateCategoriesInTransactionsMutationFn = ApolloReactCommon.MutationFunction<UpdateCategoriesInTransactionsMutation, UpdateCategoriesInTransactionsMutationVariables>;

/**
 * __useUpdateCategoriesInTransactionsMutation__
 *
 * To run a mutation, you first call `useUpdateCategoriesInTransactionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoriesInTransactionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoriesInTransactionsMutation, { data, loading, error }] = useUpdateCategoriesInTransactionsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      note: // value for 'note'
 *      name: // value for 'name'
 *      memo: // value for 'memo'
 *      book: // value for 'book'
 *      selectedBook: // value for 'selectedBook'
 *      amount: // value for 'amount'
 *      selectedCategoryId: // value for 'selectedCategoryId'
 *      selectedSubCategoryId: // value for 'selectedSubCategoryId'
 *      savedCategoryId: // value for 'savedCategoryId'
 *      applyToAll: // value for 'applyToAll'
 *      noConflict: // value for 'noConflict'
 *   },
 * });
 */
export function useUpdateCategoriesInTransactionsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCategoriesInTransactionsMutation, UpdateCategoriesInTransactionsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCategoriesInTransactionsMutation, UpdateCategoriesInTransactionsMutationVariables>(UpdateCategoriesInTransactionsDocument, baseOptions);
      }
export type UpdateCategoriesInTransactionsMutationHookResult = ReturnType<typeof useUpdateCategoriesInTransactionsMutation>;
export type UpdateCategoriesInTransactionsMutationResult = ApolloReactCommon.MutationResult<UpdateCategoriesInTransactionsMutation>;
export type UpdateCategoriesInTransactionsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCategoriesInTransactionsMutation, UpdateCategoriesInTransactionsMutationVariables>;
export const GetTotalsForSummaryDocument = gql`
    query GetTotalsForSummary {
  getTotalsForSummary {
    categoryName
    subCategoryName
    subCategoryLength
    years {
      year
      amount
    }
    subCategories {
      subCategoryId
      subCategoryName
      years {
        year
        amount
      }
    }
  }
}
    `;

/**
 * __useGetTotalsForSummaryQuery__
 *
 * To run a query within a React component, call `useGetTotalsForSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalsForSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalsForSummaryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTotalsForSummaryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTotalsForSummaryQuery, GetTotalsForSummaryQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTotalsForSummaryQuery, GetTotalsForSummaryQueryVariables>(GetTotalsForSummaryDocument, baseOptions);
      }
export function useGetTotalsForSummaryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTotalsForSummaryQuery, GetTotalsForSummaryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTotalsForSummaryQuery, GetTotalsForSummaryQueryVariables>(GetTotalsForSummaryDocument, baseOptions);
        }
export type GetTotalsForSummaryQueryHookResult = ReturnType<typeof useGetTotalsForSummaryQuery>;
export type GetTotalsForSummaryLazyQueryHookResult = ReturnType<typeof useGetTotalsForSummaryLazyQuery>;
export type GetTotalsForSummaryQueryResult = ApolloReactCommon.QueryResult<GetTotalsForSummaryQuery, GetTotalsForSummaryQueryVariables>;
export const GetUserTransactionsForBudgetDocument = gql`
    query GetUserTransactionsForBudget($book: String!, $selectedTimeFrame: Float!, $selectedBudget: String!) {
  getUserTransactionsForBudget(book: $book, selectedTimeFrame: $selectedTimeFrame, selectedBudget: $selectedBudget) {
    categoryId
    categoryName
    subCategoryLength
    subCategories {
      currentMonth
      lastMonth
      lastYearCurrentMonth
      lastYearLastMonth
      subCategoryId
      subCategoryName
      avg
      inputValue
    }
  }
}
    `;

/**
 * __useGetUserTransactionsForBudgetQuery__
 *
 * To run a query within a React component, call `useGetUserTransactionsForBudgetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTransactionsForBudgetQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTransactionsForBudgetQuery({
 *   variables: {
 *      book: // value for 'book'
 *      selectedTimeFrame: // value for 'selectedTimeFrame'
 *      selectedBudget: // value for 'selectedBudget'
 *   },
 * });
 */
export function useGetUserTransactionsForBudgetQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserTransactionsForBudgetQuery, GetUserTransactionsForBudgetQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserTransactionsForBudgetQuery, GetUserTransactionsForBudgetQueryVariables>(GetUserTransactionsForBudgetDocument, baseOptions);
      }
export function useGetUserTransactionsForBudgetLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserTransactionsForBudgetQuery, GetUserTransactionsForBudgetQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserTransactionsForBudgetQuery, GetUserTransactionsForBudgetQueryVariables>(GetUserTransactionsForBudgetDocument, baseOptions);
        }
export type GetUserTransactionsForBudgetQueryHookResult = ReturnType<typeof useGetUserTransactionsForBudgetQuery>;
export type GetUserTransactionsForBudgetLazyQueryHookResult = ReturnType<typeof useGetUserTransactionsForBudgetLazyQuery>;
export type GetUserTransactionsForBudgetQueryResult = ApolloReactCommon.QueryResult<GetUserTransactionsForBudgetQuery, GetUserTransactionsForBudgetQueryVariables>;
export const GetUserTransactionsForTransactionsPageDocument = gql`
    query GetUserTransactionsForTransactionsPage($skip: Int!, $take: Int!, $filter: String!, $orderBy: String!, $order: Boolean!, $month: String, $year: Int) {
  getUserTransactionsForTransactionsPage(skip: $skip, take: $take, filter: $filter, orderBy: $orderBy, order: $order, month: $month, year: $year) {
    length
    transactions {
      id
      datePosted
      name
      memo
      book
      amount
      note
      category {
        id
        name
      }
      subCategory {
        id
        name
      }
      savedCategory {
        id
        name
        amounts
      }
    }
  }
}
    `;

/**
 * __useGetUserTransactionsForTransactionsPageQuery__
 *
 * To run a query within a React component, call `useGetUserTransactionsForTransactionsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTransactionsForTransactionsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTransactionsForTransactionsPageQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      filter: // value for 'filter'
 *      orderBy: // value for 'orderBy'
 *      order: // value for 'order'
 *      month: // value for 'month'
 *      year: // value for 'year'
 *   },
 * });
 */
export function useGetUserTransactionsForTransactionsPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserTransactionsForTransactionsPageQuery, GetUserTransactionsForTransactionsPageQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserTransactionsForTransactionsPageQuery, GetUserTransactionsForTransactionsPageQueryVariables>(GetUserTransactionsForTransactionsPageDocument, baseOptions);
      }
export function useGetUserTransactionsForTransactionsPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserTransactionsForTransactionsPageQuery, GetUserTransactionsForTransactionsPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserTransactionsForTransactionsPageQuery, GetUserTransactionsForTransactionsPageQueryVariables>(GetUserTransactionsForTransactionsPageDocument, baseOptions);
        }
export type GetUserTransactionsForTransactionsPageQueryHookResult = ReturnType<typeof useGetUserTransactionsForTransactionsPageQuery>;
export type GetUserTransactionsForTransactionsPageLazyQueryHookResult = ReturnType<typeof useGetUserTransactionsForTransactionsPageLazyQuery>;
export type GetUserTransactionsForTransactionsPageQueryResult = ApolloReactCommon.QueryResult<GetUserTransactionsForTransactionsPageQuery, GetUserTransactionsForTransactionsPageQueryVariables>;
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
      name
      datePosted
      amount
      memo
      type
      account
      categoryId
      subCategoryId
    }
    categories {
      id
      name
      subCategories {
        id
        name
      }
    }
    subCategories {
      id
      name
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