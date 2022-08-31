import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { checkUserSession } from "./store/user/user.action";
import { useDispatch } from "react-redux/es/exports";
import Spinner from "./components/spinner/spinner.component";

import { GlobalStyle } from "./global.styles";

const Navigation = lazy(() => import("./routes/navigation/navigation.component"));
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));
const Home = lazy(() => import("./routes/home/home.component"));
const Authentication = lazy(
  () => import("./routes/authentication/authentication.component")
);

const Contact = () => {
  return <div>This is Contact page!</div>;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle/>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="contact" element={<Contact />} />
          <Route path="authentication" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
