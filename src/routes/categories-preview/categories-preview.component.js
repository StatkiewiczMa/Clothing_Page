import { Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";

import { useSelector } from "react-redux/es/hooks/useSelector";

import "./categories-preview.styles.scss";

const CategoriesPreview = () => {
  const categoriesMap = useSelector((state) => state.categories.categoriesMap);
  console.log(categoriesMap);
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        // console.log("Products:", products);
        return (
          <CategoryPreview
            key={title}
            title={title}
            products={products}
          ></CategoryPreview>
        );
      })}
    </Fragment>
  );
};
export default CategoriesPreview;
