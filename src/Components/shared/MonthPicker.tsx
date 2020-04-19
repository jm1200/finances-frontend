import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";

interface IMonthPickerProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    year: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 10,
      alignItems: "center",
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
    yearText: {
      fontSize: "1.2em",
      backgroundColor: theme.palette.grey[600],
      borderRadius: 8,
      flex: 1,
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

const MonthPicker: React.FC<IMonthPickerProps> = (props) => {
  const classes = useStyles();
  const [selectedMonth, setSelectedMonth] = React.useState("Apr");
  const [selectedYear, setSelectedYear] = React.useState(2020);

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
  };

  const handleYearChange = (click: string) => {
    if (click === "left") {
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedYear(selectedYear + 1);
    }
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
          {selectedYear}
        </Typography>
        <ArrowRight
          className={classes.icons}
          onClick={() => {
            handleYearChange("right");
          }}
        />
      </div>
      <div className={classes.month}>
        {MONTHS.map((month) => {
          return (
            <Typography
              variant="button"
              component="div"
              key={month}
              className={`${classes.cell} ${
                month === selectedMonth ? classes.active : ""
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

export default MonthPicker;