import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Profile from '../components/Profile';
import MainLayout from '../components/MainLayout';

function AppRoutes({ user, onLogin, onSignOut }) {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    user ? <Navigate to="/dashboard" replace /> : <Login onLogin={onLogin} />
                }
            />
            <Route
                path="/signup"
                element={
                    user ? <Navigate to="/dashboard" replace /> : <Signup onLogin={onLogin} />
                }
            />

            {/* Protected Routes directly inside MainLayout wrapper logic */}
            <Route
                path="/dashboard"
                element={
                    user ? (
                        <MainLayout user={user} onSignOut={onSignOut}>
                            <Dashboard />
                        </MainLayout>
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />
            <Route
                path="/profile"
                element={
                    user ? (
                        <MainLayout user={user} onSignOut={onSignOut}>
                            <Profile user={user} />
                        </MainLayout>
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />

            <Route
                path="*"
                element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
            />
        </Routes>
    );
}

export default AppRoutes;
