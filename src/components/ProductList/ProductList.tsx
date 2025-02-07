﻿import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/hooks';
import {
    Box, Grid, Pagination, IconButton, Button, Modal, TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductCard from '../Card/Card';
import { RootState } from '../../store/store';
import { deleteProduct, addProduct } from '../../features/products/productSlice';
import {IProductProps} from "./types.ts";

const ProductList: React.FC = () => {
    const products = useSelector((state: RootState) => state.products.filteredProducts);
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        quantity: '',
        category: '',
        price: ''
    });

    const itemsPerPage = 8;

    const handleChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteProduct = (id: number) => {
        dispatch(deleteProduct(id));
    };

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = () => {
        if (newProduct.name && newProduct.quantity) {
            const product : IProductProps = {
                id: 0,
                name: newProduct.name,
                description: newProduct.description,
                quantity: parseInt(newProduct.quantity),
                category: newProduct.category,
                price: parseInt(newProduct.price)
            };
            dispatch(addProduct(product));
            setNewProduct({
                name: newProduct.name,
                description: newProduct.description,
                quantity: newProduct.quantity,
                category: newProduct.category,
                price: newProduct.price
            });
            handleCloseModal();
        }
    };

    const paginatedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                    Add Product
                </Button>
            </Box>

            <Grid container spacing={0.5} justifyContent={products.length > 0 ? 'flex-start' : 'center'}>
                {paginatedProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id}>
                        <Box sx={{ position: 'relative',
                            transition: "transform 0.3s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.05)",
                                cursor: "pointer",
                            },
                        }}>
                            <ProductCard {...product} />
                            <IconButton
                                onClick={() => handleDeleteProduct(product.id)}
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 50,
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 0, 0, 0.8)',
                                    },
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {products.length === 0 && (
                <Box sx={{ textAlign: 'center', width: '100%', color: '#fff', fontSize: '1.2rem' }}>
                    No products available.
                </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Pagination
                    count={Math.ceil(products.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="primary"
                />
            </Box>

            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 24,
                        width: 400,
                    }}
                >
                    <h2>Add New Product</h2>
                    <TextField
                        fullWidth
                        label="Product Name"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={newProduct.description}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Quantity"
                        name="quantity"
                        type="number"
                        value={newProduct.quantity}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Category"
                        name="category"
                        value={newProduct.category}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Price"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddProduct}
                        sx={{ marginTop: 2 }}
                    >
                        Add Product
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default ProductList;
