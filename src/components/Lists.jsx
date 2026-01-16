import { Paper, Typography, List, ListItem, ListItemText, Chip } from '@mui/material';

export default function Lists({ items }) {
    return (
        <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ color: 'text.primary', mb: 3 }}>
                All Lists (View Only)
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
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                p: 2
                            }}
                        >
                            <ListItemText
                                primary={item.text}
                                secondary={`ID: ${item.id.split('-').slice(1).join('-')}`}
                                primaryTypographyProps={{ fontWeight: 600, variant: 'body1' }}
                                secondaryTypographyProps={{ variant: 'caption' }}
                            />
                            <Chip
                                label={item.source}
                                size="small"
                                color={['primary', 'secondary', 'success', 'info', 'warning', 'error'][parseInt(item.source.replace('List', '')) - 1] || 'default'}
                                variant="filled"
                                sx={{ ml: 2, minWidth: 80 }}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Paper>
    );
}
