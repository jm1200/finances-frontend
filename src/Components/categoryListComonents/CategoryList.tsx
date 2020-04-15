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
import AddCircle from "@material-ui/icons/AddCircle";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { UserQuery } from "../../generated/graphql";
import AddCategoryForm from "./AddCategoryForm";
import EditCategoryForm from "./EditCategoryForm";
import { ListItemSecondaryAction, IconButton } from "@material-ui/core";

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
  const [editCategoryMode, setEditCategoryMode] = React.useState(0);

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

  const handleAddCategoryMode = () => {
    setAddCategoryMode(true);
  };
  const handleEditCategoryMode = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    categoryId: number
  ) => {
    e.stopPropagation();
    setEditCategoryMode(categoryId);
  };

  const _addCategory = (newCategory: string) => {
    console.log("Category to add: ", newCategory);
  };
  const _editCategory = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<SVGSVGElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>,
    editCategory: string
  ) => {
    console.log("Category to edit: ", editCategory);
    e.stopPropagation();
    setEditCategoryMode(0);
  };
  const _deleteCategory = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    categoryId: number
  ) => {
    console.log("Category to delete: ", categoryId);
    e.stopPropagation();
    setEditCategoryMode(0);
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
              addCategory={_addCategory}
              setAddCategoryMode={setAddCategoryMode}
            />
          ) : (
            <AddCircle
              className={classes.icon}
              onClick={handleAddCategoryMode}
            />
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

                {editCategoryMode === category.id ? (
                  <EditCategoryForm
                    categoryId={category.id}
                    currentValue={category.name}
                    deleteCategory={_deleteCategory}
                    editCategory={_editCategory}
                    setEditCategoryMode={setEditCategoryMode}
                  />
                ) : (
                  <Edit
                    onClick={(e) => handleEditCategoryMode(e, category.id)}
                  />
                )}

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
