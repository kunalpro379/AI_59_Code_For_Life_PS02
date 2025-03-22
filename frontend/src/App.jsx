import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import KnowledgeBase from './pages/KnowledgeBase';
import QueryManagement from './pages/QueryManagement';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import UserManagement from './pages/UserManagement';
import Notifications from './pages/Notifications';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="knowledge-base" element={<KnowledgeBase />} />
                    <Route path="queries" element={<QueryManagement />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="notifications" element={<Notifications />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;