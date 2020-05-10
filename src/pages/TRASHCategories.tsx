import React from "react";
import { CategoryListRoot } from "../Components/categoriesComponents/CategoryListRoot";
import { TransactionCategoryTableRoot } from "../Components/categoriesComponents/TransactionCategoryTableRoot";

import { createStyles, makeStyles, Theme } from "@material-ui/core";

interface ICategoriesProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    categories: {
      minWidth: 350,
    },
    transactions: {
      marginLeft: 20,
      width: "100%",
    },
  })
);

const Categories: React.FC<ICategoriesProps> = (props) => {
  const classes = useStyles();
  const [selectedMonth, setSelectedMonth] = React.useState("Apr");
  const [selectedYear, setSelectedYear] = React.useState(2019);

  return (
    <div className={classes.root}>
      <div className={classes.categories}>
        <CategoryListRoot
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          setSelectedMonth={setSelectedMonth}
          setSelectedYear={setSelectedYear}
        />
      </div>

      <div className={classes.transactions}>
        <TransactionCategoryTableRoot
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </div>
    </div>
  );
};

export default Categories;
