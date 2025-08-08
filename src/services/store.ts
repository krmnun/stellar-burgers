import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/ingredientsSlice';
import orderReducer from './reducers/newOrderSlice';
import feedReducer from './reducers/feedSlice';
import userReducer from './reducers/userSlice';
import ordersReducer from './reducers/ordersSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  feed: feedReducer,
  user: userReducer,
  orders: ordersReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => dispatchHook<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
