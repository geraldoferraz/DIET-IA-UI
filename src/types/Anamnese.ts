export interface Anamnese {
    weight: number;
    height: number;
    notes?: string;
    physicalActivity?: string;
    waterIntake?: number;
    mealsFrequency?: string;
    sleepQuality?: string;
    bathroomQuality?: string;
    objective?: string;
    fatPercentage?: number;
    patientId?: string;
}

export interface FormValues {
    weight: number;
    height: number;
    waterIntake: number;
    fatPercentage: number;
    physicalActivity: string;
    mealsFrequency: string;
    sleepQuality: string;
    bathroomQuality: string;
    objective: string;
    notes: string;
}

export interface AnamnesePageProps {
    patientId: string;
    page: number;
    itemsPerPage: number;
}

export interface AnamneseWithId extends Anamnese {
    imc: number;
    id?: string;
    createdAt?: Date;
    user?: {
        name: string;
    };
}