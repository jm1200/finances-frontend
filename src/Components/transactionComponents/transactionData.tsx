import React from "react";
import { TransactionsTable } from "./TransactionsTable";
import { TransactionsSidebar } from "./TransactionsSidebar";
import {
  useGetUserTransactionsForTransactionsPageQuery,
  useGetUserCategoriesQuery,
  GetUserTransactionsForTransactionsPageQueryVariables,
} from "../../generated/graphql";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import moment from "moment";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    sidebar: {
      width: 450,
    },
    main: {
      marginLeft: 20,
      width: "100%",
    },
  })
);
interface ITransactionDataProps {}

export const TransactionData: React.FC<ITransactionDataProps> = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [take, setTake] = React.useState(10);
  const [filter, setFilter] = React.useState("");
  const [order, setOrder] = React.useState("datePosted");
  const [filterByDate, setFilterByDate] = React.useState(false);
  const [selectedMonth, setSelectedMonth] = React.useState(
    moment().format("MMM")
  );
  const [selectedYear, setSelectedYear] = React.useState(
    parseInt(moment().format("YYYY"))
  );
  let variables: GetUserTransactionsForTransactionsPageQueryVariables = {
    skip: page,
    take,
    filter,
    order,
  };
  if (filterByDate) {
    variables = { ...variables, month: selectedMonth, year: selectedYear };
  }
  const {
    data: transactionsData,
    loading: transactionsLoading,
    error: transactionsError,
    refetch: transactionsRefetch,
  } = useGetUserTransactionsForTransactionsPageQuery({
    variables,
  });

  const {
    data: categoryListData,
    loading: categoryListLoading,
    error: categoryListError,
    // refetch: refetchCategories,
  } = useGetUserCategoriesQuery();

  if (
    transactionsData &&
    transactionsData.getUserTransactionsForTransactionsPage
  ) {
    console.log(
      "TD21",
      transactionsData.getUserTransactionsForTransactionsPage
    );
  }
  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <TransactionsSidebar
          filter={filter}
          filterByDate={filterByDate}
          setFilterByDate={setFilterByDate}
          setFilter={setFilter}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      </div>
      <div className={classes.main}>
        {transactionsLoading && categoryListLoading && (
          <div>Loading transactions Data...</div>
        )}
        {transactionsError && categoryListError && (
          <div>error loading transactions data</div>
        )}
        {!transactionsData ||
          (!transactionsData.getUserTransactionsForTransactionsPage && (
            <div>No transactions data!</div>
          ))}
        {transactionsData?.getUserTransactionsForTransactionsPage &&
          categoryListData?.getUserCategories && (
            <div>
              <br />
              <TransactionsTable
                page={page}
                setPage={setPage}
                order={order}
                setOrder={setOrder}
                take={take}
                setTake={setTake}
                displayData={
                  transactionsData.getUserTransactionsForTransactionsPage
                    .transactions
                }
                length={
                  transactionsData.getUserTransactionsForTransactionsPage.length
                }
                categoriesData={categoryListData.getUserCategories}
                refetchTransactions={transactionsRefetch}
              />
            </div>
          )}
      </div>
    </div>
  );
};
