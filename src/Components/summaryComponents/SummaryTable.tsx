import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  th: {
    backgroundColor: "#9A403E",
  },
  category: {
    backgroundColor: "#9A403E",
  },
  subCategory: {
    backgroundColor: "#D07C7A",
  },
  subCategoryTotal: {
    backgroundColor: "#C0504D",
  },
  monthCell: {
    backgroundColor: "#DFA7A6",
  },
  monthCellTotal: {
    backgroundColor: "",
  },
  calculation: {
    backgroundColor: "LightGrey",
    color: "black",
  },
  calculationTotal: {
    backgroundColor: "grey",
  },
});

interface ISummaryTableProps {
  displayData: any;
  name: string;
}

export const SummaryTable: React.FC<ISummaryTableProps> = (props) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.th}>Category</TableCell>
            <TableCell className={classes.th}>Sub-Category</TableCell>
            <TableCell className={classes.th} align="center">
              Jan
            </TableCell>
            <TableCell className={classes.th} align="center">
              Feb
            </TableCell>
            <TableCell className={classes.th} align="center">
              Mar
            </TableCell>
            <TableCell className={classes.th} align="center">
              Apr
            </TableCell>
            <TableCell className={classes.th} align="center">
              May
            </TableCell>
            <TableCell className={classes.th} align="center">
              Jun
            </TableCell>
            <TableCell className={classes.th} align="center">
              Jul
            </TableCell>
            <TableCell className={classes.th} align="center">
              Aug
            </TableCell>
            <TableCell className={classes.th} align="center">
              Sep
            </TableCell>
            <TableCell className={classes.th} align="center">
              Oct
            </TableCell>
            <TableCell className={classes.th} align="center">
              Nov
            </TableCell>
            <TableCell className={classes.th} align="center">
              Dec
            </TableCell>
            <TableCell className={classes.th} align="center">
              Low
            </TableCell>
            <TableCell className={classes.th} align="center">
              High
            </TableCell>
            <TableCell className={classes.th} align="center">
              Average
            </TableCell>
            <TableCell className={classes.th} align="center">
              Median
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <React.Fragment key={props.displayData.categoryId}>
            <TableRow>
              <TableCell
                className={classes.category}
                rowSpan={props.displayData.subCategoryLength + 1}
              >
                {props.name}
              </TableCell>

              <TableCell className={classes.subCategoryTotal}>
                {props.displayData.subCategoryName}
              </TableCell>
              <TableCell className={classes.monthCellTotal} align="center">
                {props.displayData.Jan}
              </TableCell>
              <TableCell className={classes.monthCellTotal} align="center">
                {props.displayData.Feb}
              </TableCell>
              <TableCell className={classes.monthCellTotal} align="center">
                {props.displayData.Mar}
              </TableCell>
              <TableCell className={classes.monthCellTotal} align="center">
                {props.displayData.Apr}
              </TableCell>
              <TableCell className={classes.monthCellTotal} align="center">
                {props.displayData.May}
              </TableCell>
              <TableCell className={classes.monthCellTotal} align="center">
                {props.displayData.Jun}
              </TableCell>
              <TableCell className={classes.monthCellTotal} align="center">
                {props.displayData.Jul}
              </TableCell>
              <TableCell className={classes.monthCellTotal} align="center">
                {props.displayData.Aug}
              </TableCell>
              <TableCell className={classes.monthCellTotal} align="center">
                {props.displayData.Sep}
              </TableCell>
              <TableCell className={classes.monthCellTotal} align="center">
                {props.displayData.Oct}
              </TableCell>
              <TableCell className={classes.monthCellTotal} align="center">
                {props.displayData.Nov}
              </TableCell>
              <TableCell className={classes.monthCellTotal} align="center">
                {props.displayData.Dec}
              </TableCell>
              <TableCell className={classes.calculationTotal} align="center">
                {props.displayData.low}
              </TableCell>
              <TableCell className={classes.calculationTotal} align="center">
                {props.displayData.high}
              </TableCell>
              <TableCell className={classes.calculationTotal} align="center">
                {props.displayData.avg}
              </TableCell>
              <TableCell className={classes.calculationTotal} align="center">
                {props.displayData.med}
              </TableCell>
            </TableRow>
            {props.displayData.subCategories.map((row: any) => {
              return (
                <TableRow key={row.subCategoryId}>
                  <TableCell className={classes.subCategory}>
                    {row.subCategoryName}
                  </TableCell>
                  <TableCell className={classes.monthCell} align="center">
                    {row.Jan}
                  </TableCell>
                  <TableCell className={classes.monthCell} align="center">
                    {row.Feb}
                  </TableCell>
                  <TableCell className={classes.monthCell} align="center">
                    {row.Mar}
                  </TableCell>
                  <TableCell className={classes.monthCell} align="center">
                    {row.Apr}
                  </TableCell>
                  <TableCell className={classes.monthCell} align="center">
                    {row.May}
                  </TableCell>
                  <TableCell className={classes.monthCell} align="center">
                    {row.Jun}
                  </TableCell>
                  <TableCell className={classes.monthCell} align="center">
                    {row.Jul}
                  </TableCell>
                  <TableCell className={classes.monthCell} align="center">
                    {row.Aug}
                  </TableCell>
                  <TableCell className={classes.monthCell} align="center">
                    {row.Sep}
                  </TableCell>
                  <TableCell className={classes.monthCell} align="center">
                    {row.Oct}
                  </TableCell>
                  <TableCell className={classes.monthCell} align="center">
                    {row.Nov}
                  </TableCell>
                  <TableCell className={classes.monthCell} align="center">
                    {row.Dec}
                  </TableCell>
                  <TableCell className={classes.calculation} align="center">
                    {row.low}
                  </TableCell>
                  <TableCell className={classes.calculation} align="center">
                    {row.high}
                  </TableCell>
                  <TableCell className={classes.calculation} align="center">
                    {row.avg}
                  </TableCell>
                  <TableCell className={classes.calculation} align="center">
                    {row.med}
                  </TableCell>
                </TableRow>
              );
            })}
          </React.Fragment>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
