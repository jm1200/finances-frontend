import React from "react";
import { useUserQuery, UserQuery } from "../generated/graphql";
import CategoryList from "../Components/categoryListComonents/CategoryList";

interface ICategoriesProps {}

const Categories: React.FC<ICategoriesProps> = (props) => {
  const { data, loading } = useUserQuery();
  let categories: UserQuery["user"]["categories"] = [];

  if (data && data.user) {
    categories = data.user.categories;
  }
  console.log(categories);

  return (
    <div>
      {loading ? <div>Loading..</div> : null}
      {categories && !loading ? (
        // <ul>
        //   {categories.map((category) => (
        //     <li key={category.name}>{category.name}</li>
        //   ))}
        // </ul>
        <CategoryList categories={categories} />
      ) : (
        <div>No categories</div>
      )}
    </div>
  );
};

export default Categories;
