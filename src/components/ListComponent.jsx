import { useState, useRef, useEffect } from 'react';
import { Paper, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ListComponent({ title, source, items, onAdd, onRemove, onDelete, autoFocus }) {
    const [text, setText] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text.trim(), source);
            setText('');
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h5" sx={{ color: 'primary.dark', fontWeight: 600 }}>
                    {title}
                </Typography>
                <IconButton
                    onClick={() => onDelete(source)}
                    color="error"
                    size="small"
                    sx={{ mt: -0.5, mr: -1 }}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                    size="small"
                    fullWidth
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add item..."
                    variant="outlined"
                    inputRef={inputRef}
                />
                <Button variant="contained" type="submit" disabled={!text.trim()}>
                    Add
                </Button>
            </Box>

            <List sx={{ flexGrow: 1, overflow: 'auto', maxHeight: 300, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                {items.map((item) => (
                    <ListItem
                        key={item.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => onRemove(item.id)} color="error" size="small">
                                <DeleteIcon />
                            </IconButton>
                        }
                        divider
                    >
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
                {items.length === 0 && (
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
                        No items yet. Add one above!
                    </Typography>
                )}
            </List>
        </Paper>
    );
}
