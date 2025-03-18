export interface MealPlan {
    id: string;
    patientId: string;
    title: string;
    startDate: Date;
    breakfast?: string;
    lunch?: string;
    dinner?: string;
    snacks?: string;
    notes?: string;
    nutritionInfo: {
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
    };
    // ... outros campos
} 