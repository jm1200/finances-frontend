//Mimics Transaction type from entity Transaction
export interface Transaction {
  account: string;
  type: string;
  datePosted: string;
  transId: string;
  name: string;
  memo: string;
  amount: string;
}
