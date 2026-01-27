import { Paper, Typography, List, ListItem, ListItemText, Chip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Lists({ items, onRemove }) {
    return (
        <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ color: 'text.primary', mb: 3 }}>
                All Lists
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                This component lists all items from every list.
            </Typography>

            {items.length === 0 ? (
                <Typography variant="body1" align="center" color="text.secondary" sx={{ py: 8, bgcolor: 'action.hover', borderRadius: 2 }}>
                    No items added to any list yet. Use the inputs above to add items.
                </Typography>
            ) : (
                <List sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2, p: 0 }}>
                    {items.map((item) => (
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
