import { AppLayout } from "@/pages/_layout/app";
import { AuthLayout } from "@/pages/_layout/auth";
import { PatientDetails } from "@/pages/App/patients/patientDetails";
import { Patients } from "@/pages/App/patients/patients";
import PatientProfile from "@/pages/App/profile/patient-details";
import { CreatePassword } from "@/pages/Auth/create-password/create-password";
import { Login } from "@/pages/Auth/login";
import { Register } from "@/pages/Auth/register";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoutes";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/sign-in" replace />,
    },
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/home",
                element: (
                    <ProtectedRoute allowedRoles={["user"]}>
                        <Patients />
                    </ProtectedRoute>
                )
            },
            {
                path: "/profile/:id",
                element: (
                    <ProtectedRoute allowedRoles={["patient"]}>
                        <PatientProfile />
                    </ProtectedRoute>
                )
            },
            { path: "/patient/:id", element: <PatientDetails /> },
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            { path: "/sign-in", element: <Login /> },
            { path: "/sign-up", element: <Register /> },
            { path: "/create-password", element: <CreatePassword /> },
        ],
    },
    {
        path: "/unauthorized",
        element: <div>Você não tem permissão para acessar esta página.</div>,
    },
]);
