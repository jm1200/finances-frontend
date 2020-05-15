import React from "react";
import { CashFlowAnalysisTable } from "./CashFlowAnalysisTable";
import { CashFlowHeader } from "./CashFlowHeader";
import { useGetUserSubCategoriesForCashFlowQuery } from "../../generated/graphql";

interface ICashFlowAnalysisDataProps {}

export const CashFlowAnalysisData: React.FC<ICashFlowAnalysisDataProps> = (
  props
) => {
  const [selectedYear, setSelectedYear] = React.useState(2019);
  const {
    data: homeData,
    loading: homeLoading,
    error: homeError,
  } = useGetUserSubCategoriesForCashFlowQuery({
    variables: { selectedYear, filteredCategory: "Home" },
  });

  const {
    data: rentalData,
    loading: rentalLoading,
    error: rentalError,
  } = useGetUserSubCategoriesForCashFlowQuery({
    variables: { selectedYear, filteredCategory: "377 Hyde Park Rd." },
  });

  return (
    <div>
      <CashFlowHeader
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      {homeLoading && <div>Loading Home Data...</div>}
      {homeError && <div>error loading Home data</div>}
      {!homeData ||
        (!homeData.getUserSubCategoriesForCashFlow && <div>No Home data!</div>)}
      {homeData?.getUserSubCategoriesForCashFlow && (
        <div>
          <CashFlowAnalysisTable
            displayData={homeData.getUserSubCategoriesForCashFlow}
          />
        </div>
      )}

      {rentalLoading && <div>Loading rental Data...</div>}
      {rentalError && <div>error loading rental data</div>}
      {!rentalData ||
        (!rentalData.getUserSubCategoriesForCashFlow && (
          <div>No rental data!</div>
        ))}
      {rentalData?.getUserSubCategoriesForCashFlow && (
        <div>
          <br />
          <CashFlowAnalysisTable
            displayData={rentalData.getUserSubCategoriesForCashFlow}
          />
        </div>
      )}
    </div>
  );
};
