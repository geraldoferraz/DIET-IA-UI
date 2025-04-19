import { api } from "@/lib/axios";
import { Patient } from "@/lib/data";

export const findPatients = async (): Promise<Patient[]> => {
    const response = await api.get('/patient');

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

    return response.data;
}

export async function createPassword(data: { email: string; cpf: string; password: string }): Promise<void> {
    const response = await api.post('/patient/create-password', data);

    return response.data;
}