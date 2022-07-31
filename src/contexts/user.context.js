import { createContext, useEffect, useReducer } from "react";
import {
	createUserDocumentFromAuth,
	onAuthStateChangeListener,
} from "../utils/firebase/firebase.utils";

// actual value of logged in User
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

export const ACTION = {
	SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
	console.log('dispatched');
	console.log(action);
	const { type, payload } = action;

	switch (type) {
		case ACTION.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload,
			};

		default:
			throw new Error(`Unhandled type ${type} in userReducer`);
	}
};

const INITIAL_STATE = {
	currentUser: null,
};

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
	
	const { currentUser } = state;
	// console.log(currentUser);

	const setCurrentUser = (user) => {
		dispatch({ type: ACTION.SET_CURRENT_USER, payload: user });
	};

	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		const unSubscribe = onAuthStateChangeListener((user) => {
			// console.log(user);
			if (user) {
				createUserDocumentFromAuth(user);
			}
			setCurrentUser(user);
		});

		return unSubscribe;
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
