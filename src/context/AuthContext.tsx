import { User } from "@/types/User";
import { createContext, useContext } from "react";

interface AuthContextType {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};