import {
  UserQuery,
  SubCategoryEntity,
  CategoryEntity,
} from "../generated/graphql";

type CategoriesArray = UserQuery["user"]["categories"];

interface ICategoriesMap {
  [key: string]: CategoryEntity;
}

export const createCategoriesMap = (
  categories: CategoriesArray
): ICategoriesMap => {
  let categoriesMap: ICategoriesMap = {};

  if (categories.length !== 0) {
    for (let category of categories) {
      // categoriesMap[category.id] = category;
    }
  }
  return categoriesMap;
};
