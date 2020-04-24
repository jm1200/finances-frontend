import React, { Dispatch, SetStateAction } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Cancel from "@material-ui/icons/Cancel";
import Delete from "@material-ui/icons/Delete";
import CheckCircle from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: 200,
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
    delete: {
      color: theme.palette.error.dark,
    },
  })
);

interface IEditCategoryFormProps {
  setEditCategoryMode: Dispatch<SetStateAction<string>>;
  editCategory: (
    e:
      | React.MouseEvent<SVGSVGElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>,
    editCategory: string,
    categoryId: string
  ) => void;
  deleteCategory: (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    categoryId: string
  ) => void;
  currentValue: string;
  categoryId: string;
}

export default function EditCategoryForm(props: IEditCategoryFormProps) {
  const classes = useStyles();
  const [editCategory, setEditCategory] = React.useState(props.currentValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditCategory(e.target.value);
  };

  const handleCancel = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    props.setEditCategoryMode("");
  };

  const handleSubmit = (
    e:
      | React.MouseEvent<SVGSVGElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    props.editCategory(e, editCategory, props.categoryId);
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
          label="Edit Category"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          value={editCategory}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <CheckCircle className={classes.ok} onClick={(e) => handleSubmit(e)} />
        <Cancel className={classes.cancel} onClick={(e) => handleCancel(e)} />
        <Delete
          className={classes.delete}
          onClick={(e) => props.deleteCategory(e, props.categoryId)}
        />
      </div>
    </form>
  );
}
