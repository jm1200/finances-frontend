import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  ICategoriesTransactionsTableDisplayData,
  ICategoriesGraphDisplayData,
} from "../../types";
import { SelectedCategoryGraph } from "./SelectedCategoryGraph";
import { SelectedCategoryTable } from "./SelectedCategoryTable";

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
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  graph: {
    height: 500,
  },
}));

interface ITotalsviewTabProps {
  selectedCategory: string | null;
  selectedSubCategory: { categoryId: string; subCategoryId: string } | null;
  categoriesTransactionsTableDisplayData: ICategoriesTransactionsTableDisplayData[];
  categoriesGraphDisplayData: ICategoriesGraphDisplayData[];
}

interface IDisplayData {
  id: string;
  label: string;
  value: number;
}

const data2: IDisplayData[] = [
  { id: "css", label: "css", value: 40 },
  { id: "javascript", label: "css", value: 60 },
];

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
        <div>
          <SelectedCategoryTable
            displayData={props.categoriesTransactionsTableDisplayData}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={{ height: 600 }}>
          <SelectedCategoryGraph
            displayData={props.categoriesGraphDisplayData}
          />
        </div>
      </TabPanel>
    </div>
  );
};
