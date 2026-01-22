import { useState } from 'react';
import { Box } from '@mui/material';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (email) => {
    setUser(email);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Header user={user} onSignOut={handleSignOut} />
      <Box sx={{ flex: 1 }}>
        <Dashboard />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
