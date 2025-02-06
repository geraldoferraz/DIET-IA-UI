import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "@/pages/_layout/auth";
import { AppLayout } from "@/pages/_layout/app";
import { Login } from "@/pages/Auth/login";
import { Register } from "@/pages/Auth/register";
// import { Workouts } from "@/pages/App/workouts/workouts";
import { Patients } from "@/pages/App/patients/patients";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/sign-in" replace />,
    },
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { path: "/home", element: <Patients /> },
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
