import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { UserQuery } from "../../generated/graphql";
import { getTransCatDataForTable } from "./utils/transCatDataTable";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
interface ITransactionCategoryTableProps {
  transactions: UserQuery["user"]["transactions"];
}

export default function TransactionCategoryTable(
  props: ITransactionCategoryTableProps
) {
  const classes = useStyles();

  let data = getTransCatDataForTable(props.transactions);
  console.log(data);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Memo</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Sub Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any) => (
            <TableRow key={row.memo}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.memo}</TableCell>
              <TableCell>{row.categoryName}</TableCell>
              <TableCell>{row.subCategoryName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
