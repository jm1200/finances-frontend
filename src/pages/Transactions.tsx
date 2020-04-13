import React from "react";
import {
  useGetAllUserTransactionsQuery,
  TransactionEntity,
} from "../generated/graphql";
import MaterialUITable from "../Components/MaterialUITable";
import { UserEntity, useUserQuery } from "../generated/graphql";
import { Transaction } from "../types";

interface ITransactionsProps {}

const Transactions: React.FC<ITransactionsProps> = (props) => {
  const { data } = useUserQuery();

  let transNoTypename: any;
  if (data && data?.user && data!.user!.transactions) {
    const trans: any = data.user.transactions;
    console.log(trans);
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
      {data && data.user && transNoTypename ? (
        <MaterialUITable transactions={transNoTypename} />
      ) : null}
    </div>
  );
};

export default Transactions;
