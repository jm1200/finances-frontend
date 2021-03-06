import React from "react";
import { createStyles, makeStyles, Theme, Paper } from "@material-ui/core";
import { YearPicker } from "../shared/YearPicker";
import { MonthPicker } from "../shared/MonthPicker";
import { useGetTransactionsByMonthQuery } from "../../generated/graphql";
import { TotalsViewTab } from "./TotalsViewTab";
import {
  ICategoriesListDisplayData,
  ICategoriesTransactionsTableDisplayData,
  ICategoriesGraphDisplayData,
} from "../../types";
import { parseDisplayData } from "./utils/parseDisplayData";
import { CategoryTotalsTable } from "./CategoryTotalsTable";
import { parseSelectedCategoryData } from "./utils/parseSelectedCategoryData";
import { parseGraphData } from "./utils/parseGraphData";
import { BookPicker } from "../shared/BookPicker";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    sidebar: {
      width: "20%",
    },
    main: {
      marginLeft: 5,

      width: "80%",
      display: "flex",
    },
    categories: {
      marginLeft: 10,
      backgroundColor: theme.palette.background.paper,
      width: "35%",
    },
    transactions: {
      marginLeft: 10,
      backgroundColor: theme.palette.background.paper,
      width: "65%",
    },
    monthPicker: {
      width: "100%",
      padding: 20,
      maxHeight: 280,
    },
    bookSelect: {
      width: "100%",
      marginTop: 20,
      padding: 20,
    },
  })
);
interface ICategoriesTotalsDataProps {}
export const CategoriesTotalsData: React.FC<ICategoriesTotalsDataProps> = (
  props
) => {
  const classes = useStyles();
  const currentMonth = moment(Date.now()).format("MMM");
  const currentYear = moment(Date.now()).format("YYYY");

  const [selectedMonth, setSelectedMonth] = React.useState(currentMonth);
  const [selectedYear, setSelectedYear] = React.useState(parseInt(currentYear));
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const [selectedSubCategory, setSelectedSubCategory] = React.useState<{
    categoryId: string;
    subCategoryId: string;
  } | null>(null);

  const [selectedBook, setSelectedBook] = React.useState("Home");

  const { data, loading, error } = useGetTransactionsByMonthQuery({
    fetchPolicy: "no-cache",
    variables: {
      month: selectedMonth,
      year: selectedYear,
    },
  });

  let categoriesListDisplayData: ICategoriesListDisplayData[] = [];
  let categoriesTransactionsTableDisplayData: ICategoriesTransactionsTableDisplayData[] = [];
  let categoriesGraphDisplayData: ICategoriesGraphDisplayData[] = [];
  let grandTotal: number = 0;

  if (!loading && data) {
    const initialFilter = data.getTransactionsByMonth.filter(
      (transaction) => transaction.book === selectedBook
    );
    categoriesListDisplayData = parseDisplayData(initialFilter);

    grandTotal = categoriesListDisplayData.reduce(
      (acc, cur) => (acc += cur.categoryTotal),
      0
    );

    categoriesTransactionsTableDisplayData = parseSelectedCategoryData(
      initialFilter,
      selectedCategory,
      selectedSubCategory
    );

    categoriesGraphDisplayData = parseGraphData(
      categoriesListDisplayData,
      initialFilter,
      selectedCategory,
      selectedSubCategory
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <Paper component="div" className={classes.monthPicker}>
          <YearPicker
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
          <MonthPicker
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        </Paper>
        <Paper component="div" className={classes.bookSelect}>
          <BookPicker
            selectedBook={selectedBook}
            setSelectedBook={setSelectedBook}
          />
        </Paper>
      </div>
      <div className={classes.main}>
        {loading && <div>Loading monthly totals...</div>}
        {error && <div>There was an error Loading Categories</div>}
        {!data ||
          (data.getTransactionsByMonth.length === 0 && <div>No data!</div>)}
        {data && (
          <>
            <div className={classes.categories}>
              <CategoryTotalsTable
                setSelectedCategory={setSelectedCategory}
                setSelectedSubCategory={setSelectedSubCategory}
                displayData={categoriesListDisplayData}
                grandTotal={grandTotal}
              />
            </div>
            <div className={classes.transactions}>
              <TotalsViewTab
                selectedCategory={selectedCategory}
                selectedSubCategory={selectedSubCategory}
                categoriesTransactionsTableDisplayData={
                  categoriesTransactionsTableDisplayData
                }
                categoriesGraphDisplayData={categoriesGraphDisplayData}
                //categoriesGraphDisplayData={tempData}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

//CategoriesTotalsData-->CategoriesTotalsTableRoot(parseDisplayData)-->CategoryTotalsTable-->
//                    -->TotalsViewTab-->SelectedCategoryTableRoot(parseSelectedCategoryData)-->SelectedCategoryTable
//                                    -->SelectedCategoryGraphRoot-->MyResponsivePie

//CategoriesTotalsData(parseDisplayData)--> CategoryTotalsTable-
//                    (parseSelectedCategoryData)--> SelectedCategoryTable
//                    (parseDisplayData) --> MyResponsivePie
