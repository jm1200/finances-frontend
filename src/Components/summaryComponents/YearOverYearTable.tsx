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

const useStyles = makeStyles({
  paper: {
    width: 600,
  },
  table: {
    width: 600,
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

interface IYearOverYearTableProps {
  displayData: any;
}

const getTotal = (obj: any) => {
  let arr = [
    obj.Jan,
    obj.Feb,
    obj.Mar,
    obj.Apr,
    obj.May,
    obj.Jun,
    obj.Jul,
    obj.Aug,
    obj.Sep,
    obj.Oct,
    obj.Nov,
    obj.Dec,
  ];
  return arr.map((x) => numeral(x).value()).reduce((a, b) => a + b, 0);
};

export const YearOverYearTable: React.FC<IYearOverYearTableProps> = (props) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.paper} component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.th}>Category</TableCell>
            <TableCell className={classes.th}>Sub-Category</TableCell>
            <TableCell className={classes.th} align="center">
              2019
            </TableCell>
            <TableCell className={classes.th} align="center">
              2020
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

                  <TableCell className={classes.subCategoryTotal}>
                    {categoryRow.subCategoryName}
                  </TableCell>
                  {categoryRow.years.map((year: any) => {
                    return (
                      <TableCell
                        key={year.year}
                        className={classes.monthCellTotal}
                        align="center"
                      >
                        {numeral(year.amount).format("$0,0.00")}
                      </TableCell>
                    );
                  })}
                </TableRow>
                {categoryRow.subCategories.map((row: any) => {
                  return (
                    <TableRow key={row.subCategoryId}>
                      <TableCell className={classes.subCategory}>
                        {row.subCategoryName}
                      </TableCell>
                      {row.years.map((year: any) => {
                        return (
                          <TableCell
                            key={year.year}
                            className={classes.monthCell}
                            align="center"
                          >
                            {numeral(year.amount).format("$0,0.00")}
                          </TableCell>
                        );
                      })}
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
