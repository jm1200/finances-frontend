import React from "react";
import { BudgetTable } from "./BudgetTable";
import { BudgetSidebar } from "./BudgetSidebar";
import {
  useGetUserTransactionsForBudgetLazyQuery,
  ArrayedBudgetCategoryRow,
  useGetUserBudgetsQuery,
  useCreateBudgetMutation,
} from "../../generated/graphql";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

//TODO make one table with targets, month compare and all rolling averages
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    sidebar: {
      width: "100%",
    },
    main: {
      display: "flex",
      marginTop: 20,
    },

    budget: {
      marginLeft: 1,
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
  const [timeFrame, setTimeFrame] = React.useState(12);
  const [budgetTotal, setBudgetTotal] = React.useState(0);
  const [budget, setBudget] = React.useState("Default Budget");

  const [
    getTransactionsForBudget,
    {
      data: transactionsData,
      loading: transactionsLoading,
      error: transactionsError,
    },
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

  let displayData: any = [];
  if (transactionsData && transactionsData.getUserTransactionsForBudget) {
    transactionsData.getUserTransactionsForBudget.forEach((category) => {
      let cat: any = Object.assign({}, { ...category }, { subCategories: [] });
      category.subCategories.forEach((subCategory) => {
        let {
          inputValue,
          avg,
          currentMonth,
          lastMonth,
          lastYearCurrentMonth,
          lastYearLastMonth,
        } = subCategory;

        let newSubCat = Object.assign(
          {},
          { ...subCategory },
          {
            avg: { value: avg, color: avg < inputValue ? "red" : "green" },
            currentMonth: {
              value: currentMonth,
              color: currentMonth < inputValue ? "red" : "green",
            },
            lastMonth: {
              value: lastMonth,
              color: lastMonth < inputValue ? "red" : "green",
            },
            lastYearCurrentMonth: {
              value: lastYearCurrentMonth,
              color: lastYearCurrentMonth < inputValue ? "red" : "green",
            },
            lastYearLastMonth: {
              value: lastYearLastMonth,
              color: lastYearLastMonth < inputValue ? "red" : "green",
            },
          }
        );
        cat.subCategories.push(newSubCat);
      });

      displayData.push(cat);
    });
  }

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

  // let averagesTotal = 0;
  // if (averagesData && averagesData.getUserTransactionsForBudget) {
  //   console.log("BD71", averagesData.getUserTransactionsForBudget);

  //   //Get average total for sidebar
  //   averagesData.getUserTransactionsForBudget.forEach((category) => {
  //     category.subCategories.forEach((subCategory) => {
  //       averagesTotal += subCategory.avg;
  //     });
  //   });
  // }
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
            budgetTotal={budgetTotal}
            budget={budget}
            setBudget={setBudget}
            availableBudgets={budgetData.getUserBudgets}
          />
        )}
      </div>
      <div className={classes.main}>
        {transactionsLoading && <div>Loading rental Data...</div>}
        {transactionsError && <div>error loading rental data</div>}
        {!transactionsData ||
          (!transactionsData.getUserTransactionsForBudget && (
            <div>No rental data!</div>
          ))}

        {budgetData?.getUserBudgets && displayData.length > 0 && (
          <div className={classes.main}>
            <div className={classes.budget}>
              <BudgetTable
                displayData={displayData}
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
