import { api } from "@/lib/axios";

export type RegisterData = {
    name: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
    age: string;
}

type RegisterResponse = {
    message: string;
    registrationEmail: string;
}

export const register = async (data: RegisterData): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register', {
        ...data,
        age: Number(data.age),
    });

    return response.data;
}

type VerifyOtpResponse = {
    message: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

export const verifyOtp = async ({ otp }: { otp: string }): Promise<VerifyOtpResponse> => {
    const response = await api.post<VerifyOtpResponse>('/auth/verify-otp', { otp });

    return response.data;
};