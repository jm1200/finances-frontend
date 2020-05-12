import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      backgroundColor: theme.palette.background.paper,
    },
    formControl: {
      width: 200,
    },
  })
);

interface IBookPickerProps {
  selectedBook: string;
  setSelectedBook: React.Dispatch<React.SetStateAction<string>>;
}
export const BookPicker: React.FC<IBookPickerProps> = (props) => {
  const classes = useStyles();

  const handleChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    props.setSelectedBook(event.target.value as string);
  };
  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select a Book:</InputLabel>
        <Select
          labelId="selectBookLabel"
          id="selectBook"
          value={props.selectedBook}
          onChange={(e) => handleChange(e)}
        >
          <MenuItem value={"Home"}>Home</MenuItem>
          <MenuItem value={"377 Hyde Park Rd."}>377 Hyde Park Rd.</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
