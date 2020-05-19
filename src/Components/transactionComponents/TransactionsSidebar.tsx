import React from "react";
import { DatePicker } from "../shared/DatePicker";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    datePicker: {
      marginBottom: 5,
      height: 400,
    },
    filter: {
      marginTop: 5,
    },
  })
);

interface ITransactionsSidebarProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filterByDate: boolean;
  setFilterByDate: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMonth: string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}

export const TransactionsSidebar: React.FC<ITransactionsSidebarProps> = (
  props
) => {
  const classes = useStyles();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    props.setFilter(e.target.value as string);
  };

  const handleFilterByDateCheckBox = () => {
    props.setFilterByDate(!props.filterByDate);
  };
  return (
    <div className={classes.root}>
      <div className={classes.filter}>
        <TextField
          name="filter"
          label="Filter Transactions"
          value={props.filter}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className={classes.datePicker}>
        <FormControlLabel
          value={props.filterByDate}
          control={
            <Checkbox color="primary" onChange={handleFilterByDateCheckBox} />
          }
          label="Filter By Date:"
          labelPlacement="start"
        />

        {props.filterByDate ? (
          <DatePicker
            selectedMonth={props.selectedMonth}
            setSelectedMonth={props.setSelectedMonth}
            selectedYear={props.selectedYear}
            setSelectedYear={props.setSelectedYear}
          />
        ) : null}
      </div>
    </div>
  );
};
