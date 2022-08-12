import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { setCategoriesMap } from "../../store/categories/category.action";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import { useDispatch } from "react-redux/es/hooks/useDispatch";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    debugger;
    console.log("Hey hey, shop");
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
      dispatch(setCategoriesMap(categoryMap));
    };
    getCategoriesMap();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;
