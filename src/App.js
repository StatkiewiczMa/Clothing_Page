import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/sign-in.component";

const Shop = () => {
	return <div>This is Shop page!</div>;
};
const Contact = () => {
	return <div>This is Contact page!</div>;
};

const Cart = () => {
	return <div>This is Cart page!</div>;
};

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path='shop' element={<Shop />} />
				<Route path='contact' element={<Contact />} />
				<Route path='sign-in' element={<SignIn />} />
				<Route path='cart' element={<Cart />} />
			</Route>
		</Routes>
	);
};

export default App;
