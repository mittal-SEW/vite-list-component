import { useState, useMemo } from 'react';
import {
    Paper, Typography, List, ListItem, ListItemText, Chip, IconButton,
    TextField, Box, FormControl, InputLabel, Select, MenuItem, ToggleButtonGroup, ToggleButton,
    InputAdornment
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function Lists({ items, onRemove }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterByList, setFilterByList] = useState('all');
    const [sortOrder, setSortOrder] = useState(null);

    const uniqueLists = useMemo(() => {
        const sources = [...new Set(items.map(item => item.source))];
        return sources.sort();
    }, [items]);

    const filteredAndSortedItems = useMemo(() => {
        let result = [...items];

        if (searchQuery.trim()) {
            result = result.filter(item =>
                item.text.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterByList !== 'all') {
            result = result.filter(item => item.source === filterByList);
        }

        if (sortOrder === 'asc') {
            result.sort((a, b) => a.text.localeCompare(b.text));
        } else if (sortOrder === 'desc') {
            result.sort((a, b) => b.text.localeCompare(a.text));
        }

        return result;
    }, [items, searchQuery, filterByList, sortOrder]);

    return (
        <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ color: 'text.primary', mb: 3 }}>
                All Items
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 3 }}>
                This component lists all items from every list.
            </Typography>

            <Box sx={{
                display: 'flex',
                gap: 2,
                mb: 4,
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TextField
                    size="small"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ minWidth: 220 }}
                />

                <FormControl size="small" sx={{ minWidth: 160 }} disabled={uniqueLists.length === 0}>
                    <InputLabel id="filter-list-label">Filter by List</InputLabel>
                    <Select
                        labelId="filter-list-label"
                        value={filterByList}
                        label="Filter by List"
                        onChange={(e) => setFilterByList(e.target.value)}
                    >
                        <MenuItem value="all">All Lists</MenuItem>
                        {uniqueLists.map(listName => (
                            <MenuItem key={listName} value={listName}>{listName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <ToggleButtonGroup
                    value={sortOrder}
                    exclusive
                    onChange={(e, newValue) => setSortOrder(newValue)}
                    size="small"
                    disabled={items.length === 0}
                    sx={{
                        '& .MuiToggleButton-root': {
                            px: 1.5,
                            '&.Mui-selected': {
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                }
                            }
                        }
                    }}
                >
                    <ToggleButton value="asc" aria-label="sort ascending">
                        <ArrowUpwardIcon sx={{ mr: 0.5 }} fontSize="small" />
                        A-Z
                    </ToggleButton>
                    <ToggleButton value="desc" aria-label="sort descending">
                        <ArrowDownwardIcon sx={{ mr: 0.5 }} fontSize="small" />
                        Z-A
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {items.length === 0 ? (
                <Typography variant="body1" align="center" color="text.secondary" sx={{ py: 8, bgcolor: 'action.hover', borderRadius: 2 }}>
                    No items added to any list yet. Use the inputs above to add items.
                </Typography>
            ) : filteredAndSortedItems.length === 0 ? (
                <Typography variant="body1" align="center" color="text.secondary" sx={{ py: 8, bgcolor: 'action.hover', borderRadius: 2 }}>
                    No items match your search or filter criteria.
                </Typography>
            ) : (
                <List sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2, p: 0 }}>
                    {filteredAndSortedItems.map((item) => (
                        <ListItem
                            key={item.id}
                            sx={{
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                bgcolor: 'background.paper',
                                boxShadow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'stretch',
                                p: 2,
                                pr: 5,
                                position: 'relative'
                            }}
                        >
                            <IconButton
                                onClick={() => onRemove(item.id)}
                                size="small"
                                color="error"
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    '&:hover': {
                                        bgcolor: 'error.light',
                                        color: 'white'
                                    }
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                            <ListItemText
                                primary={item.text}
                                secondary={item.createdAt
                                    ? `Added on ${new Date(item.createdAt).toLocaleDateString()} at ${new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                                    : 'Recently added'
                                }
                                primaryTypographyProps={{ fontWeight: 600, variant: 'body1' }}
                                secondaryTypographyProps={{ variant: 'caption', sx: { color: 'text.secondary', display: 'block', mt: 0.5 } }}
                                sx={{ mb: 1 }}
                            />
                            <Chip
                                label={item.source}
                                size="small"
                                color="primary"
                                variant="outlined"
                                sx={{ alignSelf: 'flex-start', fontWeight: 500 }}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Paper>
    );
}
