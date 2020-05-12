import React from "react";
import { EditCategoriesTable } from "./EditCategoriesTable";
import { Theme, createStyles, makeStyles, Paper } from "@material-ui/core";
import { MonthPicker } from "../shared/MonthPicker";
import CategoryList from "./CategoryList";
import {
  useGetUserCategoriesQuery,
  useGetTransactionsByMonthQuery,
} from "../../generated/graphql";
import { YearPicker } from "../shared/YearPicker";

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
    monthPicker: {
      marginBottom: 15,
      padding: 20,
      maxHeight: 280,
    },
    sidebar: {
      display: "flex",
      flexDirection: "column",
      width: 300,
    },
  })
);
interface IEditCategoriesDataProps {}

export const EditCategoriesData: React.FC<IEditCategoriesDataProps> = (
  props
) => {
  const classes = useStyles();
  const [selectedMonth, setSelectedMonth] = React.useState("Apr");
  const [selectedYear, setSelectedYear] = React.useState(2019);

  const {
    data: categoryListData,
    loading: categoryListLoading,
    error: categoryListError,
    refetch: refetchCategories,
  } = useGetUserCategoriesQuery();

  const {
    data: transactionData,
    loading: transactionLoading,
    error: transactionError,
    refetch: refetchTransactions,
  } = useGetTransactionsByMonthQuery({
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
          <YearPicker
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />

          <MonthPicker
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        </Paper>
        <div>
          {categoryListLoading ? <div>Loading Categories List</div> : null}
          {categoryListError ? <div>Error Loading Categories!</div> : null}
          {!categoryListData ||
          categoryListData.getUserCategories.length === 0 ? (
            <div>No Data!</div>
          ) : (
            <CategoryList
              categories={categoryListData.getUserCategories}
              refetchCategories={refetchCategories}
            />
          )}
        </div>
      </div>

      <div className={classes.transactions}>
        {transactionLoading || categoryListLoading ? (
          <div>Loading Categories List</div>
        ) : null}
        {transactionError || categoryListError ? (
          <div>Error Loading Categories!</div>
        ) : null}
        {!transactionData ||
        transactionData.getTransactionsByMonth.length === 0 ||
        !categoryListData ? (
          <div>No Data!</div>
        ) : (
          <EditCategoriesTable
            data={transactionData.getTransactionsByMonth}
            categoriesData={categoryListData.getUserCategories}
            refetchTransactions={refetchTransactions}
          />
        )}
      </div>
    </div>
  );
};
