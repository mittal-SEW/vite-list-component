import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addNewTodo, deleteTodo, updateTodo } from '../store/slices/todosSlice';
import {
    Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction,
    IconButton, Checkbox, TextField, Button, CircularProgress, Alert, Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const TodoIntegration = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.todos);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTodos());
        }
    }, [status, dispatch]);

    const handleAdd = () => {
        if (newTodo.trim()) {
            dispatch(addNewTodo({
                todo: newTodo,
                completed: false,
                userId: 5 // Mock user ID
            }));
            setNewTodo('');
        }
    };

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    };

    const handleToggle = (id, completed, currentText, userId) => {
        dispatch(updateTodo({
            id,
            changes: { completed: !completed }
        }));
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 4, maxHeight: '600px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'text.primary' }}>
                External API Todos (DummyJSON)
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                    fullWidth
                    size="small"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new external task..."
                    onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                />
                <Button variant="contained" onClick={handleAdd} startIcon={<AddIcon />}>
                    Add
                </Button>
            </Box>

            {status === 'loading' && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 2 }} />}

            {status === 'failed' && <Alert severity="error">{error}</Alert>}

            {status === 'succeeded' && (
                <List sx={{ overflow: 'auto', flexGrow: 1 }}>
                    {items.map((todo) => (
                        <ListItem key={todo.id} divider>
                            <Checkbox
                                edge="start"
                                checked={todo.completed}
                                onChange={() => handleToggle(todo.id, todo.completed, todo.todo, todo.userId)}
                            />
                            <ListItemText
                                primary={todo.todo}
                                sx={{
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    color: todo.completed ? 'text.secondary' : 'text.primary'
                                }}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(todo.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            )}
        </Paper>
    );
};

export default TodoIntegration;
