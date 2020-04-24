import React from "react";
import CategoryList from "./CategoryList";
import { useGetUserCategoriesForListQuery } from "../../generated/graphql";

interface ICategoryListRootProps {}

export const CategoryListRoot: React.FC<ICategoryListRootProps> = (props) => {
  const {
    data,
    loading,
    error,
    refetch: refetchCategories,
  } = useGetUserCategoriesForListQuery();

  if (loading) {
    return <div>Loading Categories...</div>;
  } else if (error) {
    console.log(error);
    return <div>There was an error Loading Categories</div>;
  } else if (!data) {
    return <div>No data!</div>;
  } else {
    return (
      <CategoryList
        categories={data.getUserCategories}
        refetchCategories={refetchCategories}
      />
    );
  }
};
