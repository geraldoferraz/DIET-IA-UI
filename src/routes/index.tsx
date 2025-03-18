import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "@/pages/_layout/auth";
import { AppLayout } from "@/pages/_layout/app";
import { Login } from "@/pages/Auth/login";
import { Register } from "@/pages/Auth/register";
import { Patients } from "@/pages/App/patients/patients";
import { PatientDetails } from "@/pages/App/patients/patientDetails";
import PatientProfile from "@/pages/App/profile/patient-details";
import MealPlanDetails from "@/pages/App/profile/MealPlanDetails";

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
            { path: "/profile/:id", element: <PatientProfile />},
            { path: "/meal-plan/:id", element: <MealPlanDetails /> },
            { path: "/patient/:id", element: <PatientDetails /> },
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
