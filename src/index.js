import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import "./index.scss";
import App from "./App";

import { UserProvider } from "./contexts/user.context";
import { ProductsProvider } from "./contexts/products.context";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<UserProvider>
				<ProductsProvider>
				<App />

				</ProductsProvider>
			</UserProvider>
		</BrowserRouter>
	</React.StrictMode>
);

reportWebVitals();
