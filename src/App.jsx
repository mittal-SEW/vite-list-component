import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (email) => {
    setUser(email);
    navigate('/dashboard');
  };

  const handleSignOut = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AppRoutes
      user={user}
      onLogin={handleLogin}
      onSignOut={handleSignOut}
    />
  );
}

export default App;
