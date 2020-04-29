import React from "react";
import { SelectedCategoryTable } from "./SelectedCategoryTable";
import { GetTransactionsByMonthQuery } from "../../generated/graphql";
import { parseSelectedCategoryData } from "./utils/parseSelectedCategoryData";

interface ISelectedCategoryTableRootProps {
  selectedCategory: string | null;
  selectedSubCategory: string | null;
  data: GetTransactionsByMonthQuery;
}

export const SelectedCategoryTableRoot: React.FC<ISelectedCategoryTableRootProps> = (
  props
) => {
  const displayData = parseSelectedCategoryData(
    props.data.getTransactionsByMonth,
    props.selectedCategory,
    props.selectedSubCategory
  );

  console.log("SCTR 21 displaydata", displayData);

  return <SelectedCategoryTable displayData={displayData} />;
};
