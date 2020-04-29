import React from "react";
import { CategoryTotalsTable } from "./CategoryTotalsTable";
import { GetTransactionsByMonthQuery } from "../../generated/graphql";
import { parseDisplayData } from "./utils/parseDisplayData";

interface ICategoryTotalsTableRootProps {
  selectedMonth: string;
  selectedYear: number;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedSubCategory: React.Dispatch<React.SetStateAction<string | null>>;
  data: GetTransactionsByMonthQuery;
}

export const CategoryTotalsTableRoot: React.FC<ICategoryTotalsTableRootProps> = (
  props
) => {
  const displayData = parseDisplayData(props.data.getTransactionsByMonth);
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
};
