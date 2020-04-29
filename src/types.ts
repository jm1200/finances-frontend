import { SubCategoryEntity } from "./generated/graphql";

//Mimics Transaction type from entity Transaction
export interface Transaction {
  id: string;
  userId: string;
  account: string;
  type: string;
  datePosted: string;
  name: string;
  memo: string;
  amount: number;
}

//Table data interfaces
export interface ITransactionCategoryTableData {
  key: string;
  name: string;
  memo: string;
  categoryName: string;
  subCategoryName: string;
  ids: Array<string>;
}

export interface SubCategory {
  name: string;
  subCategoryTotal: number;
  subCategoryId: string;
}
export interface ICategoryTotalsTableDisplayData {
  name: string;
  categoryTotal: number;
  categoryId: string;
  subCategories: SubCategory[];
}

//Lists interfaces
export interface ICategoryList {
  id: string;
  name: string;
  subCategories: SubCategoryEntity[];
}
