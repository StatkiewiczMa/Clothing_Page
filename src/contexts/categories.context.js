import { createContext, useEffect, useReducer } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

// actual value of logged in User
export const CategoriesContext = createContext({
	categoriesMap: {},
	setCategoriesMap: () => null,
});

const categoriesReducer = (state, action) => {
	const { type, payload } = action;
	// console.log(type, payload);
	switch (type) {
		case ACTION.SET_CATEGORIES_MAP:
			return {
				...state,
				categoriesMap: payload,
			};

		default:
			throw new Error(`Unhandled type ${type} in categoriesReducer`);
	}
};

const INITIAL_STATE = {
	categoriesMap: [],
};

const ACTION = {
	SET_CATEGORIES_MAP: "setCategoriesMap",
};

export const CategoriesProvider = ({ children }) => {
	const [state, dispatch] = useReducer(categoriesReducer, INITIAL_STATE);
	// console.log(state);
	const { categoriesMap } = state;
	const value = { categoriesMap };

	const setCategoriesMap = (categoryMap) => {
		dispatch({ type: ACTION.SET_CATEGORIES_MAP, payload: categoryMap });
	};
	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoryMap = await getCategoriesAndDocuments();
			setCategoriesMap(categoryMap);
		};
		getCategoriesMap();
	}, []);

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
