import React from "react";
import { createStyles, makeStyles, Theme, Paper } from "@material-ui/core";
import { CategoryTotalsTableRoot } from "../Components/categoryTotals/CategoryTotalsTableRoot";
import { MonthPicker } from "../Components/shared/MonthPicker";
import { SelectedCategoryTableRoot } from "../Components/categoryTotals/SelectedCategoryTableRoot";
import { useGetTransactionsByMonthQuery } from "../generated/graphql";

interface ICategoriesTotalsProps {}
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
      flex: 1,
    },
    transactions: {
      marginLeft: 10,
      backgroundColor: theme.palette.background.paper,
      flex: 1,
    },
    monthPicker: {
      width: "100%",
      padding: 20,
      maxHeight: 280,
    },
  })
);

export const CategoriesTotals: React.FC<ICategoriesTotalsProps> = (props) => {
  const classes = useStyles();
  const [selectedMonth, setSelectedMonth] = React.useState("Jan");
  const [selectedYear, setSelectedYear] = React.useState(2019);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const [selectedSubCategory, setSelectedSubCategory] = React.useState<
    string | null
  >(null);

  const { data, loading, error } = useGetTransactionsByMonthQuery({
    fetchPolicy: "no-cache",
    variables: {
      month: selectedMonth,
      year: selectedYear,
    },
  });

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <Paper component="div" className={classes.monthPicker}>
          <MonthPicker
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            setSelectedMonth={setSelectedMonth}
            setSelectedYear={setSelectedYear}
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
              <CategoryTotalsTableRoot
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                setSelectedCategory={setSelectedCategory}
                setSelectedSubCategory={setSelectedSubCategory}
                data={data}
              />
            </div>
            <div className={classes.transactions}>
              <SelectedCategoryTableRoot
                selectedCategory={selectedCategory}
                selectedSubCategory={selectedSubCategory}
                data={data}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
