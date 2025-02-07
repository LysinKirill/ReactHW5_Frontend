import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { deleteProduct, updateProduct } from '../../features/products/productSlice';
import {Button, Typography, Box, TextField, Dialog, Paper} from '@mui/material';
import {IProductProps} from "../ProductList/types.ts";

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const product = useSelector((state: RootState) =>
        state.products.products.find((p) => p.id === parseInt(id || ''))
    );

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editedProduct, setEditedProduct] = useState<IProductProps>(product!);

    if (!product) return <Typography>Product not found.</Typography>;

    const handleEdit = () => setEditModalOpen(true);

    const handleDelete = () => {
        dispatch(deleteProduct(product.id));
        navigate('/products');
    };

    const handleSave = () => {
        dispatch(updateProduct(editedProduct));
        setEditModalOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedProduct({
            ...editedProduct,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Paper elevation={3} sx={{maxWidth: 800, margin: '20px auto', padding: 3}}>
        <Box sx={{ p: 4}}>
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
                    <TextField
                        fullWidth
                        label="Category"
                        name="category"
                        value={editedProduct.category}
                        onChange={handleInputChange}
                        margin="normal"
                    />
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
