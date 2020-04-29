import React from "react";
import { createStyles, makeStyles, Theme, Paper } from "@material-ui/core";
import { CategoryTotalsTableRoot } from "../Components/categoryTotals/CategoryTotalsTableRoot";
import { MonthPicker } from "../Components/shared/MonthPicker";
import { SelectedCategoryTableRoot } from "../Components/categoryTotals/SelectedCategoryTableRoot";

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

  console.log("CT 51", selectedCategory, selectedSubCategory);

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
        <div className={classes.categories}>
          <CategoryTotalsTableRoot
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            setSelectedCategory={setSelectedCategory}
            setSelectedSubCategory={setSelectedSubCategory}
          />
        </div>
        <div className={classes.transactions}>
          <SelectedCategoryTableRoot />
        </div>
      </div>
    </div>
  );
};
