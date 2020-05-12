import { GetTransactionsByMonthQuery } from "../../../generated/graphql";
import {
  ICategoriesGraphDisplayData,
  ICategoriesListDisplayData,
} from "../../../types";

interface INormalisedData {
  [key: string]: ICategoriesGraphDisplayData;
}
type Transactions = GetTransactionsByMonthQuery["getTransactionsByMonth"];
export const parseGraphData = (
  transactions: ICategoriesListDisplayData[],
  allTransactions: Transactions,
  selectedCategoryId: string | null,
  selectedSubCategoryId: { categoryId: string; subCategoryId: string } | null
): ICategoriesGraphDisplayData[] => {
  let displayData: ICategoriesGraphDisplayData[] = [];

  if (!selectedCategoryId && !selectedSubCategoryId) {
    transactions
      .filter(
        (transaction) =>
          transaction.name !== "Income" &&
          transaction.name !== "Rental Property"
      )
      .forEach((transaction) => {
        displayData.push({
          id: transaction.categoryId,
          label: transaction.name,
          value: Math.abs(transaction.categoryTotal),
        });
      });
    return displayData;
  } else if (selectedCategoryId) {
    //sum all subCategories
    transactions
      .filter((category) => category.categoryId === selectedCategoryId)[0]
      .subCategories.forEach((subCategory) => {
        displayData.push({
          id: subCategory.subCategoryId,
          label: subCategory.name,
          value: Math.abs(subCategory.subCategoryTotal),
        });
      });
    console.log("PGD42", displayData);
    return displayData;
  } else if (selectedSubCategoryId) {
    displayData = allTransactions
      .filter(
        (transaction) =>
          transaction.subCategory!.id === selectedSubCategoryId.subCategoryId
      )
      .map((transaction) => ({
        id: transaction.id,
        label: transaction.name,
        value: Math.abs(transaction.amount),
      }));
    console.log("PGD54", displayData);
    return displayData;
  } else {
    return displayData;
  }
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
