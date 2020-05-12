import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },

    month: {
      display: "grid",
      gridTemplateColumns: "30% 30% 30%",
      gridTemplateRows: "30px 30px 30px 30px",
      rowGap: "15px",
      columnGap: "15px",
      minHeight: 500,
    },
    cell: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      borderRadius: 8,
      backgroundColor: theme.palette.grey[600],
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },
    active: {
      backgroundColor: theme.palette.primary.light,
    },

    icons: {
      fontSize: "2.5em",
    },
  })
);

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface IMonthPickerProps {
  selectedMonth: string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
}

export const MonthPicker: React.FC<IMonthPickerProps> = (
  props: IMonthPickerProps
) => {
  const classes = useStyles();

  const handleMonthChange = (month: string) => {
    props.setSelectedMonth(month);
  };

  return (
    <div className={classes.root}>
      <div className={classes.month}>
        {MONTHS.map((month) => {
          return (
            <Typography
              variant="button"
              component="div"
              key={month}
              className={`${classes.cell} ${
                month === props.selectedMonth ? classes.active : ""
              }`}
              onClick={() => {
                handleMonthChange(month);
              }}
            >
              {month}
            </Typography>
          );
        })}
      </div>
    </div>
  );
};
