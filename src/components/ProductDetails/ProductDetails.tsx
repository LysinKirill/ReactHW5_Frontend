import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
    deleteExistingProduct,
    updateExistingProduct,
} from '../../features/products/productSlice';
import { fetchCategories } from '../../features/categories/categorySlice';
import {
    Button,
    Typography,
    Box,
    TextField,
    Dialog,
    Paper,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    SelectChangeEvent
} from '@mui/material';
import { IProductProps } from "../ProductList/types.ts";
import { useAppDispatch } from "../../store/hooks.ts";

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const product = useSelector((state: RootState) =>
        state.products.products.find((p) => p.id === parseInt(id || ''))
    );
    const categories = useSelector((state: RootState) => state.categories.categories);

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editedProduct, setEditedProduct] = useState<IProductProps>(product!);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    if (!product) return <Typography>Product not found.</Typography>;

    const handleEdit = () => setEditModalOpen(true);

    const handleDelete = () => {
        dispatch(deleteExistingProduct(product.id));
        navigate('/products');
    };

    const handleSave = () => {
        dispatch(updateExistingProduct(editedProduct));
        setEditModalOpen(false);
    };

    const handleBack = () => {
        navigate("/");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedProduct({
            ...editedProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setEditedProduct({
            ...editedProduct,
            category: event.target.value,
        });
    };

    return (
        <Paper elevation={3} sx={{ maxWidth: 800, margin: '20px auto', padding: 3 }}>
            <Box sx={{ p: 4 }}>
                <Typography variant="h4">{product.name}</Typography>
                <Typography variant="body1">{product.description}</Typography>
                <Typography>Category: {product.category}</Typography>
                <Typography>Quantity: {product.quantity}</Typography>
                <Typography>Price: {product.price} USD</Typography>

                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={handleEdit} sx={{ mr: 2 }}>
                        Edit Product
                    </Button>
                    <Button variant="contained" color="error" onClick={handleDelete}>
                        Delete Product
                    </Button>
                    <Button variant="contained" onClick={handleBack} sx={{ ml: 2 }}>
                        Back
                    </Button>
                </Box>

                <Dialog open={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
                    <Box sx={{ p: 4 }}>
                        <Typography variant="h6">Edit Product</Typography>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={editedProduct.name}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={editedProduct.description}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={editedProduct.category}
                                onChange={handleCategoryChange}
                                label="Category"
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.name}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Quantity"
                            name="quantity"
                            type="number"
                            value={editedProduct.quantity}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            type="number"
                            value={editedProduct.price}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
                            Save
                        </Button>
                    </Box>
                </Dialog>
            </Box>
        </Paper>
    );
};

export default ProductDetails;