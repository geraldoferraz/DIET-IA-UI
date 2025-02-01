import { api } from "@/lib/axios";

export type RegisterData = {
    email: string;
    password: string;
}

type LoginResponse = {
    token: string;
}

export const login = async (data: RegisterData): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/login', data);
    return response.data;
}