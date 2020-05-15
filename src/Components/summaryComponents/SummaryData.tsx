import React from "react";
import { SummaryTable } from "./SummaryTable";
import { YearOverYearTable } from "./YearOverYearTable";
import { YearPicker } from "../shared/YearPicker";
import {
  useGetUserSubCategoriesForCashFlowQuery,
  useGetTotalsForSummaryQuery,
} from "../../generated/graphql";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import moment from "moment";

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
  const currentYear = moment(Date.now()).format("YYYY");
  const [selectedYear, setSelectedYear] = React.useState(parseInt(currentYear));
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
    data: YearOverYearData,
    loading: YearOverYearLoading,
    error: YearOverYearError,
  } = useGetTotalsForSummaryQuery();

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

      {YearOverYearLoading && <div>Loading rental Data...</div>}
      {YearOverYearError && <div>error loading rental data</div>}
      {!YearOverYearData ||
        (!YearOverYearData.getTotalsForSummary && <div>No rental data!</div>)}
      {YearOverYearData?.getTotalsForSummary && (
        <div>
          <br />
          <YearOverYearTable
            displayData={YearOverYearData.getTotalsForSummary}
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
