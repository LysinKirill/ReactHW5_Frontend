import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productApi } from '../../api/products';
import { IProductProps } from '../../components/ProductList/types';

interface ProductState {
    products: IProductProps[];
    filteredProducts: IProductProps[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductState = {
    products: [],
    filteredProducts: [],
    status: 'idle'
};

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
    const response = await productApi.getAll();
    return response.data;
});

export const addNewProduct = createAsyncThunk('products/add', async (product: Omit<IProductProps, 'id'>, { rejectWithValue }) => {
    try {
        const response = await productApi.create(product);
        return response.data;
    } catch  (error) {
        return rejectWithValue(`Failed to add product ${error}`);
    }
});

export const updateExistingProduct = createAsyncThunk('products/update', async (product: IProductProps) => {
    await productApi.update(product.id, product);
    return product;
});

export const deleteExistingProduct = createAsyncThunk('products/delete', async (id: number) => {
    await productApi.delete(id);
    return id;
});

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilteredProducts: (state, action) => {
            state.filteredProducts = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
                state.filteredProducts = action.payload;
            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
                state.filteredProducts.push(action.payload)
            })
            .addCase(updateExistingProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p.id === action.payload.id);
                const filteredIndex = state.filteredProducts.findIndex(p => p.id === action.payload.id);
                if (index !== -1) state.products[index] = action.payload;
                if (filteredIndex !== -1) state.filteredProducts[index] = action.payload;
            })
            .addCase(deleteExistingProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p.id !== action.payload);
                state.filteredProducts = state.filteredProducts.filter(p => p.id !== action.payload);
            });
    }
});

export const { setFilteredProducts } = productSlice.actions;
export default productSlice.reducer;