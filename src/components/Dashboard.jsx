import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Container, Typography, Box, TextField, Button, Snackbar, Alert,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ListComponent from './ListComponent';
import Lists from './Lists';
import TodoIntegration from './TodoIntegration';
import { addList, deleteList, addItem, removeItem } from '../store/slices/listsSlice';

function Dashboard() {
    const dispatch = useDispatch();
    const lists = useSelector((state) => state.lists.lists);
    const [newListTitle, setNewListTitle] = useState('');
    const [error, setError] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, listId: null });
    const [newlyCreatedListId, setNewlyCreatedListId] = useState(null);

    useEffect(() => {
        if (newlyCreatedListId) {
            const timer = setTimeout(() => setNewlyCreatedListId(null), 100);
            return () => clearTimeout(timer);
        }
    }, [newlyCreatedListId]);

    const handleAddList = () => {
        const title = newListTitle.trim();
        if (!title) return;

        const isDuplicate = Object.values(lists).some(
            list => list.title.toLowerCase() === title.toLowerCase()
        );

        if (isDuplicate) {
            setError(`A list with the name "${title}" already exists.`);
            return;
        }

        const id = `list-${Date.now()}`;
        dispatch(addList({ id, title }));
        setNewListTitle('');
        setNewlyCreatedListId(id);
    };

    const handleAddItem = (text, listId) => {
        const newItem = {
            id: `${listId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            text,
            source: lists[listId].title,
            createdAt: new Date().toISOString(),
        };
        dispatch(addItem({ listId, item: newItem }));
    };

    const handleRemoveItem = (itemId, listId) => {
        dispatch(removeItem({ listId, itemId }));
    };

    const removeItemFromAggregate = (itemId) => {
        const listId = itemId.split('-')[0] + '-' + itemId.split('-')[1];
        handleRemoveItem(itemId, listId);
    };

    const openDeleteConfirmation = (listId) => {
        const list = lists[listId];
        if (list.items.length > 0) {
            setDeleteDialog({ open: true, listId });
        } else {
            confirmDelete(listId);
        }
    };

    const confirmDelete = (listId) => {
        dispatch(deleteList(listId));
        setDeleteDialog({ open: false, listId: null });
    };

    const allItems = Object.values(lists).flatMap(list => list.items);

    return (
        <Container maxWidth="xl" sx={{ py: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}>
                Dashboard
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center' }}>
                <TextField
                    size="small"
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    placeholder="New list name..."
                    onKeyDown={(e) => e.key === 'Enter' && handleAddList()}
                />
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddList} disabled={!newListTitle.trim()}>
                    Add List
                </Button>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {Object.entries(lists).map(([id, list]) => (
                    <Box key={id} sx={{ flex: '1 1 300px', minWidth: 0 }}>
                        <ListComponent
                            title={list.title}
                            source={id}
                            items={list.items}
                            onAdd={handleAddItem}
                            onRemove={(itemId) => handleRemoveItem(itemId, id)}
                            onDelete={openDeleteConfirmation}
                            autoFocus={id === newlyCreatedListId}
                        />
                    </Box>
                ))}
            </Box>

            {Object.keys(lists).length === 0 && (
                <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 4 }}>
                    No lists yet. Create one above!
                </Typography>
            )}

            <Box sx={{ mt: 4 }}>
                <Lists items={allItems} onRemove={removeItemFromAggregate} />
            </Box>

            <Box sx={{ mt: 4 }}>
                <TodoIntegration />
            </Box>

            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setError(null)} severity="error" variant="filled" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

            {/* Professional Deletion Dialog */}
            <Dialog
                open={deleteDialog.open}
                onClose={() => setDeleteDialog({ open: false, listId: null })}
                PaperProps={{
                    sx: { borderRadius: 2, p: 1 }
                }}
            >
                <DialogTitle sx={{ fontWeight: 700, color: 'error.main' }}>
                    Confirm Deletion
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        The list <strong>"{deleteDialog.listId && lists[deleteDialog.listId]?.title}"</strong> has {deleteDialog.listId && lists[deleteDialog.listId]?.items.length} items.
                        <br /><br />
                        Are you sure you want to delete it? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button
                        onClick={() => setDeleteDialog({ open: false, listId: null })}
                        variant="outlined"
                        color="inherit"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => confirmDelete(deleteDialog.listId)}
                        variant="contained"
                        color="error"
                        autoFocus
                    >
                        Delete List
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default Dashboard;
