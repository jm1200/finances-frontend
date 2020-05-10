import React, { Dispatch, SetStateAction } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  GetUserCategoriesQuery,
  GetTransactionsByMonthQuery,
  useUpdateCategoriesInTransactionsMutation,
} from "../../generated/graphql";
import { Edit, Cancel, CheckCircle } from "@material-ui/icons";
import CategorySelect from "./CategorySelect";
import SubCategorySelect from "./SubCategorySelect";
import {
  TextField,
  Tooltip,
  Checkbox,
  Toolbar,
  FormControlLabel,
} from "@material-ui/core";
import numeral from "numeral";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      width: "100%",
    },
    updateOptions: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    check: {
      color: theme.palette.success.main,
    },
    checkAll: {
      color: theme.palette.warning.main,
    },
    cancel: {
      color: theme.palette.error.main,
      marginLeft: 7,
    },
    // edit: {
    //   width: 100,
    // },
  })
);

interface ITransactionCategoryTableProps {
  data: GetTransactionsByMonthQuery["getTransactionsByMonth"];
  categoriesData: GetUserCategoriesQuery["getUserCategories"];
  refetch: any;
}

export function TransactionCategoryTable(
  props: ITransactionCategoryTableProps
) {
  console.log("TCT 60", props.data[0]);
  const classes = useStyles();
  const [note, setNote] = React.useState("");
  const [savedCategoryCheckBox, setSavedCategoryCheckBox] = React.useState(
    true
  );
  const [amountCheckBox, setAmountCheckBox] = React.useState(false);
  const [editTransactionMode, setTransactionEditMode] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [subCategoryId, setSubCategoryId] = React.useState("");
  const [uncategorizedCheckBox, setUncategorizedCheckBox] = React.useState(
    false
  );

  const [
    updateCategoriesInTransactions,
  ] = useUpdateCategoriesInTransactionsMutation();

  const subCategoriesMap: any = {};

  props.categoriesData.forEach((category) => {
    subCategoriesMap[category.id] = category.subCategories;
  });

  const handleSavedCategoryCheckBox = () => {
    setSavedCategoryCheckBox(!!!savedCategoryCheckBox);
  };

  const handleAmountCheckBox = () => {
    setAmountCheckBox(!amountCheckBox);
  };

  const handleEditTransactionMode = (row: any) => {
    setTransactionEditMode(row.id);
    setCategoryId(row.category!.id);
    setSubCategoryId(row.subCategory!.id);
    setNote(row.note || "");
    setSavedCategoryCheckBox(!!row.savedCategory && !!row.savedCategory.id);
    setAmountCheckBox(
      !!row.savedCategory && row.savedCategory.amounts.length > 0
    );
  };

  const handleCancelTransactionMode = () => {
    setTransactionEditMode("");
    setCategoryId("");
    setSubCategoryId("");
    setNote("");
    setSavedCategoryCheckBox(false);
    setAmountCheckBox(false);
  };

  const handleEditNote = (e: any) => {
    setNote(e.target.value);
  };

  const handleUpdateTransactionCategory = async (row: any) => {
    let savedCategoryId,
      savedCategoryAmounts = null;
    if (row.savedCategory) {
      savedCategoryId = row.savedCategory.id;
      savedCategoryAmounts = row.savedCategory.amounts;
    }
    try {
      console.log("TCT115 amountcheckbox", amountCheckBox);
      await updateCategoriesInTransactions({
        variables: {
          id: row.id,
          name: row.name,
          memo: row.memo,
          book: row.book,
          amount: row.amount,
          savedCategoryId,
          savedCategoryAmounts,
          selectedCategoryId: categoryId,
          selectedSubCategoryId: subCategoryId,
          note,
          checkAmount: amountCheckBox,
          applyToAll: savedCategoryCheckBox,
        },
      });
    } catch (err) {
      console.log("TCT 157", err);
    }

    //
    handleCancelTransactionMode();

    props.refetch();
  };

  let data = props.data;

  if (data && uncategorizedCheckBox) {
    data = data.filter(
      (transaction) => transaction.category!.name === "uncategorized"
    );
  }

  return (
    <div>
      <Paper className={classes.table}>
        <EnhancedTableToolbar
          uncategorizedCheckBox={uncategorizedCheckBox}
          setUncategorizedCheckBox={setUncategorizedCheckBox}
        />
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Memo</TableCell>

                <TableCell>Amount</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Sub Category</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {moment(row.datePosted, "YYYYMMDD").format("MMM Do YYYY")}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.memo}</TableCell>

                  <TableCell align="right">
                    {numeral(row.amount).format("$0,0.00")}
                  </TableCell>
                  {editTransactionMode === row.id ? (
                    <>
                      <TableCell>
                        <TextField
                          label="Note"
                          id="outlined-size-small"
                          value={note}
                          variant="outlined"
                          size="small"
                          onChange={handleEditNote}
                        />
                      </TableCell>
                      <TableCell>
                        <CategorySelect
                          categories={props.categoriesData}
                          currentValue={categoryId}
                          setFunction={setCategoryId}
                          setSubCategoryFunction={setSubCategoryId}
                          subCategoriesMap={subCategoriesMap}
                        />
                      </TableCell>
                      <TableCell>
                        <SubCategorySelect
                          categories={subCategoriesMap[categoryId]}
                          currentValue={subCategoryId}
                          setFunction={setSubCategoryId}
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.updateOptions}>
                          <Tooltip title="Submit">
                            <CheckCircle
                              className={classes.check}
                              onClick={() =>
                                handleUpdateTransactionCategory(row)
                              }
                            />
                          </Tooltip>

                          <Tooltip title="Cancel">
                            <Cancel
                              className={classes.cancel}
                              onClick={handleCancelTransactionMode}
                            />
                          </Tooltip>
                          <Tooltip title="Apply to All">
                            <Checkbox
                              checked={savedCategoryCheckBox}
                              onClick={() => handleSavedCategoryCheckBox()}
                              color="primary"
                              inputProps={{
                                "aria-label": "secondary checkbox",
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Check Amount">
                            <Checkbox
                              checked={amountCheckBox}
                              onClick={() => handleAmountCheckBox()}
                              color="primary"
                              inputProps={{
                                "aria-label": "secondary checkbox",
                              }}
                            />
                          </Tooltip>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{row.note}</TableCell>
                      {/* TODO figure out why row.category is null sometimes */}
                      <TableCell>
                        {row.category ? row.category!.name : "ERROR!"}
                      </TableCell>
                      <TableCell>
                        {row.subCategory ? row.subCategory!.name : "Error!"}
                      </TableCell>

                      <TableCell>
                        <Edit onClick={() => handleEditTransactionMode(row)} />
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "flex-end",
    },
  })
);

interface IEnhancedToolBarProps {
  uncategorizedCheckBox: boolean;
  setUncategorizedCheckBox: Dispatch<SetStateAction<boolean>>;
}

function EnhancedTableToolbar(props: IEnhancedToolBarProps) {
  const classes = useToolbarStyles();

  const handleUncategorizedCheckBox = () => {
    props.setUncategorizedCheckBox(!props.uncategorizedCheckBox);
  };

  return (
    <Toolbar className={classes.root}>
      <FormControlLabel
        value={props.uncategorizedCheckBox}
        control={
          <Checkbox color="primary" onChange={handleUncategorizedCheckBox} />
        }
        label="Uncategorized only: "
        labelPlacement="start"
      />
    </Toolbar>
  );
}
