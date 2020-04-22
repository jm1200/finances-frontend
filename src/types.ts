//Mimics Transaction type from entity Transaction
export interface Transaction {
  id: string;
  userId: number;
  account: string;
  type: string;
  datePosted: string;
  name: string;
  memo: string;
  amount: number;
}
