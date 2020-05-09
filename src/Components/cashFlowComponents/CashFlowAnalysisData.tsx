import React from "react";
import { CashFlowAnalysisTable } from "./CashFlowAnalysisTable";
import { CashFlowHeader } from "./CashFlowHeader";
import {
  useGetUserSubCategoriesQuery,
  GetUserSubCategoriesQuery,
} from "../../generated/graphql";

interface ICashFlowAnalysisDataProps {}

type dataType = GetUserSubCategoriesQuery["getUserSubCategories"];

export const CashFlowAnalysisData: React.FC<ICashFlowAnalysisDataProps> = (
  props
) => {
  const [selectedYear, setSelectedYear] = React.useState(2019);
  const {
    data: homeData,
    loading: homeLoading,
    error: homeError,
  } = useGetUserSubCategoriesQuery({
    variables: { selectedYear },
  });
  const {
    data: rentalData,
    loading: rentalLoading,
    error: rentalError,
  } = useGetUserSubCategoriesQuery({
    variables: { selectedYear, filteredCategory: "Rental Property" },
  });
  console.log("CFAD 23", homeData, rentalData);

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
            displayData={rentalData?.getUserSubCategories}
          />
        </div>
      )}
    </div>
  );
};
