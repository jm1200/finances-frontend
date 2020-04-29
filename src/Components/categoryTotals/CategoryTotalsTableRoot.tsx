import React from "react";
import { CategoryTotalsTable } from "./CategoryTotalsTable";
import { useGetTransactionsByMonthQuery } from "../../generated/graphql";
import { parseDisplayData } from "./utils/parseDisplayData";

interface ICategoryTotalsTableRootProps {
  selectedMonth: string;
  selectedYear: number;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedSubCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CategoryTotalsTableRoot: React.FC<ICategoryTotalsTableRootProps> = (
  props
) => {
  const { data, loading, error } = useGetTransactionsByMonthQuery({
    fetchPolicy: "no-cache",
    variables: {
      month: props.selectedMonth,
      year: props.selectedYear,
    },
  });

  if (loading) {
    return <div>Loading monthly totals...</div>;
  } else if (error) {
    console.log(error);
    return <div>There was an error Loading Categories</div>;
  } else if (!data) {
    return <div>No data!</div>;
  } else if (data.getTransactionsByMonth.length === 0) {
    return <div>No data!</div>;
  } else {
    const displayData = parseDisplayData(data.getTransactionsByMonth);
    const grandTotal = displayData.reduce(
      (acc, cur) => (acc += cur.categoryTotal),
      0
    );

    return (
      <CategoryTotalsTable
        setSelectedCategory={props.setSelectedCategory}
        setSelectedSubCategory={props.setSelectedSubCategory}
        displayData={displayData}
        grandTotal={grandTotal}
      />
    );
  }
};
