export const createCategoriesMap = (categories: any): any => {
  let categoriesMap: any = {};
  if (categories!.length !== 0) {
    categories!.forEach((category: any) => {
      categoriesMap[category.id] = category;
    });
  }
  return categoriesMap;
};
