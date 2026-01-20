import { useState } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ListComponent from './ListComponent';
import Lists from './Lists';

function Dashboard() {
    const [lists, setLists] = useState({});
    const [newListTitle, setNewListTitle] = useState('');

    const addList = () => {
        if (!newListTitle.trim()) return;
        const id = `list-${Date.now()}`;
        setLists(prev => ({
            ...prev,
            [id]: { title: newListTitle.trim(), items: [] }
        }));
        setNewListTitle('');
    };

    const addItem = (text, listId) => {
        const newItem = {
            id: `${listId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            text,
            source: listId,
        };
        setLists(prev => ({
            ...prev,
            [listId]: {
                ...prev[listId],
                items: [...prev[listId].items, newItem]
            }
        }));
    };

    const removeItem = (itemId, listId) => {
        setLists(prev => ({
            ...prev,
            [listId]: {
                ...prev[listId],
                items: prev[listId].items.filter(item => item.id !== itemId)
            }
        }));
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
                    onKeyDown={(e) => e.key === 'Enter' && addList()}
                />
                <Button variant="contained" startIcon={<AddIcon />} onClick={addList} disabled={!newListTitle.trim()}>
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
                            onAdd={addItem}
                            onRemove={(itemId) => removeItem(itemId, id)}
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
                <Lists items={allItems} />
            </Box>
        </Container>
    );
}

export default Dashboard;
