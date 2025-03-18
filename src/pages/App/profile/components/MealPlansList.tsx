import { MealPlan } from '@/lib/data';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MealPlanCard from "./MealPlanCard";

interface MealPlansListProps {
  mealPlans: MealPlan[];
  onAddPlan: () => void;
  onEditPlan: (id: string) => void;
  onDeletePlan: (id: string) => void;
  onViewPlan: (id: string) => void;
}

export function MealPlansList({
  mealPlans,
  onAddPlan,
  onEditPlan,
  onDeletePlan,
  onViewPlan
}: MealPlansListProps) {
  if (mealPlans.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
        <h3 className="text-lg font-medium">Nenhum plano alimentar</h3>
        <Button onClick={onAddPlan} className="mt-4" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Plano
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mealPlans.map((mealPlan) => (
        <MealPlanCard
          key={mealPlan.id}
          mealPlan={mealPlan}
          onEdit={onEditPlan}
          onDelete={onDeletePlan}
          onClick={onViewPlan}
        />
      ))}
    </div>
  );
} 