import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage     from './pages/LoginPage';
import RegisterPage  from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const { userInfo } = useSelector((s) => s.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"    element={!userInfo ? <LoginPage />    : <Navigate to="/" replace />} />
        <Route path="/register" element={!userInfo ? <RegisterPage /> : <Navigate to="/" replace />} />
        <Route path="/"         element={userInfo  ? <DashboardPage /> : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}