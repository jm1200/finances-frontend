import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import DatePicker from "../Components/shared/DatePicker";

interface ICategoriesTotalsProps {}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    sidebar: {
      minWidth: 200,
      maxWidth: 350,
    },
    main: {
      marginLeft: 15,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const CategoriesTotals: React.FC<ICategoriesTotalsProps> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <DatePicker />
      </div>
      <div className={classes.main}>
        <h1>CategoriesTotals Component</h1>
      </div>
    </div>
  );
};

export default CategoriesTotals;
