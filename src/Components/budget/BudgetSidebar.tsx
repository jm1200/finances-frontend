import React from "react";
import {
  FormControl,
  MenuItem,
  FormControlLabel,
  InputLabel,
  Select,
  Button,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import numeral from "numeral";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { MyTextField } from "../MyTextField";
import { GetUserBudgetsQuery } from "../../generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    optionsForm: {
      margin: 2,
    },
    totals: {
      marginTop: 15,
    },
    total: {
      fontSize: "1.5em",
    },
    saveBudgetForm: {
      margin: 2,
    },
  })
);

const validationSchema = yup.object({
  name: yup.string().required(),
});
interface IBudgetSidebarProps {
  book: string;
  setBook: React.Dispatch<React.SetStateAction<string>>;
  timeFrame: number;
  setTimeFrame: React.Dispatch<React.SetStateAction<number>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  averagesTotal: number;
  budgetTotal: number;
  budget: string;
  setBudget: React.Dispatch<React.SetStateAction<string>>;
  availableBudgets: GetUserBudgetsQuery["getUserBudgets"];
}

export const BudgetSidebar: React.FC<IBudgetSidebarProps> = (props) => {
  const classes = useStyles();

  console.log("BS61", props.availableBudgets);
  return (
    <div className={classes.root}>
      <div className={classes.totals}>
        <p className={classes.total}>
          Averages total cash flow:{" "}
          {numeral(props.averagesTotal).format("$0,0.00")}
        </p>
        <p className={classes.total}>
          Budgeted total cash flow:
          {numeral(props.budgetTotal).format("$0,0.00")}
        </p>
      </div>
      <div className={classes.optionsForm}>
        <form onSubmit={props.handleSubmit}>
          <FormControl className={classes.formControl}>
            <InputLabel id="book">Book</InputLabel>
            <Select
              labelId="bookLabel"
              id="bookSelect"
              value={props.book}
              onChange={(e) => props.setBook(e.target.value as string)}
            >
              <MenuItem value={"Home"}>Home</MenuItem>
              <MenuItem value={"377 Hyde Park Rd."}>377 Hyde Park Rd.</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="loadBudgetId">Load Budget</InputLabel>
            <Select
              labelId="loadBudgetLabelId"
              id="loadBudgetSelectId"
              value={props.budget}
              onChange={(e) => props.setBudget(e.target.value as string)}
            >
              <MenuItem value={"Default Budget"}>Default Budget</MenuItem>
              {props.availableBudgets.map((budget) => (
                <MenuItem key={budget.id} value={budget.id}>
                  {budget.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              Rolling Average
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.timeFrame}
              onChange={(e) => props.setTimeFrame(e.target.value as number)}
            >
              <MenuItem value={1}>1 Month</MenuItem>
              <MenuItem value={2}>2 Months</MenuItem>
              <MenuItem value={3}>3 Months</MenuItem>
              <MenuItem value={4}>4 Months</MenuItem>
              <MenuItem value={6}>6 Months</MenuItem>
              <MenuItem value={12}>12 Months</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" type="submit">
            Get Averages
          </Button>
        </form>
      </div>
    </div>
  );
};
