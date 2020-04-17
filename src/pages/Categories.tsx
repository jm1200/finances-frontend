import React from "react";
import { useUserQuery, UserQuery } from "../generated/graphql";
import CategoryList from "../Components/categoryListComonents/CategoryList";
import TransactionCategoryTable from "../Components/categoryListComonents/TransactionCategoryTable";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

interface ICategoriesProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    categories: {
      minWidth: 350,
    },
    transactions: {
      marginLeft: 20,
    },
  })
);

const Categories: React.FC<ICategoriesProps> = (props) => {
  const classes = useStyles();
  const { data, loading, refetch: refetchUserQuery } = useUserQuery();
  let categories: UserQuery["user"]["categories"] = [];
  let transactions: UserQuery["user"]["transactions"] = [];

  if (data && data.user) {
    categories = data.user.categories;
    transactions = data.user.transactions;
  }
  return (
    <div className={classes.root}>
      <div className={classes.categories}>
        {loading ? <div>Loading..</div> : null}
        {categories && !loading ? (
          <CategoryList
            categories={categories.sort((a, b) => {
              if (b.name > a.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            })}
            refetchUserQuery={refetchUserQuery}
          />
        ) : (
          <div>No categories</div>
        )}
      </div>
      <div className={classes.transactions}>
        <TransactionCategoryTable transactions={transactions} />
      </div>
    </div>
  );
};

export default Categories;
