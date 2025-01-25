import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "@/pages/_layout/auth";
import { AppLayout } from "@/pages/_layout/app";
import { Login } from "@/pages/Auth/login";
import { Register } from "@/pages/Auth/register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/sign-in" replace />,
    },
    {
        path: "/app",
        element: <AppLayout />,
        children: [
            // { path: "/app", element: <Workouts /> },
            // { path: "/app/weight", element: <Weight /> },
            // { path: "/app/statistics", element: <Stats /> },
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            { path: "/sign-in", element: <Login /> },
            { path: "/sign-up", element: <Register /> },
        ],
    },
]);
