import { api } from "@/lib/axios";
import { AnamneseWithId } from "@/types/Anamnese";

export const anamnese = async (patientId: string, page: number = 1, limit: number = 5): Promise<{
data: AnamneseWithId[];
pagination: {
    total: number;
    pages: number;
    currentPage: number;
    perPage: number;
    };
}> => {
    const response = await api.get(`/anamnese/${patientId}`, {
        params: { page, limit },
    });

    return response.data;
};
