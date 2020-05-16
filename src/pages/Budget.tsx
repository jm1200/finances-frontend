import React from "react";
import { BudgetData } from "../Components/budget/BudgetData";

interface IBudgetProps {}

export const Budget: React.FC<IBudgetProps> = (props) => {
  return (
    <div>
      <BudgetData />
    </div>
  );
};
