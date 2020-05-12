import React from "react";
import { SummaryTable } from "./SummaryTable";
import {
  useGetUserSubCategoriesQuery,
  GetUserSubCategoriesQuery,
} from "../../generated/graphql";

interface ISummaryDataProps {}

export const SummaryData: React.FC<ISummaryDataProps> = (props) => {
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
      <div>year picker...</div>
      {homeLoading && <div>Loading Home Data...</div>}
      {homeError && <div>error loading Home data</div>}
      {!homeData ||
        (!homeData.getUserSubCategories && <div>No Home data!</div>)}
      {homeData?.getUserSubCategories && (
        <div>
          <SummaryTable
            name="Home"
            displayData={homeData.getUserSubCategories[0]}
          />
        </div>
      )}

      {rentalLoading && <div>Loading rental Data...</div>}
      {rentalError && <div>error loading rental data</div>}
      {!rentalData ||
        (!rentalData.getUserSubCategories && <div>No rental data!</div>)}
      {rentalData?.getUserSubCategories && (
        <div>
          <br />
          <SummaryTable
            name="377 Hyde Park Rd."
            displayData={rentalData.getUserSubCategories[0]}
          />
        </div>
      )}
      <div>Assets vs Liabilites</div>
      <div>year over year for both IvE and AvL</div>
    </div>
  );
};
