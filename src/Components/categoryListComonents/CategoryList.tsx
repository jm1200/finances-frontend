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
import { CategoryEntity, UserQuery } from "../../generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

interface ICategoryListProps {
  categories: UserQuery["user"]["categories"];
}

export default function CategoryList({ categories }: ICategoryListProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(0);

  const handleCategoryClick = (
    e: React.MouseEvent<HTMLDivElement>,
    categoryId: number
  ) => {
    console.log(categoryId);
    categoryId === open ? setOpen(0) : setOpen(categoryId);
  };
  const handleSubCategoryClick = (
    e: React.MouseEvent<HTMLDivElement>,
    subCategoryName: string
  ) => {
    console.log(subCategoryName);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Categories
        </ListSubheader>
      }
      className={classes.root}
    >
      {categories &&
        categories.map((category) => {
          return (
            <div key={category.name}>
              <ListItem
                button
                onClick={(e) => handleCategoryClick(e, category.id)}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={category.name} />
                {category.id === open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={category.id === open} timeout="auto" unmountOnExit>
                {category.subCategories &&
                  category.subCategories.map((subCategory, index) => {
                    return (
                      <List key={index} component="div" disablePadding>
                        <ListItem
                          button
                          onClick={(e) =>
                            handleSubCategoryClick(e, subCategory)
                          }
                          className={classes.nested}
                        >
                          <ListItemIcon>
                            <StarBorder />
                          </ListItemIcon>
                          <ListItemText primary={subCategory} />
                        </ListItem>
                      </List>
                    );
                  })}
              </Collapse>
            </div>
          );
        })}
    </List>
  );
}
