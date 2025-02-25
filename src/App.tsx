import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar.tsx';
import ProductList from './components/ProductList/ProductList.tsx';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchProducts, setFilteredProducts } from './features/products/productSlice';
import { fetchCategories, setCategories } from './features/categories/categorySlice';
import { IProductProps } from "./components/ProductList/types.ts";
import ProductDetails from "./components/ProductDetails/ProductDetails.tsx";
import CategoriesPage from "./components/CategoriesPage.tsx";
import UserProfile from "./components/UserProfile/UserProfile.tsx";
import { Snackbar, Alert } from '@mui/material';
import axios from "axios";

const App: React.FC = () => {
    const [apiAvailable, setApiAvailable] = useState(true);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const checkApiHealth = async () => {
            try {
                console.log(`${import.meta.env.VITE_API_BASE_URL}/health`);
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/health`);
                if (response.data !== 'OK' && response.data.status !== 200) {
                    setApiAvailable(false);
                }
            } catch {
                setApiAvailable(false);
            }
        };

        checkApiHealth();
    }, []);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);
    const { categories, products, filteredProducts } = useAppSelector((state) => ({
        products: state.products.products,
        filteredProducts: state.products.filteredProducts,
        categories: state.categories.categories,
    }));

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isInStock, setIsInStock] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        handleApplyFilters();
    };

    const handleToggleInStock = (checked: boolean) => {
        setIsInStock(checked);
        handleApplyFilters();
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        handleApplyFilters();
    };

    const handleApplyFilters = () => {
        let filteredProducts = products;

        if (searchQuery) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (isInStock) {
            filteredProducts = filteredProducts.filter(product => product.quantity > 0);
        }

        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
        }

        dispatch(setFilteredProducts(filteredProducts));
    };

    const handleResetFilters = () => {
        setSearchQuery('');
        setIsInStock(false);
        setSelectedCategory('');
        dispatch(setFilteredProducts(products));
    };

    useEffect(() => {
        dispatch(setCategories(getUniqueCategories(products)));
    }, [dispatch, products, filteredProducts]);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#101022', overflow: 'hidden', width: '100vw' }}>
            <Snackbar
                open={!apiAvailable}
                autoHideDuration={6000}
                onClose={() => setApiAvailable(true)}
            >
                <Alert severity="error">
                    The API is not available. Please check your connection and try again.
                </Alert>
            </Snackbar>
            <NavigationBar toggleSidebar={toggleSidebar} />
            <Box sx={{ display: 'flex', flex: 1, marginTop: '64px', overflow: 'hidden', width: '100%' }}>
                <Sidebar
                    isOpen={isSidebarOpen}
                    onSearch={handleSearch}
                    onToggleInStock={handleToggleInStock}
                    onCategoryChange={handleCategoryChange}
                    onApplyFilters={handleApplyFilters}
                    onResetFilters={handleResetFilters}
                    categories={categories.map(x => x.name)}
                />
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 2,
                        backgroundColor: '#101022',
                        overflow: 'hidden',
                        marginLeft: isSidebarOpen ? '15rem' : '0', // Adjust margin based on sidebar state
                        transition: 'margin-left 0.3s ease-in-out', // Smooth transition
                    }}
                >
                    <Routes>
                        <Route path="/products/:id" element={<ProductDetails />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/" element={<ProductList />} />
                        <Route path="/categories" element={<CategoriesPage />} />
                        <Route path="/user" element={<UserProfile name="Sample fullname" email="sample_email@gmail.com" group="sample group" avatarUrl="/src/assets/priemlemo.png" />} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    );
};

const getUniqueCategories = (products: IProductProps[]) => {
    return [...new Set(products.map(p => p.category))].map((name, index) => ({
        id: index + 1,
        name
    }));
};

export default App;