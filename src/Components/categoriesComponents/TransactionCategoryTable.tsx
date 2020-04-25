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
  GetTransactionsToCategorizeQuery,
  GetUserCategoriesQuery,
  GetTransactionsByMonthQuery,
} from "../../generated/graphql";
import { Edit, Cancel, CheckCircle } from "@material-ui/icons";
import CategorySelect from "./CategorySelect";
import SubCategorySelect from "./SubCategorySelect";
import { Toolbar, Typography, Button, TextField } from "@material-ui/core";
import numeral from "numeral";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    updateOptions: {
      display: "flex",
    },
    check: {
      color: theme.palette.success.main,
    },
    cancel: {
      color: theme.palette.error.main,
      marginLeft: 7,
    },
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
  const [editTransactionMode, setTransactionEditMode] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [subCategoryId, setSubCategoryId] = React.useState("");
  const [
    updateCategoriesInTransaction,
  ] = useUpdateCategoriesInTransactionMutation();

  // interface ISubCategoryMap {
  //   [key:string] : GetUserCategoriesQuery["getUserCategories"] | null | undefined
  // }
  const subCategoriesMap: any = {};

  props.categoriesData.forEach((category) => {
    subCategoriesMap[category.id] = category.subCategories;
  });

  const handleEditTransactionMode = (
    id: string,
    note: string,
    categoryId: string,
    subCategoryId: string
  ) => {
    setTransactionEditMode(id);
    setCategoryId(categoryId);
    setSubCategoryId(subCategoryId);
    setNote(note);
  };

  const handleEditNote = (e: any) => {
    setNote(e.target.value);
  };

  const handleUpdateTransactionCategory = async (rowId: string) => {
    const row = props.data.filter((row) => row.id === rowId);
    const id = row[0].id;
    console.log(id);

    await updateCategoriesInTransaction({
      variables: { id, categoryId, subCategoryId, note },
    });
    setTransactionEditMode("");
    setNote("");
    props.refetch();
  };
  console.log("TCT 84", props.data);
  // props.data.sort((a: any, b: any) => {
  //   let c = parseInt(a.datePosted);
  //   let d = parseInt(b.datePosted);
  //   if (d > c) return -1;
  //   if (d < c) return 1;
  //   return 0;
  // });

  return (
    <div>
      <Paper>
        <EnhancedTableToolbar refetch={props.refetch} />
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
                          currentValue={row.category!.id}
                          setFunction={setCategoryId}
                        />
                      </TableCell>
                      <TableCell>
                        <SubCategorySelect
                          categories={subCategoriesMap[row.category!.id]}
                          currentValue={row.subCategory!.id}
                          setFunction={setSubCategoryId}
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.updateOptions}>
                          <CheckCircle
                            className={classes.check}
                            onClick={() =>
                              handleUpdateTransactionCategory(row.id)
                            }
                          />
                          <Cancel
                            className={classes.cancel}
                            onClick={() =>
                              handleEditTransactionMode("", "", "", "")
                            }
                          />
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{row.note}</TableCell>
                      <TableCell>{row.category!.name}</TableCell>
                      <TableCell>{row.subCategory!.name}</TableCell>

                      <TableCell>
                        <Edit
                          onClick={() =>
                            handleEditTransactionMode(
                              row.id,
                              row.note || "",
                              row.category!.id,
                              row.subCategory!.id
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

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
  })
);

interface IEnhancedToolBarProps {
  refetch: any;
}

function EnhancedTableToolbar(props: IEnhancedToolBarProps) {
  const classes = useToolbarStyles();

  const handleClick = () => {
    props.refetch();
  };

  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        List of Uncategorized Transactions
      </Typography>

      <Button onClick={handleClick} variant="contained">
        Get 10 more...
      </Button>
    </Toolbar>
  );
}
