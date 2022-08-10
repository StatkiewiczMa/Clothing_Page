import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import "./index.scss";
import App from "./App";

import { UserProvider } from "./contexts/user.context";

import { CartDropdownProvider } from "./contexts/cart-dropdown.context";
import { CategoriesProvider } from "./contexts/categories.context";
import { Provider } from "react-redux";
import { store } from "./store/store";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<UserProvider>
					<CategoriesProvider>
						<CartDropdownProvider>
							<App />
						</CartDropdownProvider>
					</CategoriesProvider>
				</UserProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
