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

interface IAddSubCategoryFormProps {
  setAddSubCategoryMode: Dispatch<SetStateAction<string>>;
  addSubCategory: (newSubCategory: string, categoryId: string) => void;
  categoryId: string;
}

export default function AddSubCategoryForm(props: IAddSubCategoryFormProps) {
  const classes = useStyles();
  const [newSubCategory, setNewSubCategory] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSubCategory(e.target.value);
  };

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault();
    props.addSubCategory(newSubCategory, props.categoryId);
    props.setAddSubCategoryMode("");
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <div onClick={(e) => e.stopPropagation()} className={classes.form}>
        <TextField
          autoFocus
          label="Add Sub Category"
          id="outlined-size-small"
          placeholder="Sub Category Name:"
          variant="outlined"
          size="small"
          value={newSubCategory}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <CheckCircle className={classes.ok} onClick={(e) => handleSubmit(e)} />
        <Cancel
          className={classes.cancel}
          onClick={() => props.setAddSubCategoryMode("")}
        />
      </div>
    </form>
  );
}
