import React from "react";
import { CashFlowAnalysisTable } from "./CashFlowAnalysisTable";
import { useGetUserSubCategoriesQuery } from "../../generated/graphql";

interface ICashFlowAnalysisDataProps {}

export const CashFlowAnalysisData: React.FC<ICashFlowAnalysisDataProps> = (
  props
) => {
  const { data, loading, error } = useGetUserSubCategoriesQuery();
  console.log(data);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>error loading data</div>}
      {!data || (!data.getUserSubCategories && <div>No data!</div>)}
      {data && data.getUserSubCategories && (
        <CashFlowAnalysisTable displayData={data.getUserSubCategories} />
      )}
    </div>
  );
};
