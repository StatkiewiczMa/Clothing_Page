import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { CategoryContainer, CategoryTitle } from "./category.styles";
import {
  selectCategoriesMap,
  selectCategoryIfLoading,
} from "../../store/categories/category_selector";
import Spinner from "../../components/spinner/spinner.component";

type CategoryRouteParam = {
  category: string;
};

const Category = () => {
  const { category } = useParams<
    keyof CategoryRouteParam
  >() as CategoryRouteParam;
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoryIfLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};
export default Category;
