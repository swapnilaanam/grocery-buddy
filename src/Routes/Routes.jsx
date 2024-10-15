import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import MainLayout from "../Layouts/MainLayout";
import ForgetPassword from "../pages/ForgetPassword";
import Profile from "../pages/Profile";
import Setting from "../pages/Setting";
import UpdatePassword from "../pages/UpdatePassword";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/setting',
                element: <Setting />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '/forgetpassword',
        element: <ForgetPassword />
    },
    {
        path: '/updatepassword',
        element: <UpdatePassword />
    }
]);

export default router;

