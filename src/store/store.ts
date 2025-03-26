// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';
import categoryReducer from '../features/categories/categorySlice';
import modalReducer from '../features/modal/modalSlice';
import sidebarReducer from '../features/sidebar/sidebarSlice';
import filterReducer from '../features/filter/filterSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
    modal: modalReducer,
    sidebar: sidebarReducer,
    filter: filterReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;