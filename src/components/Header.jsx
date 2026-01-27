import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';

function Header({ user, onSignOut }) {
    const navigate = useNavigate();
    const location = useLocation();

    const isOnProfile = location.pathname === '/profile';

    const handleUserClick = () => {
        if (isOnProfile) {
            navigate('/dashboard');
        } else {
            navigate('/profile');
        }
    };

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
                <Box
                    onClick={() => navigate('/dashboard')}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        cursor: 'pointer',
                        p: 0.5,
                        borderRadius: '12px',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            bgcolor: 'rgba(0,0,0,0.03)',
                        }
                    }}
                >
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
                    <Box
                        onClick={handleUserClick}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            cursor: 'pointer',
                            p: 1,
                            borderRadius: '10px',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                bgcolor: 'rgba(0,0,0,0.04)',
                            }
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 36,
                                height: 36,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                            }}
                        >
                            {(user?.firstName?.charAt(0) || (typeof user === 'string' && user.charAt(0)) || 'U').toUpperCase()}
                        </Avatar>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#4a4a4a',
                                fontWeight: 500,
                                display: { xs: 'none', sm: 'block' }
                            }}
                        >
                            {(user?.firstName ? user.firstName : (typeof user === 'string' ? user : 'User'))}
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
