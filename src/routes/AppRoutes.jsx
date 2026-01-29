import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Profile from '../components/Profile';
import MainLayout from '../components/MainLayout';

function AppRoutes() {
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    return (
        <Routes>
            <Route
                path="/login"
                element={
                    isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
                }
            />
            <Route
                path="/signup"
                element={
                    isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />
                }
            />

            <Route
                path="/dashboard"
                element={
                    isAuthenticated ? (
                        <MainLayout>
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
                    isAuthenticated ? (
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />

            <Route
                path="*"
                element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
            />
        </Routes>
    );
}

export default AppRoutes;

