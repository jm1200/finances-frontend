import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { GetUserSubCategoriesQuery } from "../../generated/graphql";

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
    color: "black",
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

interface ICashFlowAnalysisTableProps {
  displayData: GetUserSubCategoriesQuery["getUserSubCategories"];
}

export const CashFlowAnalysisTable: React.FC<ICashFlowAnalysisTableProps> = (
  props
) => {
  const classes = useStyles();
  console.log("CFAT 26", props.displayData);
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
          {props.displayData.map((categoryRow: any) => {
            return (
              <React.Fragment key={categoryRow.categoryId}>
                <TableRow>
                  <TableCell
                    className={classes.category}
                    rowSpan={categoryRow.subCategoryLength + 1}
                  >
                    {categoryRow.categoryName}
                  </TableCell>

                  <TableCell className={classes.subCategoryTotal}>
                    {categoryRow.subCategoryName}
                  </TableCell>
                  <TableCell className={classes.monthCellTotal} align="center">
                    {categoryRow.Jan}
                  </TableCell>
                  <TableCell className={classes.monthCellTotal} align="center">
                    {categoryRow.Feb}
                  </TableCell>
                  <TableCell className={classes.monthCellTotal} align="center">
                    {categoryRow.Mar}
                  </TableCell>
                  <TableCell className={classes.monthCellTotal} align="center">
                    {categoryRow.Apr}
                  </TableCell>
                  <TableCell className={classes.monthCellTotal} align="center">
                    {categoryRow.May}
                  </TableCell>
                  <TableCell className={classes.monthCellTotal} align="center">
                    {categoryRow.Jun}
                  </TableCell>
                  <TableCell className={classes.monthCellTotal} align="center">
                    {categoryRow.Jul}
                  </TableCell>
                  <TableCell className={classes.monthCellTotal} align="center">
                    {categoryRow.Aug}
                  </TableCell>
                  <TableCell className={classes.monthCellTotal} align="center">
                    {categoryRow.Sep}
                  </TableCell>
                  <TableCell className={classes.monthCellTotal} align="center">
                    {categoryRow.Oct}
                  </TableCell>
                  <TableCell className={classes.monthCellTotal} align="center">
                    {categoryRow.Nov}
                  </TableCell>
                  <TableCell className={classes.monthCellTotal} align="center">
                    {categoryRow.Dec}
                  </TableCell>
                  <TableCell
                    className={classes.calculationTotal}
                    align="center"
                  >
                    {categoryRow.low}
                  </TableCell>
                  <TableCell
                    className={classes.calculationTotal}
                    align="center"
                  >
                    {categoryRow.high}
                  </TableCell>
                  <TableCell
                    className={classes.calculationTotal}
                    align="center"
                  >
                    {categoryRow.avg}
                  </TableCell>
                  <TableCell
                    className={classes.calculationTotal}
                    align="center"
                  >
                    {categoryRow.med}
                  </TableCell>
                </TableRow>
                {categoryRow.subCategories.map((row: any) => {
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
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
