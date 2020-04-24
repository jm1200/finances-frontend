import React from "react";
import { useUserQuery, UserQuery } from "../generated/graphql";
import { CategoryListRoot } from "../Components/categoriesComponents/CategoryListRoot";
import { TransactionCategoryTableRoot } from "../Components/categoriesComponents/TransactionCategoryTableRoot";

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

  // let categories: UserQuery["user"]["categories"] = [];
  // let transactions: UserQuery["user"]["transactions"] = [];
  // let subCategories: UserQuery["user"]["subCategories"] = [];

  // if (data && data.user) {
  //   categories = data.user.categories;
  //   categories.sort((a, b) => {
  //     if (b.name > a.name) return -1;
  //     if (a.name < b.name) return 1;
  //     return 0;
  //   });
  //   transactions = data.user.transactions;
  //   subCategories = data.user.subCategories;
  // }
  return (
    <div className={classes.root}>
      <div className={classes.categories}>
        {/* {loading ? <div>Loading..</div> : null}
        {categories && !loading ? ( */}
        <CategoryListRoot
        // categories={categories}
        // refetchUserQuery={refetchUserQuery}
        />
      </div>
      <div className={classes.transactions}>
        <TransactionCategoryTableRoot />
      </div>
    </div>
  );
};

export default Categories;
