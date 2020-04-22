import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import DatePicker from "../Components/shared/DatePicker";
import { useUserQuery, UserQuery } from "../generated/graphql";
import CategoriesTotalsTable from "../Components/categoryTotals/CategoryTotalsTable";
import moment from "moment";
import { createCategoriesMap } from "../utils/createCategoryMaps";

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
      width: "30%",
    },
  })
);

const filterTransactionsByMonthAndYear = (
  transactions: any,
  year: number,
  month: string
) => {
  return transactions.filter((transaction: any) => {
    const date = transaction.datePosted;
    const yearTest =
      moment(date, "YYYYMMDD").format("YYYY") === year.toString();
    const monthTest = moment(date, "YYYYMMDD").format("MMM") === month;
    if (yearTest && monthTest) {
      return true;
    } else {
      return false;
    }
  });
};

const getGrandTotal = (transactions: any) => {
  let grandTotal = 0;
  transactions.forEach((transaction: any) => {
    grandTotal += transaction.amount;
  });
  return grandTotal;
};

const CategoriesTotals: React.FC<ICategoriesTotalsProps> = (props) => {
  const classes = useStyles();
  const [selectedMonth, setSelectedMonth] = React.useState("Jan");
  const [selectedYear, setSelectedYear] = React.useState(2019);

  const { data, loading, refetch: refetchUserQuery } = useUserQuery();
  let categories: UserQuery["user"]["categories"] = [];
  let transactions: UserQuery["user"]["transactions"] = [];
  let subCategories: UserQuery["user"]["subCategories"] = [];
  let categoriesMap: any;
  let subCategoriesMap: any;
  let displayData: any = [];
  let grandTotal: any = 0;

  if (data && data.user) {
    categories = data.user.categories;
    transactions = data.user.transactions;
    subCategories = data.user.subCategories;

    categoriesMap = createCategoriesMap(categories);
    subCategoriesMap = createCategoriesMap(subCategories);

    const filteredTransactions = filterTransactionsByMonthAndYear(
      transactions,
      selectedYear,
      selectedMonth
    );

    grandTotal = getGrandTotal(filteredTransactions);

    const transMap = filteredTransactions.map((transaction: any) => {
      let amount = transaction.amount;
      let categoryId = transaction.categoryId ? transaction.categoryId : 0;
      let subCategoryId = transaction.subCategoryId
        ? transaction.subCategoryId
        : 0;
      let categoryName = transaction.categoryId
        ? categoriesMap[transaction.categoryId].name
        : "uncategorized";
      let subCategoryName = transaction.subCategoryId
        ? subCategoriesMap[transaction.subCategoryId].name
        : "uncategorized";
      return {
        amount,
        categoryId,
        subCategoryId,
        categoryName,
        subCategoryName,
      };
    });

    const normalizedDisplayData: any = {};

    transMap.forEach((transaction: any) => {
      let categoryKeyName: string = transaction.categoryId
        .toString()
        .concat(transaction.categoryName);
      let subCategoryKeyName: string = transaction.subCategoryId
        .toString()
        .concat(transaction.subCategoryName);

      if (Object.keys(normalizedDisplayData).includes(categoryKeyName)) {
        //add amount to total, determine whether to push subCat
        normalizedDisplayData[categoryKeyName].categoryTotal +=
          transaction.amount;
        if (
          Object.keys(
            normalizedDisplayData[categoryKeyName].subCategories
          ).includes(subCategoryKeyName)
        ) {
          //add amount to sub cat total
          normalizedDisplayData[categoryKeyName].subCategories[
            subCategoryKeyName
          ].subCategoryTotal += transaction.amount;
        } else {
          //push new sub cat index
          normalizedDisplayData[categoryKeyName].subCategories[
            subCategoryKeyName
          ] = {
            id: transaction.subCategoryId,
            name: transaction.subCategoryName,
            subCategoryTotal: transaction.amount,
          };
        }
      } else {
        //make new indexes
        let normalizedSubCategories: any = {};
        normalizedSubCategories[subCategoryKeyName] = {
          id: transaction.subCategoryId,
          name: transaction.subCategoryName,
          subCategoryTotal: transaction.amount,
        };

        normalizedDisplayData[categoryKeyName] = {
          id: transaction.categoryId,
          name: transaction.categoryName,
          categoryTotal: transaction.amount,
          subCategories: normalizedSubCategories,
        };
      }
    });

    displayData = Object.keys(normalizedDisplayData).map((categoryKey) =>
      Object.assign(
        {},
        { ...normalizedDisplayData[categoryKey] },
        {
          subCategories: Object.keys(
            normalizedDisplayData[categoryKey].subCategories
          ).map(
            (subCategoryKey) =>
              normalizedDisplayData[categoryKey].subCategories[subCategoryKey]
          ),
        }
      )
    );
    console.log("CT151", displayData);
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
        {loading && displayData.legnth == 0 && <p>Loading...</p>}
        {!loading && displayData.length > 0 && (
          <CategoriesTotalsTable
            displayData={displayData}
            grandTotal={grandTotal}
          />
        )}
      </div>
    </div>
  );
};

export default CategoriesTotals;
