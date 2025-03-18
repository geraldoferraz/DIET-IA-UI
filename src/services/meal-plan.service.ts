import { MealPlan } from "../types/meal-plan";
import { mockMealPlans } from "../mocks/meal-plan";

export class MealPlanService {
  private mealPlans: MealPlan[] = [...mockMealPlans];

  getAll(): MealPlan[] {
    return this.mealPlans;
  }

  getById(id: string): MealPlan | undefined {
    return this.mealPlans.find(plan => plan.id === id);
  }

  getByPatientId(patientId: string): MealPlan[] {
    return this.mealPlans.filter(plan => plan.patientId === patientId);
  }

  create(mealPlan: Omit<MealPlan, "id" | "createdAt" | "updatedAt">): MealPlan {
    const newMealPlan = {
      ...mealPlan,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mealPlans.push(newMealPlan);
    return newMealPlan;
  }

  update(id: string, data: Partial<MealPlan>): MealPlan | undefined {
    const index = this.mealPlans.findIndex(plan => plan.id === id);
    if (index === -1) return undefined;

    this.mealPlans[index] = {
      ...this.mealPlans[index],
      ...data,
      updatedAt: new Date()
    };
    return this.mealPlans[index];
  }

  delete(id: string): boolean {
    const index = this.mealPlans.findIndex(plan => plan.id === id);
    if (index === -1) return false;
    this.mealPlans.splice(index, 1);
    return true;
  }
}

export const mealPlanService = new MealPlanService(); 