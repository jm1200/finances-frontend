import React from "react";
import { EditCategoriesData } from "../Components/editCategoriesComponents/EditCategoriesData";

interface IEditCategoriesProps {}

export const EditCategories: React.FC<IEditCategoriesProps> = (props) => {
  return (
    <div>
      <EditCategoriesData />
    </div>
  );
};
