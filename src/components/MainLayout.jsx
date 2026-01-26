import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

function MainLayout({ user, onSignOut, children }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                bgcolor: 'background.default',
            }}
        >
            <Header user={user} onSignOut={onSignOut} />
            <Box sx={{ flex: 1 }}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
}

export default MainLayout;
