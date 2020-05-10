import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

interface ISubCategorySelect {
  categories: any;
  setSubCategoryId: React.Dispatch<React.SetStateAction<string>>;
  selectedSubCategoryId: string;
}

export function SubCategorySelect(props: ISubCategorySelect) {
  const classes = useStyles();

  const handleChange = (event: any) => {
    props.setSubCategoryId(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Sub-Category</InputLabel>
        <Select
          labelId="subCategory"
          id="subCategoryId"
          value={props.selectedSubCategoryId}
          onChange={handleChange}
        >
          {props.categories &&
            props.categories.map((category: any) => {
              return (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </div>
  );
}
