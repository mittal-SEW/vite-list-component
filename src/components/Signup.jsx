import { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel,
    InputAdornment,
    IconButton,
    CircularProgress,
    Link,
    Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DashboardIcon from '@mui/icons-material/Dashboard';

const steps = ['Account Details', 'Personal Info', 'Professional Profile'];

const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
    }
};

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        jobTitle: '',
        organization: '',
        bio: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateStep = (step) => {
        const newErrors = {};
        let isValid = true;

        if (step === 0) {
            if (!formData.email) newErrors.email = 'Email is required';
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

            if (!formData.password) newErrors.password = 'Password is required';
            else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        } else if (step === 1) {
            if (!formData.firstName) newErrors.firstName = 'First name is required';
            if (!formData.lastName) newErrors.lastName = 'Last name is required';
            if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            isValid = false;
        }

        return isValid;
    };

    const handleNext = () => {
        if (validateStep(activeStep)) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        dispatch(login(formData));
        navigate('/dashboard');
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Stack spacing={2.5}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            sx={textFieldStyles}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            sx={textFieldStyles}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                                            {showPassword ? <VisibilityOffIcon sx={{ fontSize: 20 }} /> : <VisibilityIcon sx={{ fontSize: 20 }} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            sx={textFieldStyles}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Stack>
                );
            case 1:
                return (
                    <Stack spacing={2.5}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                                sx={textFieldStyles}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                                sx={textFieldStyles}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                        <TextField
                            fullWidth
                            label="Date of Birth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            error={!!errors.dateOfBirth}
                            helperText={errors.dateOfBirth}
                            InputLabelProps={{ shrink: true }}
                            sx={textFieldStyles}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CalendarTodayIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Stack>
                );
            case 2:
                return (
                    <Stack spacing={2.5}>
                        <TextField
                            fullWidth
                            label="Job Title"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            placeholder="e.g. Software Engineer"
                            sx={textFieldStyles}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BusinessIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Organization"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            placeholder="e.g. Acme Corp"
                            sx={textFieldStyles}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BusinessIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell us a bit about yourself..."
                            sx={textFieldStyles}
                        />
                    </Stack>
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f8f9fa',
                p: 2,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    maxWidth: 480,
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: '#ffffff',
                    border: '1px solid #eaeaea',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                }}
            >
                <Box sx={{ p: 4 }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Box
                            sx={{
                                width: 60,
                                height: 60,
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 2,
                            }}
                        >
                            <DashboardIcon sx={{ fontSize: 30, color: 'white' }} />
                        </Box>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                color: '#1a1a1a',
                            }}
                        >
                            Create Account
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Join ListFlow and get started
                        </Typography>
                    </Box>

                    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel
                                    sx={{
                                        '& .MuiStepLabel-label': {
                                            fontSize: '0.75rem',
                                            mt: 0.5
                                        }
                                    }}
                                >
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <form>
                        <Box sx={{ minHeight: 240 }}>
                            {renderStepContent(activeStep)}
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 2 }}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{
                                    borderRadius: '12px',
                                    px: 3,
                                    textTransform: 'none',
                                    fontWeight: 500
                                }}
                            >
                                Back
                            </Button>

                            {activeStep === steps.length - 1 ? (
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    sx={{
                                        py: 1.5,
                                        px: 4,
                                        borderRadius: '12px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        fontWeight: 600,
                                        fontSize: '0.95rem',
                                        textTransform: 'none',
                                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.25)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%)',
                                            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.35)',
                                        }
                                    }}
                                >
                                    {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Create Account'}
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{
                                        py: 1.5,
                                        px: 4,
                                        borderRadius: '12px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        fontWeight: 600,
                                        fontSize: '0.95rem',
                                        textTransform: 'none',
                                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.25)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%)',
                                            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.35)',
                                        }
                                    }}
                                >
                                    Next
                                </Button>
                            )}
                        </Box>
                    </form>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 4, textAlign: 'center' }}
                    >
                        Already have an account?{' '}
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate('/login')}
                            sx={{
                                color: '#764ba2',
                                fontWeight: 600,
                                textDecoration: 'none',
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            Sign in
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}
