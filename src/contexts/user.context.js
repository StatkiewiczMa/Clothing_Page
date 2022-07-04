import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangeListener } from "../utils/firebase/firebase.utils";

// actual value of logged in User
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		const unSubscribe = onAuthStateChangeListener((user) => {
			console.log(user);
            if(user){
             createUserDocumentFromAuth(user);
            }
			setCurrentUser(user);
		});

		return unSubscribe;
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};