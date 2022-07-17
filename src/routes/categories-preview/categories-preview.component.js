import { Fragment, useContext } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../contexts/categories.context";

import "./categories-preview.styles.scss";

const CategoriesPreview = () => {
	const { categoriesMap } = useContext(CategoriesContext);

	return (
		<Fragment className='category-container'>
			{Object.keys(categoriesMap).map((title) => {
				const products = categoriesMap[title];
				console.log("Products:", products);
				return (
					<CategoryPreview
						key={title}
						title={title}
						products={products}></CategoryPreview>
				);
			})}
		</Fragment>
	);
};
export default CategoriesPreview;
