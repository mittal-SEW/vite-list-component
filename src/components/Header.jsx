import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';

function Header({ user, onSignOut }) {
    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                background: '#f8f9fa',
                borderBottom: '1px solid #eaeaea',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <DashboardIcon sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                    <Typography
                        variant="h5"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: '-0.5px',
                            color: '#1a1a1a',
                        }}
                    >
                        ListFlow
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                            sx={{
                                width: 36,
                                height: 36,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                            }}
                        >
                            {user?.charAt(0)?.toUpperCase() || 'U'}
                        </Avatar>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#4a4a4a',
                                fontWeight: 500,
                                display: { xs: 'none', sm: 'block' }
                            }}
                        >
                            {user || 'User'}
                        </Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        startIcon={<LogoutIcon />}
                        onClick={onSignOut}
                        sx={{
                            borderColor: '#eaeaea',
                            color: '#4a4a4a',
                            fontWeight: 600,
                            borderRadius: '10px',
                            px: 2.5,
                            py: 1,
                            textTransform: 'none',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                background: 'rgba(0,0,0,0.02)',
                                borderColor: '#d1d1d1',
                                transform: 'translateY(-1px)',
                            }
                        }}
                    >
                        Sign Out
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
