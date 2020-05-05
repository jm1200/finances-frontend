import { GetTransactionsByMonthQuery } from "../../../generated/graphql";
import { ICategoriesGraphDisplayData } from "../../../types";

type Transactions = GetTransactionsByMonthQuery["getTransactionsByMonth"];

//both  null - graph of all categories
//categoryId - graph of all sub categories
//subCategoryId - graph of individual sub categories

export const parseGraphData = (
  transactions: Transactions,
  selectedCategoryId: string | null,
  selectedSubCategoryId: { categoryId: string; subCategoryId: string } | null
): ICategoriesGraphDisplayData[] => {
  let displayData: ICategoriesGraphDisplayData[] = [];
  let filteredTransactions = transactions.filter(
    (transaction) => transaction.category!.name !== "zzIgnore"
  );

  if (!selectedCategoryId && !selectedSubCategoryId) {
    //sum all categories
    console.log("all categories");
  } else if (selectedCategoryId) {
    //sum all subCategories
    console.log("all subCats");
  } else if (selectedSubCategoryId) {
    //display subCategory
    console.log("individual subcats");
  } else {
    return displayData;
  }

  return displayData;
};

// .forEach((transaction) => {
//   if (
//     Object.keys(normalisedCategories).includes(transaction.category!.id)
//   ) {
//     //category already exists
//     normalisedCategories[transaction.category!.id].value +=
//       transaction.amount;
//   } else {
//     //make new object
//     normalisedCategories[transaction.category!.id] = {
//       id: transaction.category!.name,
//       value: transaction.amount,
//       label: transaction.category!.name,
//     };
//   }
// });
