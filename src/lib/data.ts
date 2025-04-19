export interface Patient {
    id: string;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    birthDate: string;
    weight?: number;
    height?: number;
    address?: string;
    age: number;
    createdAt: string;
    updatedAt: string;
}

export interface FoodOption {
    name: string;
    quantity: string;
}

export interface NutritionInfo {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
}

export interface MealPlan {
    id: string;
    patientId: string;
    title: string;
    startDate: Date;
    breakfast: string;
    breakfastOptions?: FoodOption[];
    lunch: string;
    lunchOptions?: FoodOption[];
    dinner: string;
    dinnerOptions?: FoodOption[];
    snacks: string;
    snackOptions?: FoodOption[];
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
    nutritionInfo?: NutritionInfo;
}