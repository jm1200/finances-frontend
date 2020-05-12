import React from "react";
import { SummaryData } from "../Components/summaryComponents/SummaryData";

interface ISummaryProps {}

export const Summary: React.FC<ISummaryProps> = (props) => {
  return (
    <div>
      <SummaryData />
    </div>
  );
};
