import React from "react";
import { BudgetAveragesTable } from "./BudgetAveragesTable";
import { BudgetTable } from "./BudgetTable";
import { BudgetSidebar } from "./BudgetSidebar";
import {
  useGetUserTransactionsForBudgetLazyQuery,
  ArrayedBudgetCategoryRow,
  DisplaySubCategoryRow,
} from "../../generated/graphql";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import numeral from "numeral";

//TODO make one table with targets, month compare and all rolling averages
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    sidebar: {
      width: 250,
    },
    main: {
      display: "flex",
    },
    averages: {
      marginLeft: 15,
    },
    budget: {
      marginLeft: 15,
    },
  })
);

export interface InitialInputState {
  [key: string]: {
    id: string;
    name: string;
    value: string;
  };
}

interface NormalisedSubCategories {
  [key: string]: ArrayedBudgetCategoryRow;
}

interface IBudgetDataProps {}

export const BudgetData: React.FC<IBudgetDataProps> = (props) => {
  const classes = useStyles();
  const [book, setBook] = React.useState("Home");
  const [timeFrame, setTimeFrame] = React.useState(2);
  const [budgetTotal, setBudgetTotal] = React.useState(0);
  const [budget, setBudget] = React.useState("Test Budget 1");

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

  const handleSaveBudget = (
    values: { name: string },
    inputValues: InitialInputState
  ) => {
    console.log("bd61", values, inputValues);
  };
  let averagesTotal = 0;
  if (averagesData && averagesData.getUserTransactionsForBudget) {
    console.log("BD71", averagesData.getUserTransactionsForBudget);

    //Get average total for sidebar
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
          budget={budget}
          setBudget={setBudget}
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
                saveBudget={handleSaveBudget}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
