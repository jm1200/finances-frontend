import React from "react";
import { SummaryTable } from "./SummaryTable";
import { YearOverYearTable } from "./YearOverYearTable";
import { YearPicker } from "../shared/YearPicker";
import { useGetUserSubCategoriesForCashFlowQuery } from "../../generated/graphql";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface ISummaryDataProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    yearPicker: {
      width: 200,
    },
  })
);

export const SummaryData: React.FC<ISummaryDataProps> = (props) => {
  const [selectedYear, setSelectedYear] = React.useState(2019);
  const classes = useStyles();
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

  //TODO separate query for these totals!
  const {
    data: dataHome2019,
    loading: loadingHome2019,
    error: errorHome2019,
  } = useGetUserSubCategoriesForCashFlowQuery({
    variables: { selectedYear: 2019, filteredCategory: "Home" },
  });

  const {
    data: dataHome2020,
    loading: loadingHome2020,
    error: errorHome2020,
  } = useGetUserSubCategoriesForCashFlowQuery({
    variables: { selectedYear: 2020, filteredCategory: "Home" },
  });

  return (
    <div>
      <div className={classes.yearPicker}>
        {" "}
        <YearPicker
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      </div>

      {homeLoading && <div>Loading Home Data...</div>}
      {homeError && <div>error loading Home data</div>}
      {!homeData ||
        (!homeData.getUserSubCategoriesForCashFlow && <div>No Home data!</div>)}
      {homeData?.getUserSubCategoriesForCashFlow && (
        <div>
          <SummaryTable
            name="Home"
            displayData={homeData.getUserSubCategoriesForCashFlow[0]}
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
          <SummaryTable
            name="377 Hyde Park Rd."
            displayData={rentalData.getUserSubCategoriesForCashFlow[0]}
          />
        </div>
      )}

      {loadingHome2019 && loadingHome2020 && <div>Loading rental Data...</div>}
      {errorHome2019 && errorHome2020 && <div>error loading rental data</div>}
      {!dataHome2019 ||
        !dataHome2020 ||
        (!dataHome2019.getUserSubCategoriesForCashFlow &&
          !dataHome2020.getUserSubCategoriesForCashFlow && (
            <div>No rental data!</div>
          ))}
      {dataHome2019?.getUserSubCategoriesForCashFlow &&
        dataHome2020?.getUserSubCategoriesForCashFlow && (
          <div>
            <br />
            <YearOverYearTable
              name="Year over Year"
              displayData={[
                dataHome2019.getUserSubCategoriesForCashFlow[0],
                dataHome2020.getUserSubCategoriesForCashFlow[0],
              ]}
            />
          </div>
        )}

      <div>Assets vs Liabilites</div>
    </div>
  );
};
// Display data shape for tables:
// export class IDisplayData {
//   categoryName: string;
//   subCategoryName: string;
//   categoryId: string;
//   subCategoryLength: number;
//   Jan: string;
//   Feb: string;
//   Mar: string;
//   Apr: string;
//   May: string;
//   Jun: string;
//   Jul: string;
//   Aug: string;
//   Sep: string;
//   Oct: string;
//   Nov: string;
//   Dec: string;
//   low?: string;
//   high?: string;
//   avg?: string;
//   med?: string;
//   subCategories: IDisplaySubCategoryRow[];
// }
