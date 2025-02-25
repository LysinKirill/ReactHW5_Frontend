import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {addNewCategory, deleteCategory, setCategories, updateCategory} from '../features/categories/categorySlice';
import {Button, Dialog, TextField, Box, Typography, List, ListItem, IconButton, Paper} from '@mui/material';
import { ICategoryProps } from './ProductList/types.ts';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Snackbar, Alert } from '@mui/material';
import {useAppDispatch} from "../store/hooks.ts";

const CategoriesPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const categories = useSelector((state: RootState) => state.categories.categories);

    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editedCategory, setEditedCategory] = useState<ICategoryProps | null>(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false); // For notifications
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Notification message
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');


    const handleAddCategory = () => {
        setAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setAddModalOpen(false);
        setNewCategoryName('');
    };

    const handleAddCategorySave = async () => {
        if (newCategoryName.trim()) {
            try {
                await dispatch(addNewCategory({ name: newCategoryName })).unwrap(); // unwrap() throws an error if the thunk fails
                setSnackbarMessage('Category added successfully!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                handleCloseAddModal();
            } catch (error) {
                setSnackbarMessage('Failed to add category. Please try again.');
                setSnackbarSeverity('error');
                console.log(error);
                setSnackbarOpen(true);
            }
        }
    };

    const handleEditCategory = (category: ICategoryProps) => {
        setEditedCategory(category);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setEditedCategory(null);
    };

    const handleEditCategorySave = async () => {
        if (editedCategory) {
            const updatedCategories = categories.map((cat) =>
                cat.id === editedCategory.id ? editedCategory : cat
            );

            try {
                await dispatch(updateCategory(editedCategory)).unwrap();
                setSnackbarMessage('Category deleted successfully!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            } catch {
                setSnackbarMessage('Failed to delete category. Please try again.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }

            dispatch(setCategories(updatedCategories));
            handleCloseEditModal();
        }
    };

    const handleDeleteCategory = async (id: number) => {
        const updatedCategories = categories.filter((cat) => cat.id !== id);
        try {
            await dispatch(deleteCategory(id)).unwrap();
            setSnackbarMessage('Category deleted successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch {
            setSnackbarMessage('Failed to delete category. Please try again.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }

        dispatch(setCategories(updatedCategories));
    };

    return (

        <Paper elevation={3} sx={{maxWidth: 800, margin: '20px auto', padding: 3}}>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4">Categories</Typography>
            <Button variant="contained" onClick={handleAddCategory} sx={{ mt: 2 }}>
                Add Category
            </Button>

            <List>
                {categories.map((category) => (
                    <ListItem key={category.id}>
                        <Typography variant="body1">{category.name}</Typography>
                        <IconButton onClick={() => handleEditCategory(category)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteCategory(category.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>


            <Dialog open={isAddModalOpen} onClose={handleCloseAddModal}>
                <Box sx={{ padding: 4 }}>
                    <Typography variant="h6">Add New Category</Typography>
                    <TextField
                        label="Category Name"
                        fullWidth
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <Button variant="contained" onClick={handleAddCategorySave} sx={{ mt: 2 }}>
                        Save
                    </Button>
                </Box>
            </Dialog>


            <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
                <Box sx={{ padding: 4 }}>
                    <Typography variant="h6">Edit Category</Typography>
                    <TextField
                        label="Category Name"
                        fullWidth
                        value={editedCategory?.name || ''}
                        onChange={(e) =>
                            setEditedCategory({
                                ...editedCategory!,
                                name: e.target.value,
                            })
                        }
                        sx={{ mt: 2 }}
                    />
                    <Button variant="contained" onClick={handleEditCategorySave} sx={{ mt: 2 }}>
                        Save
                    </Button>
                </Box>
            </Dialog>
        </Box>
        </Paper>
    );
};

export default CategoriesPage;
