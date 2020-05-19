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
import {
  GetUserTransactionsForBudgetQuery,
  useDeleteBudgetMutation,
  GetUserBudgetsQuery,
} from "../../generated/graphql";
import { InitialInputState } from "./BudgetData";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { MyTextField } from "../MyTextField";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      backgroundColor: theme.palette.background.paper,
      padding: 15,
      borderRadius: 5,
    },

    table: {
      marginLeft: 20,
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
    budgetOptions: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: 300,
    },
    saveBudgetForm: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      border: "1px solid lightGrey",
      borderRadius: 5,
      padding: 15,
    },
    deleteBudgetForm: {
      display: "flex",
      flexDirection: "column",
      marginTop: 30,
      width: "100%",
      border: "1px solid lightGrey",
      borderRadius: 5,
      padding: 15,
    },
    form: {
      width: "100%",
    },
    formLabel: {
      width: "100%",
    },
    formButton: { marginTop: 10 },
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
  availableBudgets: GetUserBudgetsQuery["getUserBudgets"];
  refetchBudget: any;
}

export const BudgetTable: React.FC<IBudgetTableProps> = (props) => {
  const classes = useStyles();
  const [budget, setBudget] = React.useState("");
  const [deleteBudget] = useDeleteBudgetMutation();
  const handleDeleteBudget = async () => {
    await deleteBudget({ variables: { budgetId: budget } });
    await props.refetchBudget();
  };

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

  // const handleOnBlur = () => {
  // setTimeout(() => {
  //   let budgetTotal = Object.keys(input!).reduce((acc, cur) => {
  //     return (acc += numeral(input![cur].value).value());
  //   }, 0);
  //   props.setBudgetTotal(budgetTotal);
  // }, 500);
  // };

  React.useEffect(() => {
    let budgetTotal = Object.keys(input!).reduce((acc, cur) => {
      return (acc += numeral(input![cur].value).value());
    }, 0);
    props.setBudgetTotal(budgetTotal);
  }, [props, input]);

  return (
    <div className={classes.root}>
      <div className={classes.budgetOptions}>
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
              <Form className={classes.saveBudgetForm}>
                <div className={classes.formLabel}>
                  <p>Save your budget</p>
                </div>
                <div className={classes.form}>
                  <MyTextField placeholder="Budget Title:" name="name" />
                </div>
                <div className={classes.formButton}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    variant="contained"
                    type="submit"
                    size="small"
                  >
                    Save Budget
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>

        <div className={classes.deleteBudgetForm}>
          <div className={classes.formLabel}>
            <p>Delete an old budget</p>
          </div>
          <div className={classes.form}>
            <FormControl className={classes.form}>
              <InputLabel id="deleteBudgetId">Delete Budget</InputLabel>
              <Select
                labelId="deleteBudgetLabelId"
                id="deleteBudgetSelectId"
                value={budget}
                onChange={(e) => setBudget(e.target.value as string)}
              >
                {props.availableBudgets.map((budget) => (
                  <MenuItem key={budget.id} value={budget.id}>
                    {budget.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={classes.formButton}>
            <Button
              color="primary"
              size="small"
              variant="contained"
              onClick={handleDeleteBudget}
            >
              Delete Budget
            </Button>
          </div>
        </div>
      </div>

      <TableContainer className={classes.table} component={Paper}>
        <Table size="small" aria-label="a dense table">
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
                            // onBlur={handleOnBlur}
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
    </div>
  );
};
