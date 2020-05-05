import { GetTransactionsByMonthQuery } from "../../../generated/graphql";
import { ICategoriesListDisplayData, SubCategory } from "../../../types";

type transactions = GetTransactionsByMonthQuery["getTransactionsByMonth"];

interface INormalisedCategoryTotalsTableDisplayData {
  name: string;
  categoryTotal: number;
  categoryId: string;
  subCategories: { [key: string]: SubCategory };
}
export const parseDisplayData = (
  transactions: transactions
): ICategoriesListDisplayData[] => {
  let normalisedCategories: {
    [key: string]: INormalisedCategoryTotalsTableDisplayData;
  } = {};
  transactions
    .filter((transaction) => transaction.category!.name !== "zzIgnore")
    .forEach((transaction) => {
      if (
        Object.keys(normalisedCategories).includes(transaction.category!.id)
      ) {
        //category already exists
        normalisedCategories[transaction.category!.id].categoryTotal +=
          transaction.amount;
        if (
          Object.keys(
            normalisedCategories[transaction.category!.id].subCategories
          ).includes(transaction.subCategory!.id)
        ) {
          //subCategory exists
          normalisedCategories[transaction.category!.id].subCategories[
            transaction.subCategory!.id
          ].subCategoryTotal += transaction.amount;
        } else {
          //make new subCategory object

          normalisedCategories[transaction.category!.id].subCategories[
            transaction.subCategory!.id
          ] = {
            name: transaction.subCategory!.name,
            subCategoryId: transaction.subCategory!.id,
            subCategoryTotal: transaction.amount,
          };
        }
      } else {
        //make new object
        let normalisedSubCategories: { [key: string]: SubCategory } = {};
        normalisedSubCategories[transaction.subCategory!.id] = {
          name: transaction.subCategory!.name,
          subCategoryId: transaction.subCategory!.id,
          subCategoryTotal: transaction.amount,
        };
        normalisedCategories[transaction.category!.id] = {
          name: transaction.category!.name,
          categoryId: transaction.category!.id,
          categoryTotal: transaction.amount,
          subCategories: normalisedSubCategories,
        };
      }
    });

  const displayData: ICategoriesListDisplayData[] = Object.keys(
    normalisedCategories
  ).map((categoryKey) =>
    Object.assign(
      {},
      { ...normalisedCategories[categoryKey] },
      {
        subCategories: Object.keys(
          normalisedCategories[categoryKey].subCategories
        ).map(
          (subCategoryKey) =>
            normalisedCategories[categoryKey].subCategories[subCategoryKey]
        ),
      }
    )
  );

  //sort displayData
  displayData
    .sort((a, b) => {
      if (Math.abs(b.categoryTotal) < Math.abs(a.categoryTotal)) return -1;
      if (Math.abs(b.categoryTotal) > Math.abs(a.categoryTotal)) return 1;
      return 0;
    })
    .forEach((category) => {
      category.subCategories.sort((a, b) => {
        if (Math.abs(b.subCategoryTotal) < Math.abs(a.subCategoryTotal))
          return -1;
        if (Math.abs(b.subCategoryTotal) > Math.abs(a.subCategoryTotal))
          return 1;
        return 0;
      });
    });

  return displayData;
};

// {
//     name:
//     categoryTotal:
//     id:
//     subCategories: [
//       name
//       subCategoryTotal
//     ]
//   }
