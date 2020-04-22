import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import numeral from "numeral";

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
  displayData: any;
  grandTotal: any;
}

export default function CategoryTotalsTable(props: ICategoryTotalsTableProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(null);

  const handleClick = (categoryId: any) => {
    if (categoryId === open) {
      setOpen(null);
    } else {
      setOpen(categoryId);
    }
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
          <div>{numeral(props.grandTotal).format("$0,0.00")}</div>
        </ListSubheader>
      }
      className={classes.root}
    >
      {props.displayData &&
        props.displayData.map((category: any, index: number) => {
          return (
            <div key={index}>
              <ListItem button onClick={() => handleClick(category.id)}>
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

                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open === category.id} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {category.subCategories.map(
                    (subCategory: any, index: number) => {
                      return (
                        <ListItem key={index} button className={classes.nested}>
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
