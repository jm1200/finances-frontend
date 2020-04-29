import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import numeral from "numeral";
import moment from "moment";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
interface DisplayData {
  name: string;
  memo: string;
  note?: string | null;
  amount: number;
  datePosted: string;
}

interface ISelectedCategoryTableProps {
  displayData: DisplayData[];
}

export const SelectedCategoryTable: React.FC<ISelectedCategoryTableProps> = (
  props
) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Memo</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.displayData.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>
                {moment(transaction.datePosted, "YYYYMMDD").format(
                  "MMM Do YYYY"
                )}
              </TableCell>
              <TableCell>{transaction.name}</TableCell>
              <TableCell>{transaction.memo}</TableCell>
              <TableCell>{transaction.note}</TableCell>
              <TableCell align="right">
                {numeral(transaction.amount).format("$0,0.00")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
