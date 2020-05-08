import React from "react";
import {
  Typography,
  Button,
  Theme,
  makeStyles,
  createStyles,
  IconButton,
} from "@material-ui/core";
import { ArrowLeft, ArrowRight, Refresh } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      width: "80vw",
      margin: 20,
    },
    year: {
      display: "flex",
      width: "20%",
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 10,
      alignItems: "center",
    },

    yearText: {
      fontSize: "1.2em",
      backgroundColor: theme.palette.grey[600],
      borderRadius: 8,
      flex: 1,
    },
    icons: {
      fontSize: "3em",
    },
    refreshIcon: {
      fontSize: "1.5em",
    },
    update: {
      display: "flex",
      alignItems: "center",
    },
    updateText: {
      display: "fled",
      flexDirection: "column",
      alignItems: "center",
      marginRight: 15,
    },
  })
);

interface ICashFlowHeaderProps {
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}

export const CashFlowHeader: React.FC<ICashFlowHeaderProps> = (props) => {
  const classes = useStyles();

  const handleYearChange = (click: string) => {
    if (click === "left") {
      props.setSelectedYear(props.selectedYear - 1);
    } else {
      props.setSelectedYear(props.selectedYear + 1);
    }
  };
  const handleRefresh = () => {
    console.log("CFH 70: refresh clicked");
  };
  return (
    <div className={classes.root}>
      <div className={classes.year}>
        <ArrowLeft
          className={classes.icons}
          onClick={() => {
            handleYearChange("left");
          }}
        />
        <Typography
          variant="button"
          align="center"
          className={classes.yearText}
        >
          {props.selectedYear}
        </Typography>
        <ArrowRight
          className={classes.icons}
          onClick={() => {
            handleYearChange("right");
          }}
        />
      </div>
      <div className={classes.update}>
        <div className={classes.updateText}>
          <Typography variant="body2">Last Update on:</Typography>
          <Typography variant="body2" align="center">
            DATE...
          </Typography>
        </div>
        <IconButton aria-label="refresh">
          <Refresh className={classes.refreshIcon} onClick={handleRefresh} />
        </IconButton>
      </div>
    </div>
  );
};
