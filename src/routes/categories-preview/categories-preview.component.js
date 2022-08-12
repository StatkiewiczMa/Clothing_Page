import { Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCategoriesMap } from "../../store/categories/category_selector";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
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
