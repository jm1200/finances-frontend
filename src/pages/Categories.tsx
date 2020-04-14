import React from "react";
import { useUserQuery } from "../generated/graphql";

interface ICategoriesProps {}

const Categories: React.FC<ICategoriesProps> = (props) => {
  const { data, loading } = useUserQuery();
  let categories;

  if (data && data.user) {
    categories = data.user.categories;
  }
  console.log(categories);

  return (
    <div>
      <h1>Categories Component</h1>
      {loading ? <div>Loading..</div> : null}
      {categories && !loading ? (
        <ul>
          {categories.map((category) => (
            <li key={category.name}>{category.name}</li>
          ))}
        </ul>
      ) : (
        <div>No categories</div>
      )}
    </div>
  );
};

export default Categories;
