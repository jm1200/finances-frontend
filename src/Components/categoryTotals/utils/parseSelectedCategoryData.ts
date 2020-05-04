import { GetTransactionsByMonthQuery } from "../../../generated/graphql";

type transactions = GetTransactionsByMonthQuery["getTransactionsByMonth"];

interface DisplayData {
  name: string;
  memo: string;
  note?: string | null;
  amount: number;
  datePosted: string;
}
export const parseSelectedCategoryData = (
  transactions: transactions,
  categoryId: string | null,
  subCategoryId: string | null
) => {
  let displayData: DisplayData[] = [];

  let data = transactions.filter((category) => category.name !== "zzIgnore");
  if (categoryId) {
    displayData = data
      .filter((transaction) => transaction.category!.id === categoryId)
      .map((transaction) => ({
        name: transaction.name,
        memo: transaction.memo,
        note: transaction.note,
        amount: transaction.amount,
        datePosted: transaction.datePosted,
      }));
  } else {
    displayData = data
      .filter((transaction) => transaction.subCategory!.id === subCategoryId)
      .map((transaction) => ({
        name: transaction.name,
        memo: transaction.memo,
        note: transaction.note,
        amount: transaction.amount,
        datePosted: transaction.datePosted,
      }));
  }
  return displayData;
};
