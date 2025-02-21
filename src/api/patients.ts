import { api } from "@/lib/axios";

type Patient = {
    id: string;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    birthDate: string;
    weight?: number;
    height?: number;
    address?: string;
    createdAt?: string;
}

export const findPatients = async (): Promise<Patient[]> => {
    const response = await api.get('/patients');

    return response.data;
}

export const createPatient = async (data: Patient): Promise<Patient> => {
    const response = await api.post('/patient', data);

    return response.data;
}

export const deletePatient = async (id: string): Promise<void> => {
    await api.delete(`/patient/${id}`);
}

export async function getPatientById(id: string): Promise<Patient> {
    const response = await api.get(`/patient/${id}`);

    console.log(response.data);

    return response.data;
}