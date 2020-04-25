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
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

interface ICategorySelect {
  categories: UserQuery["user"]["categories"];
  setFunction: React.Dispatch<React.SetStateAction<string>>;
  currentValue: any;
}

export default function CategorySelect(props: ICategorySelect) {
  const classes = useStyles();

  const handleChange = (event: any) => {
    props.setFunction(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.currentValue}
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
