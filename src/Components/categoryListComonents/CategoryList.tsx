import React, { Dispatch, SetStateAction } from "react";
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
import AddCircle from "@material-ui/icons/AddCircle";
import { CategoryEntity, UserQuery } from "../../generated/graphql";
import AddCategoryForm from "./AddCategoryForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    icon: {
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  })
);

interface ICategoryListProps {
  categories: UserQuery["user"]["categories"];
}

export default function CategoryList({ categories }: ICategoryListProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(0);
  const [addCategoryMode, setAddCategoryMode] = React.useState(false);

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

  const handleAddCategory = () => {
    setAddCategoryMode(true);
    console.log("clicked");
  };

  const addCategory = (newCategory: string) => {
    console.log("Category to add: ", newCategory);
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
          <h4>Categories</h4>
          {addCategoryMode ? (
            <AddCategoryForm
              addCategory={addCategory}
              setAddCategoryMode={setAddCategoryMode}
            />
          ) : (
            <AddCircle className={classes.icon} onClick={handleAddCategory} />
          )}
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
