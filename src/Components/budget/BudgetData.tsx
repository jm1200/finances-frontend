import React from "react";
import { BudgetAveragesTable } from "./BudgetAveragesTable";
import { BudgetTable } from "./BudgetTable";
import { BudgetSidebar } from "./BudgetSidebar";
import { useGetUserTransactionsForBudgetLazyQuery } from "../../generated/graphql";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    sidebar: {
      width: 300,
    },
    main: {
      display: "flex",
      // alignItems: "center",
      // justifyContent: "space-between",
      // alignContent: "center",
    },
    averages: {
      marginLeft: 15,
    },
    budget: {
      marginLeft: 15,
    },
  })
);

interface IBudgetDataProps {}

export const BudgetData: React.FC<IBudgetDataProps> = (props) => {
  const classes = useStyles();
  const [book, setBook] = React.useState("Home");
  const [timeFrame, setTimeFrame] = React.useState(2);
  const [budgetTotal, setBudgetTotal] = React.useState(0);

  const [
    getTransactionsForBudget,
    { data: averagesData, loading: averagesLoading, error: averagesError },
  ] = useGetUserTransactionsForBudgetLazyQuery();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getTransactionsForBudget({
      variables: {
        selectedTimeFrame: timeFrame,
        book,
      },
    });
  };
  let averagesTotal = 0;
  if (averagesData && averagesData.getUserTransactionsForBudget) {
    averagesData.getUserTransactionsForBudget.forEach((category) => {
      category.subCategories.forEach((subCategory) => {
        averagesTotal += subCategory.avg;
      });
    });
  }
  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <BudgetSidebar
          book={book}
          timeFrame={timeFrame}
          setBook={setBook}
          setTimeFrame={setTimeFrame}
          handleSubmit={handleSubmit}
          averagesTotal={averagesTotal}
          budgetTotal={budgetTotal}
        />
      </div>
      <div>
        {averagesLoading && <div>Loading rental Data...</div>}
        {averagesError && <div>error loading rental data</div>}
        {!averagesData ||
          (!averagesData.getUserTransactionsForBudget && (
            <div>No rental data!</div>
          ))}

        {averagesData?.getUserTransactionsForBudget && (
          <div className={classes.main}>
            <div className={classes.budget}>
              <BudgetTable
                displayData={averagesData.getUserTransactionsForBudget}
                setBudgetTotal={setBudgetTotal}
              />
            </div>
            <div className={classes.averages}>
              <BudgetAveragesTable
                displayData={averagesData.getUserTransactionsForBudget}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
