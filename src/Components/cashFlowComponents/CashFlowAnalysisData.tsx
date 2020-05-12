import React from "react";
import { CashFlowAnalysisTable } from "./CashFlowAnalysisTable";
import { CashFlowHeader } from "./CashFlowHeader";
import { useGetUserSubCategoriesQuery } from "../../generated/graphql";

interface ICashFlowAnalysisDataProps {}

export const CashFlowAnalysisData: React.FC<ICashFlowAnalysisDataProps> = (
  props
) => {
  const [selectedYear, setSelectedYear] = React.useState(2019);
  const {
    data: homeData,
    loading: homeLoading,
    error: homeError,
  } = useGetUserSubCategoriesQuery({
    variables: { selectedYear, filteredCategory: "Home" },
  });

  const {
    data: rentalData,
    loading: rentalLoading,
    error: rentalError,
  } = useGetUserSubCategoriesQuery({
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
        (!homeData.getUserSubCategories && <div>No Home data!</div>)}
      {homeData?.getUserSubCategories && (
        <div>
          <CashFlowAnalysisTable displayData={homeData.getUserSubCategories} />
        </div>
      )}

      {rentalLoading && <div>Loading rental Data...</div>}
      {rentalError && <div>error loading rental data</div>}
      {!rentalData ||
        (!rentalData.getUserSubCategories && <div>No rental data!</div>)}
      {rentalData?.getUserSubCategories && (
        <div>
          <br />
          <CashFlowAnalysisTable
            displayData={rentalData.getUserSubCategories}
          />
        </div>
      )}
    </div>
  );
};
