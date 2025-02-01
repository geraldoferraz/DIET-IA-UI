import { create } from "zustand"; //funcao que cria o estado global
import { persist } from "zustand/middleware"; //salva os dados no localstorage, mesmo apos o refresh
import { getUserInfo } from "../api/login";

interface User {
    user: {
        id: string;
        name: string;
        email: string;
    }
}

interface AuthState {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null, // Inicializa o estado com null

            setUser: (user) => set({ user }), // Função para setar o usuário

            clearUser: () => set({ user: null }), // Função para limpar o usuário --> logout

            fetchUser: async () => {
                try {
                    const userData = await getUserInfo();
                    set({ user: { user: userData } });
                } catch (error) {
                    console.error("User not found:", error);
                }
            },
        }),
        {
            name: "auth-storage", // Salva no localStorage para persistência
        }
    )
);
