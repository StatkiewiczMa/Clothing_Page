export type CategoryItem = {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  id: number;
};

export type Category = {
  title: string;
  imageUrl: string;
  product: CategoryItem;
};

export type CategoryMap = {
  [key: string]: CategoryItem[];
};

export const CATEGORIES_ACTION_TYPES = {
  FETCH_CATEGORIES_START: "FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS: "FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILED: "FETCH_CATEGORIES_FAILED",
};
