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
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useAddSubCategoryMutation,
  useDeleteSubCategoryMutation,
  GetUserCategoriesForListQuery,
  GetUserCategoriesForListQueryVariables,
} from "../../generated/graphql";
import AddCategoryForm from "./AddCategoryForm";
import AddSubCategoryForm from "./AddSubCategoryForm";
import EditCategoryForm from "./EditCategoryForm";
import { ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { ApolloQueryResult } from "apollo-boost";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 400,
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
    delete: {
      "&:hover": {
        color: theme.palette.error.main,
      },
    },
  })
);

interface ICategoryListProps {
  categories: GetUserCategoriesForListQuery["getUserCategories"];
  refetchCategories: (
    variables?: GetUserCategoriesForListQueryVariables | undefined
  ) => Promise<ApolloQueryResult<GetUserCategoriesForListQuery>>;
}

export default function CategoryList({
  categories,
  refetchCategories,
}: ICategoryListProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState("");
  const [addCategoryMode, setAddCategoryMode] = React.useState(false);
  const [editCategoryMode, setEditCategoryMode] = React.useState("");
  const [addSubCategoryMode, setAddSubCategoryMode] = React.useState("");

  const handleCategoryClick = (
    e: React.MouseEvent<HTMLDivElement>,
    categoryId: string
  ) => {
    categoryId === open ? setOpen("") : setOpen(categoryId);
  };

  const handleAddCategoryMode = () => {
    setAddCategoryMode(true);
  };
  const handleAddSubCategoryMode = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    categoryId: string
  ) => {
    e.stopPropagation();
    setAddSubCategoryMode(categoryId);
  };
  const handleEditCategoryMode = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    categoryId: string
  ) => {
    e.stopPropagation();
    setEditCategoryMode(categoryId);
  };
  const handleDeleteSubCategory = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    subCategoryId: string
  ) => {
    e.stopPropagation();
    _deleteSubCategory(subCategoryId);
  };

  //API calls
  const [addCategory] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [addSubCategory] = useAddSubCategoryMutation();
  const [deleteSubCategory] = useDeleteSubCategoryMutation();

  const _addCategory = async (newCategory: string) => {
    await addCategory({
      variables: {
        name: newCategory,
      },
    });
    refetchCategories();
  };

  const _editCategory = async (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<SVGSVGElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>,
    editCategory: string,
    categoryId: string
  ) => {
    e.stopPropagation();
    setEditCategoryMode("");
    await updateCategory({ variables: { categoryId, name: editCategory } });
    refetchCategories();
  };

  const _deleteCategory = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    categoryId: string
  ) => {
    e.stopPropagation();
    await deleteCategory({ variables: { categoryId } });
    refetchCategories();
    setEditCategoryMode("");
  };

  const _addSubCategory = async (
    newSubCategory: string,
    categoryId: string
  ) => {
    await addSubCategory({ variables: { categoryId, name: newSubCategory } });
    refetchCategories();
  };

  const _deleteSubCategory = async (subCategoryId: string) => {
    await deleteSubCategory({ variables: { subCategoryId } });
    refetchCategories();
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
        categories.map((category, index) => {
          return (
            <div key={index}>
              <ListItem
                button
                onClick={(e) => handleCategoryClick(e, category.id)}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                {editCategoryMode === category.id ||
                addSubCategoryMode === category.id ? null : (
                  <ListItemText primary={category.name} />
                )}

                {/* Default */}

                {category.id === open ? (
                  category.id === addSubCategoryMode ? (
                    <AddSubCategoryForm
                      categoryId={category.id}
                      setAddSubCategoryMode={setAddSubCategoryMode}
                      addSubCategory={_addSubCategory}
                    />
                  ) : (
                    !editCategoryMode &&
                    category.name !== "uncategorized" && (
                      <AddCircle
                        className={classes.icon}
                        onClick={(e) =>
                          handleAddSubCategoryMode(e, category.id)
                        }
                      />
                    )
                  )
                ) : null}

                {/* Edit Category Mode */}
                {editCategoryMode === category.id ? (
                  <EditCategoryForm
                    categoryId={category.id}
                    currentValue={category.name}
                    deleteCategory={_deleteCategory}
                    editCategory={_editCategory}
                    setEditCategoryMode={setEditCategoryMode}
                  />
                ) : (
                  !addSubCategoryMode &&
                  category.name !== "uncategorized" && (
                    <Edit
                      className={classes.icon}
                      onClick={(e) => handleEditCategoryMode(e, category.id)}
                    />
                  )
                )}

                {/* Expansion arrows */}

                {category.id === open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={category.id === open} timeout="auto" unmountOnExit>
                {category.subCategories &&
                  category.subCategories
                    .sort((a, b) => {
                      if (b.name > a.name) return -1;
                      if (b.name < a.name) return 1;
                      return 0;
                    })
                    .map((subCategory, index) => {
                      return (
                        <List key={index} component="div" disablePadding>
                          <ListItem button className={classes.nested}>
                            <ListItemIcon>
                              <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary={subCategory.name} />
                            <ListItemSecondaryAction>
                              {subCategory.name !== "uncategorized" && (
                                <IconButton
                                  onClick={(e) =>
                                    handleDeleteSubCategory(e, subCategory.id)
                                  }
                                  edge="end"
                                  aria-label="delete"
                                >
                                  <Delete className={classes.delete} />
                                </IconButton>
                              )}
                            </ListItemSecondaryAction>
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
