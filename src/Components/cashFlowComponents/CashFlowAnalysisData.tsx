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
  const { data, loading, error } = useGetUserSubCategoriesQuery();
  console.log(data);
  let homeData: dataType = [];
  let rentalData: dataType = [];
  if (data && data.getUserSubCategories) {
    homeData = data.getUserSubCategories.filter(
      (category) =>
        category.categoryName !== "Rental Property" &&
        category.categoryName !== "zzIgnore"
    );
    rentalData = data.getUserSubCategories.filter(
      (category) => category.categoryName === "Rental Property"
    );
  }

  return (
    <div>
      <CashFlowHeader
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      {loading && <div>Loading...</div>}
      {error && <div>error loading data</div>}
      {!data || (!data.getUserSubCategories && <div>No data!</div>)}
      {homeData.length > 0 && rentalData.length > 0 && (
        <div>
          <CashFlowAnalysisTable displayData={homeData} />
          <br />
          <CashFlowAnalysisTable displayData={rentalData} />
        </div>
      )}
    </div>
  );
};
