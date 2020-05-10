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
  FormControlLabel,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      background: theme.palette.background.paper,
    },
    formControl: {
      margin: 5,
      width: 140,
    },
    buttons: {
      marginLeft: 30,
    },
    submit: {
      backgroundColor: theme.palette.primary.main,
      marginBottom: 10,
    },
    cancel: {
      backgroundColor: theme.palette.warning.light,
    },
    checkBoxes: {
      display: "flex",
      flexDirection: "column",
      border: "1px solid lightgrey",
      padding: 10,
      borderRadius: 10,
    },
    selectFields: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      width: "50%",
    },
    columnOne: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    columnTwo: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
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
  cancel: () => void;
}

export const EditTransactionForm: React.FC<IEditTransactionFormProps> = (
  props
) => {
  const classes = useStyles();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <div className={classes.selectFields}>
          <div className={classes.columnOne}>
            <div className={classes.formControl}>
              <CategorySelect
                categories={props.categories}
                selectedCategoryId={props.selectedCategoryId}
                setCategoryId={props.setCategoryId}
                setSubCategoryId={props.setSubCategoryId}
                subCategoriesMap={props.subCategoriesMap}
              />
            </div>
            <div className={classes.formControl}>
              <FormControl>
                <InputLabel id="book">Select book:</InputLabel>
                <Select
                  labelId="bookSelect"
                  id="bookSelectId"
                  value={props.book}
                  onChange={(event) =>
                    props.setBook(event.target.value as string)
                  }
                >
                  <MenuItem value="Home">Home</MenuItem>
                  <MenuItem value="377 Hyde Park Rd.">
                    377 Hyde Park Rd.
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={classes.columnTwo}>
            <div className={classes.formControl}>
              <SubCategorySelect
                categories={props.subCategoriesMap[props.selectedCategoryId]}
                selectedSubCategoryId={props.selectedSubCategoryId}
                setSubCategoryId={props.setSubCategoryId}
              />
            </div>

            <div className={classes.formControl}>
              <TextField
                label="Note:"
                id="note"
                defaultValue={props.note}
                size="small"
                onChange={(event) =>
                  props.setNote(event.target.value as string)
                }
              />
            </div>
          </div>
        </div>

        <div className={classes.checkBoxes}>
          <Tooltip title="Apply to All">
            <FormControlLabel
              label="Apply to all categories with same name/memo"
              labelPlacement="end"
              control={
                <Checkbox
                  checked={props.savedCategoryCheckBox}
                  onClick={() => handleSavedCategoryCheckBox()}
                  color="primary"
                  inputProps={{
                    "aria-label": "secondary checkbox",
                  }}
                />
              }
            />
          </Tooltip>
          <Tooltip title="Save Amount">
            <FormControlLabel
              label="Save Amount to help auto-categorize transactions with the same name/memo"
              labelPlacement="end"
              control={
                <Checkbox
                  checked={props.amountCheckBox}
                  onClick={() => handleAmountCheckBox()}
                  color="primary"
                  inputProps={{
                    "aria-label": "secondary checkbox",
                  }}
                />
              }
            />
          </Tooltip>
        </div>
        <div className={classes.buttons}>
          <Button className={classes.submit} type="submit">
            Update
          </Button>
          <Button className={classes.cancel} onClick={props.cancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
