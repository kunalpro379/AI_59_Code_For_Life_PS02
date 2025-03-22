import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import LandingPage from "./pages/landing";
import HomePage from "./pages/home";
import AuthenticatedLayout from "./components/layout/authenticated-layout";
import { AuthProvider } from '@/contexts/AuthContext';

const router = createBrowserRouter([
    // Public Routes
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignupPage />,
    },

    // Authenticated Routes wrapped in AuthenticatedLayout
    {
        element: <AuthenticatedLayout />,
        children: [
            {
                path: "/home",
                element: <HomePage />,
            },
        ],
    },

    // Redirect unmatched routes
    {
        path: "*",
        element: <Navigate to="/" />,
    },
]);

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;