import { Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";

import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  selectCategoriesMap,
  selectCategoryIfLoading,
} from "../../store/categories/category_selector";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoryIfLoading);
  
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview
              key={title}
              title={title}
              products={products}
            ></CategoryPreview>
          );
        })
      )}
    </Fragment>
  );
};
export default CategoriesPreview;
