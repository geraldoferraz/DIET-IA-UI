import { useState, useEffect } from 'react';
import { MealPlan } from '../types/meal-plan';
import { mealPlanService } from '../services/meal-plan.service';

export function useMealPlan(id?: string) {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      const plan = mealPlanService.getById(id);
      setMealPlan(plan || null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const updateMealPlan = (data: Partial<MealPlan>) => {
    if (!mealPlan) return null;
    const updated = mealPlanService.update(mealPlan.id, data);
    if (updated) setMealPlan(updated);
    return updated;
  };

  const deleteMealPlan = () => {
    if (!mealPlan) return false;
    const deleted = mealPlanService.delete(mealPlan.id);
    if (deleted) setMealPlan(null);
    return deleted;
  };

  return {
    mealPlan,
    loading,
    error,
    updateMealPlan,
    deleteMealPlan
  };
} 