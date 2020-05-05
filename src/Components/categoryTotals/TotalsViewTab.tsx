import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { SelectedCategoryTableRoot } from "./SelectedCategoryTableRoot";
import { GetTransactionsByMonthQuery } from "../../generated/graphql";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

interface ITotalsviewTabProps {
  selectedCategory: string | null;
  selectedSubCategory: string | null;
  data: GetTransactionsByMonthQuery;
}

export const TotalsViewTab = (props: ITotalsviewTabProps) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <Tab label="Table" />
          <Tab label="Pie Chart" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <SelectedCategoryTableRoot
          selectedCategory={props.selectedCategory}
          selectedSubCategory={props.selectedSubCategory}
          data={props.data}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </div>
  );
};
