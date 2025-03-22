import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Overview from '../pages/dashboard/Overview';
import KnowledgeBase from '../pages/dashboard/KnowledgeBase';
import Analytics from '../pages/dashboard/Analytics';
import QueryManagement from '../pages/dashboard/QueryManagement';
import Settings from '../pages/dashboard/Settings';
import UserManagement from '../pages/dashboard/UserManagement';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

const AppRoutes = () => {
     const isAuthenticated = true; // Replace with actual auth logic

     return (
          <BrowserRouter>
               <Routes>
                    {/* Auth Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Routes */}
                    <Route
                         element={
                              isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
                         }
                    >
                         <Route path="/" element={<Navigate to="/dashboard" replace />} />
                         <Route path="/dashboard" element={<Overview />} />
                         <Route path="/knowledge-base" element={<KnowledgeBase />} />
                         <Route path="/analytics" element={<Analytics />} />
                         <Route path="/queries" element={<QueryManagement />} />
                         <Route path="/settings" element={<Settings />} />
                         <Route path="/users" element={<UserManagement />} />
                    </Route>
               </Routes>
          </BrowserRouter>
     );
};

export default AppRoutes; 