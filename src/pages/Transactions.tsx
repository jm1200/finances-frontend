import React from "react";
import {
  useGetAllUserTransactionsQuery,
  TransactionEntity,
} from "../generated/graphql";
import MaterialUITable from "../Components/MaterialUITable";
import { UserEntity } from "../generated/graphql";
import { Transaction } from "../types";

interface ITransactionsProps {}

const Transactions: React.FC<ITransactionsProps> = (props) => {
  const { data } = useGetAllUserTransactionsQuery();

  let transNoTypename: any;
  if (
    data &&
    data?.getAllUserTransactions &&
    data.getAllUserTransactions.transactions
  ) {
    const trans: any = data.getAllUserTransactions.transactions;
    transNoTypename = trans.map((obj: TransactionEntity) => ({
      id: obj.id,
      userId: obj.userId,
      transId: obj.transId,
      account: obj.account,
      type: obj.type,
      datePosted: obj.datePosted,
      name: obj.name,
      memo: obj.memo,
      amount: obj.amount,
    }));
  }

  return (
    <div>
      <h1>Transactions Component</h1>
      {data && data.getAllUserTransactions && transNoTypename ? (
        <MaterialUITable transactions={transNoTypename} />
      ) : null}
    </div>
  );
};

export default Transactions;
