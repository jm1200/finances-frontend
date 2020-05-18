import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import numeral from "numeral";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "100%",
    },
    table: {
      width: "100%",
    },
    th: {
      backgroundColor: "#9A403E",
    },
    category: {
      backgroundColor: "#9A403E",
      borderWidth: 4,
      borderTopStyle: "solid",
      borderColor: theme.palette.grey[800],
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
    borderTop: {
      borderWidth: 4,
      borderTopStyle: "solid",
      borderColor: theme.palette.grey[800],
    },
  })
);

interface IBudgetAveragesTableProps {
  displayData: any;
}

export const BudgetAveragesTable: React.FC<IBudgetAveragesTableProps> = (
  props
) => {
  const classes = useStyles();
  console.log("BT 54", props.displayData);
  return (
    <TableContainer className={classes.paper} component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.th}>Category</TableCell>
            <TableCell className={classes.th}>Sub-Category</TableCell>
            <TableCell className={classes.th} align="center">
              Running Average
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.displayData.map((categoryRow: any) => {
            return (
              <React.Fragment key={categoryRow.categoryName}>
                <TableRow>
                  <TableCell
                    className={classes.category}
                    rowSpan={categoryRow.subCategoryLength + 1}
                  >
                    {categoryRow.categoryName}
                  </TableCell>
                </TableRow>
                {categoryRow.subCategories.map((row: any, index: number) => {
                  return (
                    <TableRow
                      key={row.subCategoryId}
                      className={index === 0 ? classes.borderTop : ""}
                    >
                      <TableCell className={classes.subCategory}>
                        {row.subCategoryName}
                      </TableCell>
                      <TableCell className={classes.monthCell}>
                        {numeral(Math.abs(row.avg)).format("$0,0.00")}
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
