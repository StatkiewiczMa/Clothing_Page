import { compose, createStore, applyMiddleware, Middleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

export type ReduxState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<ReduxState> & {
  whitelist: (keyof ReduxState)[]
}

const persistConfig:ExtendedPersistConfig = {
  key: "root",
  storage: storage, // local stora
  whitelist: ["cart"],
};
// Zamiar jest taki, że łapią akcje przed reducerami i wyrzucają stan
const sagaMiddleware = createSagaMiddleware();
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  thunk,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));
// na górze type predica ment
// dopiero działają jak się użyje takiego zlepka funkcji
//compose to sposób żeby przekazać kilka funkcji naraz od lewa do prawa

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));



const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
