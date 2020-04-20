import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  UserQuery,
  useUpdateCategoriesInTransactionMutation,
} from "../../generated/graphql";
import { getTransCatDataForTable } from "./utils/transCatDataTable";
import { Edit, Cancel, CheckCircle } from "@material-ui/icons";
import CategorySelect from "./CategorySelect";
import SubCategorySelect from "./SubCategorySelect";

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
  transactions: UserQuery["user"]["transactions"];
  categories: UserQuery["user"]["categories"];
  subCategories: UserQuery["user"]["subCategories"];
  refetchUserQuery: any;
}

export default function TransactionCategoryTable(
  props: ITransactionCategoryTableProps
) {
  //console.log("transcattable 46 props:", props.transactions);
  const classes = useStyles();
  const [editTransactionMode, setTransactionEditMode] = React.useState(0);
  const [categoryId, setCategoryId] = React.useState(0);
  const [subCategoryId, setSubCategoryId] = React.useState(0);
  const [
    updateCategoriesInTransaction,
  ] = useUpdateCategoriesInTransactionMutation();

  let subCategories: any = [];
  if (categoryId) {
    subCategories = props.categories.filter(
      (category) => category.id === categoryId
    )[0].subCategories;
  }

  const handleEditTransactionMode = (id: number) => {
    setTransactionEditMode(id);
  };

  const handleUpdateTransactionCategory = async (rowId: number) => {
    const ids: string[] = getTransCatDataForTable(
      props.transactions,
      props.categories,
      props.subCategories
    ).find((obj: any) => {
      if (obj.id === rowId) return true;
      return false;
    }).ids;

    await updateCategoriesInTransaction({
      variables: { ids, categoryId, subCategoryId },
    });
    setTransactionEditMode(0);
    props.refetchUserQuery();
  };

  let data = getTransCatDataForTable(
    props.transactions,
    props.categories,
    props.subCategories
  );

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Memo</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Sub Category</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any) => (
            <TableRow key={row.memo}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.memo}</TableCell>
              {editTransactionMode === row.id ? (
                <>
                  <TableCell>
                    <CategorySelect
                      categories={props.categories}
                      currentValue={categoryId}
                      setFunction={setCategoryId}
                    />
                  </TableCell>
                  <TableCell>
                    {categoryId !== 0 && (
                      <SubCategorySelect
                        categories={subCategories}
                        currentValue={subCategoryId}
                        setFunction={setSubCategoryId}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className={classes.updateOptions}>
                      <CheckCircle
                        className={classes.check}
                        onClick={() => handleUpdateTransactionCategory(row.id)}
                      />
                      <Cancel
                        className={classes.cancel}
                        onClick={() => handleEditTransactionMode(0)}
                      />
                    </div>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{row.categoryName}</TableCell>
                  <TableCell>{row.subCategoryName}</TableCell>
                  <TableCell>
                    <Edit onClick={() => handleEditTransactionMode(row.id)} />
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
