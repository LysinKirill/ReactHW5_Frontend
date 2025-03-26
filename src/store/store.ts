import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import categoryReducer from '../features/categories/categorySlice';
import modalReducer from '../features/modal/modalSlice';
import sidebarReducer from '../features/sidebar/sidebarSlice';
import filterReducer from '../features/filter/filterSlice';
import authReducer from '../features/auth/authSlice';
import logger from 'redux-logger';

export const store = configureStore({
    reducer: {
        auth: authReducer, // Add this
        products: productReducer,
        categories: categoryReducer,
        modal: modalReducer,
        sidebar: sidebarReducer,
        filter: filterReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;