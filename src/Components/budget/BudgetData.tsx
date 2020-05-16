import React from "react";
import { BudgetTable } from "./BudgetTable";
import { useGetUserTransactionsForBudgetLazyQuery } from "../../generated/graphql";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  FormControl,
  MenuItem,
  FormControlLabel,
  InputLabel,
  Select,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    sidebar: {
      width: 300,
    },
    averages: {
      width: 300,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

interface IBudgetDataProps {}

export const BudgetData: React.FC<IBudgetDataProps> = (props) => {
  const classes = useStyles();
  const [book, setBook] = React.useState("Home");
  const [timeFrame, setTimeFrame] = React.useState(2);
  const [
    getTransactionsForBudget,
    { data: averagesData, loading: averagesLoading, error: averagesError },
  ] = useGetUserTransactionsForBudgetLazyQuery();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getTransactionsForBudget({
      variables: {
        selectedTimeFrame: timeFrame,
        book,
      },
    });
  };
  return (
    <div>
      <div className={classes.sidebar}>
        <form onSubmit={handleSubmit}>
          <FormControl className={classes.formControl}>
            <InputLabel id="book">Book</InputLabel>
            <Select
              labelId="bookLabel"
              id="bookSelect"
              value={book}
              onChange={(e) => setBook(e.target.value as string)}
            >
              <MenuItem value={"Home"}>Home</MenuItem>
              <MenuItem value={"377 Hyde Park Rd."}>377 Hyde Park Rd.</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              Rolling Average
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value as number)}
            >
              <MenuItem value={1}>1 Month</MenuItem>
              <MenuItem value={2}>2 Month</MenuItem>
              <MenuItem value={3}>3 Month</MenuItem>
              <MenuItem value={4}>4 Month</MenuItem>
              <MenuItem value={5}>5 Month</MenuItem>
              <MenuItem value={6}>6 Month</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" type="submit">
            Get Averages
          </Button>
        </form>
      </div>
      <div className={classes.averages}>
        {averagesLoading && <div>Loading rental Data...</div>}
        {averagesError && <div>error loading rental data</div>}
        {!averagesData ||
          (!averagesData.getUserTransactionsForBudget && (
            <div>No rental data!</div>
          ))}
        {averagesData?.getUserTransactionsForBudget && (
          <div>
            <br />
            <BudgetTable
              displayData={averagesData.getUserTransactionsForBudget}
            />
          </div>
        )}
      </div>
    </div>
  );
};
