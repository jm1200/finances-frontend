import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import numeral from "numeral";
import { ICategoryTotalsTableDisplayData } from "../../types";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    header: {
      display: "flex",
      fontSize: "2em",
      fontWeight: "bold",
      justifyContent: "space-between",
    },
    category: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
    },
    categoryName: {
      fontSize: "1.3em",
    },
    categoryAmount: {
      display: "flex",
      justifyContent: "flex-end",
    },
    subCategory: {
      display: "flex",
      width: "80%",
      justifyContent: "space-between",
      alignItems: "center",
    },
    subCategoryAmount: {
      display: "flex",
      justifyContent: "flex-end",
    },
  })
);

interface ICategoryTotalsTableProps {
  displayData: ICategoryTotalsTableDisplayData[];
  grandTotal: number;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedSubCategory: React.Dispatch<
    React.SetStateAction<{ categoryId: string; subCategoryId: string } | null>
  >;
}

export function CategoryTotalsTable(props: ICategoryTotalsTableProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState<string | null>(null);

  const handleClick = (categoryId: string) => {
    props.setSelectedCategory(categoryId);
    props.setSelectedSubCategory(null);
    if (categoryId === open) {
      setOpen(null);
    } else {
      setOpen(categoryId);
    }
  };
  const handleSubCategoryClick = (
    categoryId: string,
    subCategoryId: string
  ) => {
    props.setSelectedCategory(null);
    props.setSelectedSubCategory({ categoryId, subCategoryId });
  };

  const handleReset = () => {
    props.setSelectedCategory(null);
    props.setSelectedSubCategory(null);
  };
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          className={classes.header}
          component="div"
          id="nested-list-subheader"
        >
          <div>Cash Flow</div>
          <Button size="small" variant="outlined" onClick={handleReset}>
            Reset
          </Button>
          <div>{numeral(props.grandTotal).format("$0,0.00")}</div>
        </ListSubheader>
      }
      className={classes.root}
    >
      {props.displayData &&
        props.displayData.map((category, index: number) => {
          return (
            <div key={index}>
              <ListItem button onClick={() => handleClick(category.categoryId)}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <div className={classes.category}>
                  <ListItemText
                    className={classes.categoryName}
                    primary={category.name}
                  />
                  <ListItemText
                    className={classes.categoryAmount}
                    primary={numeral(category.categoryTotal).format("$0,0.00")}
                  />
                </div>

                {open === category.categoryId ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={open === category.categoryId}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {category.subCategories.map(
                    (subCategory: any, index: number) => {
                      return (
                        <ListItem
                          key={index}
                          button
                          className={classes.nested}
                          onClick={() =>
                            handleSubCategoryClick(
                              category.categoryId,
                              subCategory.subCategoryId
                            )
                          }
                        >
                          <ListItemIcon>
                            <StarBorder />
                          </ListItemIcon>
                          <div className={classes.subCategory}>
                            <ListItemText primary={subCategory.name} />

                            <ListItemText
                              className={classes.subCategoryAmount}
                              primary={numeral(
                                subCategory.subCategoryTotal
                              ).format("$0,0.00")}
                            />
                          </div>
                        </ListItem>
                      );
                    }
                  )}
                </List>
              </Collapse>
            </div>
          );
        })}
    </List>
  );
}
