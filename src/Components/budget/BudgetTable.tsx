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
import { GetUserTransactionsForBudgetQuery } from "../../generated/graphql";
import { InitialInputState } from "./BudgetData";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { MyTextField } from "../MyTextField";
import { Button } from "@material-ui/core";

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
    saveBudgetForm: {
      margin: 2,
    },
  })
);

const validationSchema = yup.object({
  name: yup.string().required(),
});

interface IBudgetTableProps {
  displayData: GetUserTransactionsForBudgetQuery["getUserTransactionsForBudget"];
  setBudgetTotal: any;
  //initialInputValues: InitialInputState;
  saveBudget: (
    values: { name: string },
    inputValues: InitialInputState
  ) => void;
}

export const BudgetTable: React.FC<IBudgetTableProps> = (props) => {
  const classes = useStyles();

  const inputInitialState: InitialInputState = {};
  props.displayData.forEach((category) => {
    category.subCategories.forEach((subCategory) => {
      inputInitialState[subCategory.subCategoryId] = {
        id: subCategory.subCategoryId,
        name: subCategory.subCategoryName,
        value: numeral(subCategory.inputValue).format("$0,0.00"),
      };
    });
  });

  const [input, setInput] = React.useState<InitialInputState>(
    inputInitialState
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    subCategoryId: string,
    subCategoryName: string
  ) => {
    e.persist();
    setInput((previousState) => {
      let newState = Object.assign(
        {},
        { ...previousState },
        {
          [e.target.id]: {
            id: subCategoryId,
            name: subCategoryName,
            value: e.target.value,
          },
        }
      );
      return newState;
    });
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      let budgetTotal = Object.keys(input!).reduce((acc, cur) => {
        return (acc += numeral(input![cur].value).value());
      }, 0);
      props.setBudgetTotal(budgetTotal);
    }, 500);
  };

  return (
    <>
      <div className={classes.saveBudgetForm}>
        <p>Save Budget your budget</p>
        <Formik
          initialValues={{ name: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);

            props.saveBudget(values, input!);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <div>
                  <MyTextField placeholder="Budget Title:" name="name" />
                </div>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
      <TableContainer className={classes.paper} component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.th}>Category</TableCell>
              <TableCell className={classes.th}>Sub-Category</TableCell>
              <TableCell className={classes.th} align="center">
                Target Amount
              </TableCell>
              <TableCell className={classes.th} align="center">
                Rolling Average
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
                          <input
                            id={row.subCategoryId}
                            onChange={(e) =>
                              handleChange(
                                e,
                                row.subCategoryId,
                                row.subCategoryName
                              )
                            }
                            onBlur={handleOnBlur}
                            value={input![row.subCategoryId].value}
                          />
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
    </>
  );
};
