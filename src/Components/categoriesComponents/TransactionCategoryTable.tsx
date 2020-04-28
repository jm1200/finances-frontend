import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  lighten,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  useUpdateCategoriesInTransactionMutation,
  GetUserCategoriesQuery,
  GetTransactionsByMonthQuery,
  useUpdateCategoriesInAllTransactionsMutation,
  useCreateSavedCategoryMutation,
  useDeleteSavedCategoryMutation,
} from "../../generated/graphql";
import { Edit, Cancel, CheckCircle } from "@material-ui/icons";
import CategorySelect from "./CategorySelect";
import SubCategorySelect from "./SubCategorySelect";
import {
  Toolbar,
  Typography,
  Button,
  TextField,
  Tooltip,
  Checkbox,
} from "@material-ui/core";
import numeral from "numeral";

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
  const classes = useStyles();
  const [note, setNote] = React.useState("");
  const [savedCategoryCheckBox, setSavedCategoryCheckBox] = React.useState(
    false
  );
  const [editTransactionMode, setTransactionEditMode] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [subCategoryId, setSubCategoryId] = React.useState("");
  const [
    updateCategoriesInTransaction,
  ] = useUpdateCategoriesInTransactionMutation();
  const [
    updateCategoriesInAllTransactions,
  ] = useUpdateCategoriesInAllTransactionsMutation();
  const [
    createSavedCategory,
    { data: createSavedCategoryData },
  ] = useCreateSavedCategoryMutation();
  const [deleteSavedCategory] = useDeleteSavedCategoryMutation();
  // interface ISubCategoryMap {
  //   [key:string] : GetUserCategoriesQuery["getUserCategories"] | null | undefined
  // }
  const subCategoriesMap: any = {};

  props.categoriesData.forEach((category) => {
    subCategoriesMap[category.id] = category.subCategories;
  });

  const handleSavedCategoryCheckBox = (
    savedCategoryId: string | null | undefined
  ) => {
    setSavedCategoryCheckBox(!!!savedCategoryCheckBox);
  };

  const handleEditTransactionMode = (
    id: string,
    note: string,
    categoryId: string,
    subCategoryId: string,
    savedCategoryId: string | null | undefined
  ) => {
    setTransactionEditMode(id);
    setCategoryId(categoryId);
    setSubCategoryId(subCategoryId);
    setNote(note);
    setSavedCategoryCheckBox(!!savedCategoryId);
  };

  const handleEditNote = (e: any) => {
    setNote(e.target.value);
  };

  const handleUpdateTransactionCategory = async (row: any) => {
    let transactionId = row.id;
    let name = row.name;
    let memo = row.memo;
    let savedCategoryId = row.savedCategoryId;
    let note = row.note;

    //if savedCategoryCheckBox is true we need to save the savedCategoryId.
    //else savedCatgoryId is null
    if (savedCategoryCheckBox) {
      //does a savedCategoryId already exist? if so use it. else create a new one

      if (savedCategoryId) {
        await updateCategoriesInAllTransactions({
          variables: {
            name,
            memo,
            categoryId,
            subCategoryId,
            note,
            savedCategoryId,
          },
        });
      } else {
        await createSavedCategory({
          variables: { categoryId, subCategoryId, name, memo },
        }).then(async ({ data }) => {
          await updateCategoriesInAllTransactions({
            variables: {
              name,
              memo,
              categoryId,
              subCategoryId,
              note,
              savedCategoryId: data!.createSavedCategory.id,
            },
          });
        });
      }
    } else {
      //update all transactions with null savedCategoryId
      await updateCategoriesInAllTransactions({
        variables: {
          name,
          memo,
          categoryId: row.category.id,
          subCategoryId: row.subCategory.id,
          note,
          savedCategoryId: null,
        },
      });

      //update the one transaction
      await updateCategoriesInTransaction({
        variables: {
          id: transactionId,
          categoryId,
          subCategoryId,
          note,
          savedCategoryId: null,
        },
      });

      //delete the saved category if there was one.
      if (savedCategoryId) {
        await deleteSavedCategory({
          variables: { savedCategoryId },
        });
      }
    }

    setTransactionEditMode("");
    setNote("");
    setCategoryId("");
    setSubCategoryId("");
    setSavedCategoryCheckBox(false);
    props.refetch();
  };

  return (
    <div>
      <Paper className={classes.table}>
        {/* <EnhancedTableToolbar refetch={props.refetch} /> */}
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

                <TableCell>Average Amount</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Sub Category</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.datePosted}</TableCell>
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
                              onClick={() =>
                                handleEditTransactionMode("", "", "", "", null)
                              }
                            />
                          </Tooltip>
                          <Tooltip title="Apply">
                            <Checkbox
                              checked={savedCategoryCheckBox}
                              onClick={() =>
                                handleSavedCategoryCheckBox(row.savedCategoryId)
                              }
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
                        <Edit
                          onClick={() =>
                            handleEditTransactionMode(
                              row.id,
                              row.note || "",
                              row.category!.id,
                              row.subCategory!.id,
                              row.savedCategoryId
                            )
                          }
                        />
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

// const useToolbarStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       paddingLeft: theme.spacing(2),
//       paddingRight: theme.spacing(1),
//     },
//     highlight:
//       theme.palette.type === "light"
//         ? {
//             color: theme.palette.secondary.main,
//             backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//           }
//         : {
//             color: theme.palette.text.primary,
//             backgroundColor: theme.palette.secondary.dark,
//           },
//     title: {
//       flex: "1 1 100%",
//     },
//   })
// );

// interface IEnhancedToolBarProps {
//   refetch: any;
// }

// function EnhancedTableToolbar(props: IEnhancedToolBarProps) {
//   const classes = useToolbarStyles();

//   const handleClick = () => {
//     props.refetch();
//   };

//   return (
//     <Toolbar className={classes.root}>
//       <Typography
//         className={classes.title}
//         variant="h6"
//         id="tableTitle"
//         component="div"
//       >
//         List of Uncategorized Transactions
//       </Typography>

//       <Button onClick={handleClick} variant="contained">
//         Get 10 more...
//       </Button>
//     </Toolbar>
//   );
// }
