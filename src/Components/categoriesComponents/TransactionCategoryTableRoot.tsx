import React from "react";
import { TransactionCategoryTable } from "./TransactionCategoryTable";
import {
  useGetUserCategoriesQuery,
  useGetTransactionsByMonthQuery,
} from "../../generated/graphql";

interface ITransactionCategoryTableRootProps {
  selectedMonth: string;
  selectedYear: number;
}

export const TransactionCategoryTableRoot: React.FC<ITransactionCategoryTableRootProps> = (
  props
) => {
  // const {
  //   data,
  //   loading,
  //   error,
  //   refetch,
  // } = useGetTransactionsToCategorizeQuery({ fetchPolicy: "network-only" });
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useGetUserCategoriesQuery({ fetchPolicy: "network-only" });
  const { data, loading, error, refetch } = useGetTransactionsByMonthQuery({
    fetchPolicy: "no-cache",
    variables: {
      month: props.selectedMonth,
      year: props.selectedYear,
    },
  });

  if (loading || categoriesLoading) {
    return <div>Loading Transaction Categories...</div>;
  } else if (error || categoriesError) {
    console.log(error);
    return <div>There was an error Loading Transaction Categories</div>;
  } else if (!data || !categoriesData) {
    return <div>No data!</div>;
  } else {
    //console.log("TCTR 43, ", data.getTransactionsByMonth);
    //console.log("TCTR 44, ", categoriesData.getUserCategories);
    return (
      <TransactionCategoryTable
        data={data.getTransactionsByMonth}
        categoriesData={categoriesData.getUserCategories}
        refetch={refetch}
      />
    );
  }
};
