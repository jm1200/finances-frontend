import React from "react";
import { CashFlowAnalysisData } from "../Components/cashFlowComponents/CashFlowAnalysisData";

interface ICashFlowAnalysisProps {}

export const CashFlowAnalysis: React.FC<ICashFlowAnalysisProps> = (props) => {
  return (
    <div>
      <CashFlowAnalysisData />
    </div>
  );
};
