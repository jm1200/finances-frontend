import React, { Dispatch, SetStateAction } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Cancel from "@material-ui/icons/Cancel";
import CheckCircle from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        // width: 200,
      },
    },
    form: {
      display: "flex",
      alignItems: "center",
    },
    ok: {
      color: theme.palette.success.light,
    },
    cancel: {
      color: theme.palette.error.light,
    },
  })
);

interface IAddCategoryFormProps {
  setAddCategoryMode: Dispatch<SetStateAction<boolean>>;
  addCategory: (newCategory: string) => void;
}

export default function AddCategoryForm(props: IAddCategoryFormProps) {
  const classes = useStyles();
  const [newCategory, setNewCategory] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault();
    props.addCategory(newCategory);
    props.setAddCategoryMode(false);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <div className={classes.form}>
        <TextField
          autoFocus
          label="Add Category"
          id="outlined-size-small"
          placeholder="Category Name:"
          variant="outlined"
          size="small"
          value={newCategory}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <CheckCircle className={classes.ok} onClick={(e) => handleSubmit(e)} />
        <Cancel
          className={classes.cancel}
          onClick={() => props.setAddCategoryMode(false)}
        />
      </div>
    </form>
  );
}
