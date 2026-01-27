import { Container, Paper, Typography, Box, Avatar, Divider, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';

function Profile({ user }) {
    const userData = typeof user === 'string'
        ? { email: user, firstName: 'User', lastName: '', bio: 'No profile details available.' }
        : user || {};

    const fullName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || userData.email || 'User';

    const InfoItem = ({ icon, label, value }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                bgcolor: 'rgba(102, 126, 234, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {icon}
            </Box>
            <Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {label}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                    {value}
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Paper
                elevation={0}
                sx={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    border: '1px solid #eaeaea',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                }}
            >
                {/* Header Banner */}
                <Box sx={{
                    height: 120,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    position: 'relative'
                }}>
                    <Box sx={{
                        position: 'absolute',
                        bottom: -40,
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}>
                        <Avatar
                            sx={{
                                width: 80,
                                height: 80,
                                border: '4px solid white',
                                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                                fontSize: '2rem',
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            }}
                        >
                            {(userData.firstName?.charAt(0) || userData.email?.charAt(0) || 'U').toUpperCase()}
                        </Avatar>
                    </Box>
                </Box>

                {/* Profile Content */}
                <Box sx={{ pt: 6, pb: 4, px: 4, textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight={700} sx={{ color: '#1a1a1a', mb: 0.5 }}>
                        {fullName}
                    </Typography>

                    {userData.jobTitle && (
                        <Typography variant="body1" color="text.secondary">
                            {userData.jobTitle}
                            {userData.organization && ` at ${userData.organization}`}
                        </Typography>
                    )}

                    {!userData.jobTitle && userData.organization && (
                        <Typography variant="body1" color="text.secondary">
                            {userData.organization}
                        </Typography>
                    )}
                </Box>

                <Divider />

                {/* Bio Section */}
                <Box sx={{ px: 4, py: 3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon fontSize="small" sx={{ color: '#667eea' }} />
                        About
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {userData.bio || "No bio provided."}
                    </Typography>
                </Box>

                <Divider />

                {/* Contact Info */}
                <Box sx={{ px: 4, py: 3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 2 }}>
                        Details
                    </Typography>

                    <Stack spacing={2}>
                        {userData.email && (
                            <InfoItem
                                icon={<EmailIcon sx={{ fontSize: 20, color: '#667eea' }} />}
                                label="Email"
                                value={userData.email}
                            />
                        )}

                        {userData.dateOfBirth && (
                            <InfoItem
                                icon={<CalendarTodayIcon sx={{ fontSize: 20, color: '#667eea' }} />}
                                label="Date of Birth"
                                value={userData.dateOfBirth}
                            />
                        )}

                        {userData.jobTitle && (
                            <InfoItem
                                icon={<WorkIcon sx={{ fontSize: 20, color: '#667eea' }} />}
                                label="Role"
                                value={userData.jobTitle}
                            />
                        )}

                        {userData.organization && (
                            <InfoItem
                                icon={<BusinessIcon sx={{ fontSize: 20, color: '#667eea' }} />}
                                label="Organization"
                                value={userData.organization}
                            />
                        )}
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}

export default Profile;
