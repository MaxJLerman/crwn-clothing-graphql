import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [logger, sagaMiddleware];

const composedEnhancers = compose(applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);