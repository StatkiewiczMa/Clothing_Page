import { createSelector } from "reselect";
import { ReduxState } from "../store";
import { CategoriestState } from "./category-reducer";
import { CategoryMap } from "./category.types";
// jeżeli zmienią się categories
const selectCategoryReducer = (state:ReduxState): CategoriestState => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

//chce żeby się wykonywało tlyko jak się categories zmienią
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap);
  }
);

export const selectCategoryIfLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
