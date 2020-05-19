import React from "react";
import { TransactionData } from "../Components/transactionComponents/transactionData";

interface ITransactionsProps {}

export const Transactions: React.FC<ITransactionsProps> = (props) => {
  return (
    <div>
      <TransactionData />
    </div>
  );
};
