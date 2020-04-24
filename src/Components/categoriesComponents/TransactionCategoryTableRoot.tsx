import React from "react";
import { TransactionCategoryTable } from "./TransactionCategoryTable";
import {
  useGetTransactionsToCategorizeQuery,
  useGetUserCategoriesQuery,
} from "../../generated/graphql";

interface ITransactionCategoryTableRootProps {}

export const TransactionCategoryTableRoot: React.FC<ITransactionCategoryTableRootProps> = (
  props
) => {
  const {
    data,
    loading,
    error,
    refetch,
  } = useGetTransactionsToCategorizeQuery({ fetchPolicy: "network-only" });
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useGetUserCategoriesQuery({ fetchPolicy: "network-only" });

  if (loading || categoriesLoading) {
    return <div>Loading Transaction Categories...</div>;
  } else if (error || categoriesError) {
    console.log(error);
    return <div>There was an error Loading Transaction Categories</div>;
  } else if (!data || !categoriesData) {
    return <div>No data!</div>;
  } else {
    return (
      <TransactionCategoryTable
        data={data.getTransactionsToCategorize}
        categoriesData={categoriesData.getUserCategories}
        refetch={refetch}
      />
    );
  }
};
