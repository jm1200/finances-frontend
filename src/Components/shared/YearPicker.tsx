import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 10,
      alignItems: "center",
    },
    icons: {
      fontSize: "3em",
    },
    yearText: {
      fontSize: "1.2em",
      backgroundColor: theme.palette.grey[600],
      borderRadius: 8,
      flex: 1,
    },
  })
);

interface IYearPickerProps {
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}

export const YearPicker: React.FC<IYearPickerProps> = (props) => {
  const classes = useStyles();

  const handleYearChange = (click: string) => {
    if (click === "left") {
      props.setSelectedYear(props.selectedYear - 1);
    } else {
      props.setSelectedYear(props.selectedYear + 1);
    }
  };

  return (
    <div className={classes.root}>
      <ArrowLeft
        className={classes.icons}
        onClick={() => {
          handleYearChange("left");
        }}
      />
      <Typography variant="button" align="center" className={classes.yearText}>
        {props.selectedYear}
      </Typography>
      <ArrowRight
        className={classes.icons}
        onClick={() => {
          handleYearChange("right");
        }}
      />
    </div>
  );
};
