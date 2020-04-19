import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import DatePicker from "../Components/shared/DatePicker";
import { useUserQuery, UserQuery } from "../generated/graphql";
import CategoriesTotalsTable from "../Components/categoryTotals/CategoryTotalsTable";

interface ICategoriesTotalsProps {}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    sidebar: {
      minWidth: 200,
      maxWidth: 350,
    },
    main: {
      marginLeft: 15,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const CategoriesTotals: React.FC<ICategoriesTotalsProps> = (props) => {
  const classes = useStyles();
  const [selectedMonth, setSelectedMonth] = React.useState("Apr");
  const [selectedYear, setSelectedYear] = React.useState(2020);

  const { data, loading, refetch: refetchUserQuery } = useUserQuery();
  let categories: UserQuery["user"]["categories"] = [];
  let transactions: UserQuery["user"]["transactions"] = [];

  if (data && data.user) {
    categories = data.user.categories;
    categories.sort((a, b) => {
      if (b.name > a.name) return -1;
      if (a.name < b.name) return 1;
      return 0;
    });
    transactions = data.user.transactions;
  }

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <DatePicker
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      </div>
      <div className={classes.main}>
        <CategoriesTotalsTable />
      </div>
    </div>
  );
};

export default CategoriesTotals;
