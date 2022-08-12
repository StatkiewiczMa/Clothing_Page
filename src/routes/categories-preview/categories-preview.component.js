import { Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";

import { useSelector } from "react-redux/es/hooks/useSelector";


const CategoriesPreview = () => {
  const categoriesMap = useSelector((state) => state.categories.categoriesMap);
  console.log(categoriesMap);

  return (
    <Fragment className='category-container'>
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
