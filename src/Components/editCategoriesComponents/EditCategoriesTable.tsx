import React, { Dispatch, SetStateAction } from "react";
import {
  makeStyles,
  useTheme,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Edit, Cancel } from "@material-ui/icons";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import {
  TablePagination,
  TableFooter,
  Toolbar,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import {
  GetTransactionsByMonthQuery,
  GetUserCategoriesQuery,
  TransactionEntity,
  UserQuery,
  useUpdateCategoriesInTransactionsMutation,
} from "../../generated/graphql";
import { EditTransactionForm } from "./EditTransactionForm";
import moment from "moment";
import numeral from "numeral";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  form: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

interface IRowProps {
  row: Partial<TransactionEntity>;
  categories: UserQuery["user"]["categories"];
  refetchTransactions: any;
  // setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  // setSubCategoryId: React.Dispatch<React.SetStateAction<string>>;
  // selectedCategoryId: string;
  // subCategoriesMap: any;
  // selectedSubCategoryId: string;
}

function Row(props: IRowProps) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [selectedCategoryId, setCategoryId] = React.useState("");
  const [selectedSubCategoryId, setSubCategoryId] = React.useState("");
  const [note, setNote] = React.useState<string | null | undefined>("");
  const [book, setBook] = React.useState("Home");
  const [savedCategoryCheckBox, setSavedCategoryCheckBox] = React.useState(
    true
  );
  const [amountCheckBox, setAmountCheckBox] = React.useState(false);
  const [
    updateCategoriesInTransactions,
  ] = useUpdateCategoriesInTransactionsMutation();

  const subCategoriesMap: any = {};

  props.categories.forEach((category) => {
    subCategoriesMap[category.id] = category.subCategories;
  });

  const handleEdit = (
    categoryId: string,
    subCategoryId: string,
    book: string,
    note: string | null | undefined
  ) => {
    setOpen(!open);
    setCategoryId(categoryId);
    setSubCategoryId(subCategoryId);
    setBook(book);
    setNote(note);
    setSavedCategoryCheckBox(!!row.savedCategory && !!row.savedCategory.id);
    setAmountCheckBox(
      !!row.savedCategory && row.savedCategory.amounts.length > 0
    );
  };

  const handleCancelTransactionMode = () => {
    setOpen(!open);
    setCategoryId("");
    setSubCategoryId("");
    setNote("");
    setSavedCategoryCheckBox(false);
    setAmountCheckBox(false);
  };

  const handleUpdateTransactionCategory = async (row: any) => {
    let savedCategoryId,
      savedCategoryAmounts = null;
    if (row.savedCategory) {
      savedCategoryId = row.savedCategory.id;
      savedCategoryAmounts = row.savedCategory.amounts;
    }
    try {
      await updateCategoriesInTransactions({
        variables: {
          id: row.id,
          name: row.name,
          memo: row.memo,
          amount: row.amount,
          savedCategoryId,
          savedCategoryAmounts,
          selectedCategoryId: selectedCategoryId,
          selectedSubCategoryId: selectedSubCategoryId,
          note,
          book,
          checkAmount: amountCheckBox,
          applyToAll: savedCategoryCheckBox,
        },
      });
    } catch (err) {
      console.log("TCT 157", err);
    }

    handleCancelTransactionMode();

    props.refetchTransactions();
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {moment(row.datePosted, "YYYYMMDD").format("MMM Do YYYY")}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.memo}</TableCell>
        <TableCell>{numeral(row.amount).format("$0,0.00")}</TableCell>
        <TableCell>{row.category!.name}</TableCell>
        <TableCell>{row.subCategory!.name}</TableCell>
        <TableCell>{row.note}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={
              open
                ? handleCancelTransactionMode
                : () =>
                    handleEdit(
                      props.row.category!.id,
                      props.row.subCategory!.id,
                      props.row.book!,
                      props.row.note
                    )
            }
          >
            {open ? <Cancel /> : <Edit />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className={classes.form}>
              <EditTransactionForm
                row={row}
                categories={props.categories}
                selectedCategoryId={selectedCategoryId}
                setCategoryId={setCategoryId}
                setSubCategoryId={setSubCategoryId}
                subCategoriesMap={subCategoriesMap}
                selectedSubCategoryId={selectedSubCategoryId}
                note={note}
                setNote={setNote}
                book={book}
                setBook={setBook}
                savedCategoryCheckBox={savedCategoryCheckBox}
                setSavedCategoryCheckBox={setSavedCategoryCheckBox}
                amountCheckBox={amountCheckBox}
                setAmountCheckBox={setAmountCheckBox}
                submit={handleUpdateTransactionCategory}
                cancel={handleCancelTransactionMode}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const useEditCategoryTableStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      width: "100%",
    },
    footer: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
    },
  })
);
interface IEditCategoriesTableProps {
  data: GetTransactionsByMonthQuery["getTransactionsByMonth"];
  categoriesData: GetUserCategoriesQuery["getUserCategories"];
  refetchTransactions: any;
}

export const EditCategoriesTable = (props: IEditCategoriesTableProps) => {
  const classes = useEditCategoryTableStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [uncategorizedCheckBox, setUncategorizedCheckBox] = React.useState(
    false
  );

  //console.log("ECT 180", props.data);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let filteredData = props.data;

  //filter uncategorized rows
  if (filteredData && uncategorizedCheckBox) {
    filteredData = filteredData.filter(
      (transaction) => transaction.category!.name === "uncategorized"
    );
  }

  //paginate
  let pageinatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  //add empty rows if table not full
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

  // console.log(
  //   `ECT 259: page: ${page}, RPP: ${rowsPerPage}, rows: ${pageinatedData} `
  // );
  return (
    <Paper className={classes.table}>
      <EnhancedTableToolbar
        uncategorizedCheckBox={uncategorizedCheckBox}
        setUncategorizedCheckBox={setUncategorizedCheckBox}
      />
      <TableContainer component={Paper}>
        <Table size="small" aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Memo</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sub Category</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageinatedData.map((row) => (
              <Row
                key={row.id}
                row={row}
                categories={props.categoriesData}
                refetchTransactions={props.refetchTransactions}
              />
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={8} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={8}
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   display: "flex",
      //   justifyContent: "flex-end",
      //   width: "100%",
      flexShrink: 0,
      // marginLeft: theme.spacing(4.5),
    },
    grow: {
      flexGrow: 1,
    },
  })
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>

      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
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
