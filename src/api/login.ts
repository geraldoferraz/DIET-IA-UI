import { api } from "@/lib/axios";

export type RegisterData = {
    email: string;
    password: string;
}

type LoginResponse = {
    token: string;
}

export const login = async (data: RegisterData): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
}

export const getUserInfo = async (): Promise<{ id: string; name: string; email: string }> => {
    const response = await api.get('/user/profile');

    console.log(response.data, 'response.data');

    return response.data;
}