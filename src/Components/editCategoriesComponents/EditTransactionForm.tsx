import React from "react";
import { CategorySelect } from "./CategorySelect";
import { SubCategorySelect } from "./SubCategorySelect";
import { UserQuery, TransactionEntity } from "../../generated/graphql";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  Tooltip,
  Button,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    formControl: {
      marginRight: 15,
      minWidth: 250,
    },
  })
);

interface IEditTransactionFormProps {
  row: Partial<TransactionEntity>;
  categories: UserQuery["user"]["categories"];
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  setSubCategoryId: React.Dispatch<React.SetStateAction<string>>;
  selectedCategoryId: string;
  subCategoriesMap: any;
  selectedSubCategoryId: string;
  book: string;
  setBook: React.Dispatch<React.SetStateAction<string>>;
  note: string | null | undefined;
  setNote: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  savedCategoryCheckBox: boolean;
  setSavedCategoryCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
  amountCheckBox: boolean;
  setAmountCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
  submit: (row: any) => Promise<void>;
}

export const EditTransactionForm: React.FC<IEditTransactionFormProps> = (
  props
) => {
  const classes = useStyles();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("ETF39, submitted info");
    props.submit(props.row);
  };

  const handleSavedCategoryCheckBox = () => {
    props.setSavedCategoryCheckBox(!!!props.savedCategoryCheckBox);
  };

  const handleAmountCheckBox = () => {
    props.setAmountCheckBox(!props.amountCheckBox);
  };

  return (
    <div className={classes.root}>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <CategorySelect
          categories={props.categories}
          selectedCategoryId={props.selectedCategoryId}
          setCategoryId={props.setCategoryId}
          setSubCategoryId={props.setSubCategoryId}
          subCategoriesMap={props.subCategoriesMap}
        />

        <SubCategorySelect
          categories={props.subCategoriesMap[props.selectedCategoryId]}
          selectedSubCategoryId={props.selectedSubCategoryId}
          setSubCategoryId={props.setSubCategoryId}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="book">Select book:</InputLabel>
          <Select
            labelId="bookSelect"
            id="bookSelectId"
            value={props.book}
            onChange={(event) => props.setBook(event.target.value as string)}
          >
            <MenuItem value="Home">Home</MenuItem>
            <MenuItem value="Book">Book</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Note"
          id="note"
          defaultValue={props.note}
          variant="filled"
          size="small"
          onChange={(event) => props.setNote(event.target.value as string)}
        />
        <Tooltip title="Apply to All">
          <Checkbox
            checked={props.savedCategoryCheckBox}
            onClick={() => handleSavedCategoryCheckBox()}
            color="primary"
            inputProps={{
              "aria-label": "secondary checkbox",
            }}
          />
        </Tooltip>
        <Tooltip title="Check Amount">
          <Checkbox
            checked={props.amountCheckBox}
            onClick={() => handleAmountCheckBox()}
            color="primary"
            inputProps={{
              "aria-label": "secondary checkbox",
            }}
          />
        </Tooltip>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
