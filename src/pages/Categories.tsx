import React from "react";
import { useUserQuery, UserQuery } from "../generated/graphql";
import CategoryList from "../Components/categoryListComonents/CategoryList";

interface ICategoriesProps {}

const Categories: React.FC<ICategoriesProps> = (props) => {
  const { data, loading, refetch: refetchUserQuery } = useUserQuery();
  let categories: UserQuery["user"]["categories"] = [];

  if (data && data.user) {
    categories = data.user.categories;
  }
  return (
    <div>
      {loading ? <div>Loading..</div> : null}
      {categories && !loading ? (
        <CategoryList
          categories={categories.sort((a, b) => {
            if (b.name > a.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
          })}
          refetchUserQuery={refetchUserQuery}
        />
      ) : (
        <div>No categories</div>
      )}
    </div>
  );
};

export default Categories;
