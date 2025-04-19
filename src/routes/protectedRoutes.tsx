// components/ProtectedRoute.tsx
import { useAuthStore } from "@/store/useAuthStore";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ allowedRoles, children }: { allowedRoles: string[]; children: JSX.Element; }) => {
    const user = useAuthStore((state) => state.user);

    if (!user) {
        return <Navigate to="/sign-in" replace />;
    }

    console.log("🔐 Checking access:");
    console.log("User:", user);
    console.log("Allowed roles:", allowedRoles);

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};
