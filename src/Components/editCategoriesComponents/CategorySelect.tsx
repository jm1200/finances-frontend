import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { UserQuery } from "../../generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
    },
  })
);

interface ICategorySelect {
  categories: UserQuery["user"]["categories"];
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  setSubCategoryId: React.Dispatch<React.SetStateAction<string>>;
  selectedCategoryId: string;
  subCategoriesMap: any;
}

export function CategorySelect(props: ICategorySelect) {
  const classes = useStyles();

  const handleChange = (event: any) => {
    props.setCategoryId(event.target.value);
    props.setSubCategoryId(props.subCategoriesMap[event.target.value][0].id);
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Category:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.selectedCategoryId}
          onChange={handleChange}
        >
          {props.categories &&
            props.categories.map((category) => {
              return (
                //#ts-ignore
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
