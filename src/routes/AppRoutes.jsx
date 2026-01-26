import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
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
                path="*"
                element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
            />
        </Routes>
    );
}

export default AppRoutes;
