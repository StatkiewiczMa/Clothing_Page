import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

//my own middleware
// const loggerMiddleware = (store) => (next) => (action) => {
//   if (!action.type) {
//     return next(action);
//   }

//   console.log("type: ", action.type);
//   console.log("payload: ", action.payload);
//   console.log("currentState: ", store.getState());

//   next(action);

//   console.log("next state: ", store.getState());
// };

// Zamiar jest taki, że łapią akcje przed reducerami i wyrzucają stan
const middleWares = [logger];
// dopiero działają jak się użyje takiego zlepka funkcji
//compose to sposób żeby przekazać kilka funkcji naraz od lewa do prawa
const composeEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composeEnhancers);
