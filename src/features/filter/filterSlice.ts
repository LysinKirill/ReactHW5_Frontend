import { createSlice } from '@reduxjs/toolkit';

interface FilterState {
    searchQuery: string;
    inStock: boolean;
    selectedCategory: string;
}

const initialState: FilterState = {
    searchQuery: '',
    inStock: false,
    selectedCategory: '',
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        },
        setInStockFilter(state, action) {
            state.inStock = action.payload;
        },
        setCategory(state, action) {
            state.selectedCategory = action.payload;
        },
    },
});

export const { setSearchQuery, setInStockFilter, setCategory } = filterSlice.actions;
export default filterSlice.reducer;
