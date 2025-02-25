import React, { useState } from 'react';
import {
    Box,
    InputBase,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    InputAdornment,
    IconButton
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setCategory, setSearchQuery, setInStockFilter } from '../../features/filter/filterSlice';

export interface SidebarProps {
    isOpen: boolean;
    onSearch: (query: string) => void;
    onToggleInStock: (checked: boolean) => void;
    onCategoryChange: (category: string) => void;
    onApplyFilters: () => void;
    onResetFilters: () => void;
    categories: string[];
}


const Sidebar: React.FC<SidebarProps> = ({
                                             isOpen,
                                             onSearch,
                                             onToggleInStock,
                                             onCategoryChange,
                                             onApplyFilters,
                                             onResetFilters
                                         }) => {
    const dispatch = useDispatch();

    const categories = useSelector((state: RootState) => state.categories.categories);
    const searchQuery = useSelector((state: RootState) => state.filter.searchQuery);
    const isInStock = useSelector((state: RootState) => state.filter.inStock);

    const [selectedCategory, setSelectedCategory] = useState("");

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        onCategoryChange(value);
        dispatch(setCategory(value));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        onSearch(query);
        dispatch(setSearchQuery(query));
    };

    const handleInStockChange = (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        onToggleInStock(checked);
        dispatch(setInStockFilter(checked));
    };

    const handleClearSearch = () => {
        dispatch(setSearchQuery(''));
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 80,
                left: 0,
                bottom: 0,
                width: '15rem',
                padding: '16px',
                backgroundColor: 'rgb(3, 3, 23)',
                borderRight: '1px solid #080b2e',
                transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
                transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? 'auto' : 'none',
                zIndex: 2,
            }}
        >
            <Box sx={{ mb: 2 }}>
                <InputBase
                    placeholder="Search products..."
                    sx={{
                        width: '100%',
                        backgroundColor: '#090d3c',
                        color: '#5f62ae',
                        padding: '8px',
                        borderRadius: 1,
                    }}
                    onChange={handleSearchChange}
                    value={searchQuery}
                    endAdornment={
                        searchQuery ? (
                            <InputAdornment position="end">
                                <IconButton onClick={handleClearSearch} sx={{ color: '#5f62ae' }}>
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        ) : null
                    }
                />
            </Box>

            <Box sx={{ mb: 2 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            sx={{
                                color: '#5f62ae',
                                '&.Mui-checked': {
                                    color: '#5f62ae',
                                },
                            }}
                            onChange={handleInStockChange}
                            checked={isInStock}
                        />
                    }
                    label="Show only items in stock"
                    sx={{
                        color: '#5f62ae',
                    }}
                />
            </Box>

            <Box sx={{ mb: 2 }}>
                <FormControl fullWidth>
                    <InputLabel sx={{ color: '#5f62ae' }}>Category</InputLabel>
                    <Select
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        sx={{
                            backgroundColor: '#090d3c',
                            color: '#5f62ae',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#5f62ae',
                            },
                            '&:focus .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#5f62ae',
                            },
                        }}
                    >
                        <MenuItem value="">All Categories</MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.name}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button
                    onClick={onResetFilters}
                    sx={{
                        width: '100%',
                        padding: '8px',
                        backgroundColor: '#333',
                        color: '#fff',
                        marginTop: '10px',
                        borderRadius: 1,
                    }}
                >
                    Reset Filters
                </Button>

                <Button
                    onClick={onApplyFilters}
                    sx={{
                        width: '100%',
                        padding: '8px',
                        backgroundColor: '#5f62ae',
                        color: '#fff',
                        marginTop: '10px',
                        borderRadius: 1,
                    }}
                >
                    Apply Filters
                </Button>
            </Box>
        </Box>
    );
};

export default Sidebar;
