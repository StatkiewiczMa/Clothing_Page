import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// Zamiar jest taki, że łapią akcje przed reducerami i wyrzucają stan  
const middleWares = [logger];
// dopiero działają jak się użyje takiego zlepka funkcji
//compose to sposób żeby przekazać kilka funkcji naraz od lewa do prawa
const composeEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composeEnhancers);
