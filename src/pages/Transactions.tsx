import React from "react";
import { useGetAllUserTransactionsQuery } from "../generated/graphql";
//import { useUserLazyQuery } from "../generated/graphql";

interface ITransactionsProps {}

const Transactions: React.FC<ITransactionsProps> = (props) => {
  const { data } = useGetAllUserTransactionsQuery();
  console.log("Transaction page 9 data ", data);
  return (
    <div>
      <h1>Transactions Component</h1>
    </div>
  );
};

export default Transactions;
