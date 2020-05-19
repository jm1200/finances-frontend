import React from "react";
import { BudgetAveragesTable } from "./BudgetAveragesTable";
import { BudgetTable } from "./BudgetTable";
import { BudgetSidebar } from "./BudgetSidebar";
import {
  useGetUserTransactionsForBudgetLazyQuery,
  ArrayedBudgetCategoryRow,
  useGetUserBudgetsQuery,
  useCreateBudgetMutation,
  useDeleteBudgetMutation,
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
  const [budget, setBudget] = React.useState("Default Budget");

  const [
    getTransactionsForBudget,
    { data: averagesData, loading: averagesLoading, error: averagesError },
  ] = useGetUserTransactionsForBudgetLazyQuery({ fetchPolicy: "network-only" });

  const {
    data: budgetData,
    loading: budgetLoading,
    error: budgetError,
    refetch: budgetRefetch,
  } = useGetUserBudgetsQuery();

  const [createBudget] = useCreateBudgetMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getTransactionsForBudget({
      variables: {
        selectedTimeFrame: timeFrame,
        book,
        selectedBudget: budget,
      },
    });
  };

  const handleSaveBudget = async (
    values: { name: string },
    inputValues: InitialInputState
  ) => {
    console.log("bd61", values, inputValues);
    Object.keys(inputValues).forEach((key) => {
      if (!inputValues[key].value) inputValues[key].value = "0";
    });
    await createBudget({
      variables: {
        name: values.name,
        values: JSON.stringify(inputValues),
      },
    });
    await budgetRefetch();
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
        {budgetLoading && <div>Loading rental Data...</div>}
        {budgetError && <div>error loading rental data</div>}
        {!budgetData ||
          (!budgetData.getUserBudgets && <div>No rental data!</div>)}

        {budgetData && budgetData.getUserBudgets && (
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
            availableBudgets={budgetData.getUserBudgets}
          />
        )}
      </div>
      <div>
        {averagesLoading && <div>Loading rental Data...</div>}
        {averagesError && <div>error loading rental data</div>}
        {!averagesData ||
          (!averagesData.getUserTransactionsForBudget && (
            <div>No rental data!</div>
          ))}

        {averagesData?.getUserTransactionsForBudget &&
          budgetData?.getUserBudgets && (
            <div className={classes.main}>
              <div className={classes.budget}>
                <BudgetTable
                  displayData={averagesData.getUserTransactionsForBudget}
                  setBudgetTotal={setBudgetTotal}
                  saveBudget={handleSaveBudget}
                  availableBudgets={budgetData.getUserBudgets}
                  refetchBudget={budgetRefetch}
                />
              </div>
            </div>
          )}
      </div>
    </div>
  );
};
