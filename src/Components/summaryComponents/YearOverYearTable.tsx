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
  name: string;
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
  console.log("YOYT 68", props.displayData);
  let displayData = {
    "2019": numeral(getTotal(props.displayData[0])).format("$0,0.00"),
    "2020": numeral(getTotal(props.displayData[1])).format("$0,0.00"),
    categoryId: "cashFlow",
    subCategoryName: "Cash Flow",
    subCategoryLength: 2,
    subCategories: [
      {
        "2019": numeral(getTotal(props.displayData[0].subCategories[0])).format(
          "$0,0.00"
        ),
        "2020": numeral(getTotal(props.displayData[1].subCategories[0])).format(
          "$0,0.00"
        ),
        subCategoryId: "Income",
        subCategoryName: "Income",
      },
      {
        "2019": numeral(getTotal(props.displayData[0].subCategories[1])).format(
          "$0,0.00"
        ),
        "2020": numeral(getTotal(props.displayData[1].subCategories[1])).format(
          "$0,0.00"
        ),
        subCategoryId: "Expenses",
        subCategoryName: "Expenses",
      },
    ],
  };
  console.log("YOYT90", displayData);
  return (
    <TableContainer className={classes.table} component={Paper}>
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
          <React.Fragment key={displayData.categoryId}>
            <TableRow>
              <TableCell
                className={classes.category}
                rowSpan={displayData.subCategoryLength + 1}
              >
                {props.name}
              </TableCell>

              <TableCell className={classes.subCategoryTotal}>
                {displayData.subCategoryName}
              </TableCell>
              <TableCell className={classes.monthCellTotal} align="center">
                {displayData["2019"]}
              </TableCell>
              <TableCell className={classes.monthCellTotal} align="center">
                {displayData["2020"]}
              </TableCell>
            </TableRow>
            {displayData.subCategories.map((row: any) => {
              return (
                <TableRow key={row.subCategoryId}>
                  <TableCell className={classes.subCategory}>
                    {row.subCategoryName}
                  </TableCell>
                  <TableCell className={classes.monthCell} align="center">
                    {row["2019"]}
                  </TableCell>
                  <TableCell className={classes.monthCell} align="center">
                    {row["2020"]}
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
