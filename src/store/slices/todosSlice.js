import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { todosApi } from '../../api/api';

// Async Thunks
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const data = await todosApi.getAll();
    return data.todos;
});

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (initialTodo) => {
    return await todosApi.add(initialTodo);
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, changes }) => {
    return await todosApi.update(id, changes);
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
    return await todosApi.delete(id);
});

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Todos
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Only set items if empty to avoid overwriting persisted data/local edits if we were to act like a real cache,
                // but for this demo, we replace or append. 
                // Since this is "external" data, usually we replace.
                state.items = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Add Todo
            .addCase(addNewTodo.fulfilled, (state, action) => {
                // We manually add it to the list because the API is a mock and won't return it on next fetch
                state.items.push(action.payload);
            })
            // Update Todo
            .addCase(updateTodo.fulfilled, (state, action) => {
                const index = state.items.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            // Delete Todo
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.items = state.items.filter(todo => todo.id !== action.payload.id);
            });
    }
});

export default todosSlice.reducer;
