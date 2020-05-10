import React from "react";
import CategoryList from "./CategoryList";
import { useGetUserCategoriesQuery } from "../../generated/graphql";
import { createStyles, Theme, makeStyles, Paper } from "@material-ui/core";
import { MonthPicker } from "../shared/MonthPicker";

interface ICategoryListRootProps {
  selectedMonth: string;
  selectedYear: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    monthPicker: {
      marginBottom: 15,
      padding: 20,
      maxHeight: 280,
    },
  })
);

export const CategoryListRoot: React.FC<ICategoryListRootProps> = (props) => {
  const classes = useStyles();
  const {
    data,
    loading,
    error,
    refetch: refetchCategories,
  } = useGetUserCategoriesQuery();

  if (loading) {
    return <div>Loading Categories...</div>;
  } else if (error) {
    console.log(error);
    return <div>There was an error Loading Categories</div>;
  } else if (!data) {
    return <div>No data!</div>;
  } else {
    return (
      <div className={classes.root}>
        <Paper component="div" className={classes.monthPicker}>
          <MonthPicker
            selectedMonth={props.selectedMonth}
            selectedYear={props.selectedYear}
            setSelectedMonth={props.setSelectedMonth}
            setSelectedYear={props.setSelectedYear}
          />
        </Paper>
        <div>
          <CategoryList
            categories={data.getUserCategories}
            refetchCategories={refetchCategories}
          />
        </div>
      </div>
    );
  }
};
