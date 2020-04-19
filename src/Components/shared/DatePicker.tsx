import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MonthPicker from "./MonthPicker";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      width: "100%",
    },
  })
);

interface IDatePickerProps {
  selectedMonth: string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}

export default function DatePicker(props: IDatePickerProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Month Select" />
          <Tab label="Date Range Select" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <MonthPicker
          selectedMonth={props.selectedMonth}
          setSelectedMonth={props.setSelectedMonth}
          selectedYear={props.selectedYear}
          setSelectedYear={props.setSelectedYear}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Date Range Select
      </TabPanel>
    </div>
  );
}
