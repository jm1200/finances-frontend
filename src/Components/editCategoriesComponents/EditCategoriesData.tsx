import React from "react";
import { EditCategoriesTable } from "./EditCategoriesTable";

interface IEditCategoriesDataProps {}

export const EditCategoriesData: React.FC<IEditCategoriesDataProps> = (
  props
) => {
  return (
    <div>
      <EditCategoriesTable />
    </div>
  );
};
