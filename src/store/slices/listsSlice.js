import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lists: {
        'list-1': {
            title: 'List 1',
            items: [
                {
                    id: 'list-1-initial-1',
                    text: 'SEW',
                    source: 'List 1',
                    createdAt: new Date().toISOString(),
                }
            ]
        },
        'list-2': {
            title: 'List 2',
            items: [
                {
                    id: 'list-2-initial-1',
                    text: 'Smart Energy Water',
                    source: 'List 2',
                    createdAt: new Date().toISOString(),
                }
            ]
        }
    },
};

const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        addList: (state, action) => {
            const { id, title } = action.payload;
            state.lists[id] = { title, items: [] };
        },
        deleteList: (state, action) => {
            delete state.lists[action.payload];
        },
        addItem: (state, action) => {
            const { listId, item } = action.payload;
            state.lists[listId].items.push(item);
        },
        removeItem: (state, action) => {
            const { listId, itemId } = action.payload;
            state.lists[listId].items = state.lists[listId].items.filter(
                (item) => item.id !== itemId
            );
        },
    },
});

export const { addList, deleteList, addItem, removeItem } = listsSlice.actions;
export default listsSlice.reducer;
