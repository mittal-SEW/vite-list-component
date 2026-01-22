import { Box, Typography, Link } from '@mui/material';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                background: '#ffffff',
                color: '#4a4a4a',
                py: 4,
                px: 3,
                mt: 'auto',
                borderTop: '1px solid #eaeaea',
            }}
        >
            <Box
                sx={{
                    maxWidth: '1200px',
                    mx: 'auto',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 3,
                }}
            >
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: '#1a1a1a',
                            mb: 1,
                        }}
                    >
                        ListFlow
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 3 }}>
                    <Link
                        href="#"
                        sx={{
                            color: '#666',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            transition: 'color 0.2s ease',
                            '&:hover': { color: '#764ba2' }
                        }}
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href="#"
                        sx={{
                            color: '#666',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            transition: 'color 0.2s ease',
                            '&:hover': { color: '#764ba2' }
                        }}
                    >
                        Terms of Service
                    </Link>
                    <Link
                        href="#"
                        sx={{
                            color: '#666',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            transition: 'color 0.2s ease',
                            '&:hover': { color: '#764ba2' }
                        }}
                    >
                        Contact
                    </Link>
                </Box>
            </Box>

            <Box
                sx={{
                    mt: 3,
                    pt: 3,
                    textAlign: 'center',
                    borderTop: '1px solid #f5f5f5',
                }}
            >
                <Typography
                    variant="body2"
                    sx={{ color: '#999' }}
                >
                    © {currentYear} ListFlow. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
}

export default Footer;
