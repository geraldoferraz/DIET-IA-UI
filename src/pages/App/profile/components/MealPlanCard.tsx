
import { MealPlan } from "@/lib/data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Definindo categorias de alimentos com cores associadas
export const foodCategories = {
  protein: {
    color: "red-500",
    title: "Proteínas",
    examples: ["carne", "frango", "peixe", "ovos", "tofu"]
  },
  carbs: {
    color: "amber-500",
    title: "Carboidratos",
    examples: ["arroz", "pão", "macarrão", "batata", "mandioca"]
  },
  fats: {
    color: "blue-500",
    title: "Gorduras",
    examples: ["azeite", "óleo", "manteiga", "abacate"]
  },
  vegetables: {
    color: "green-500",
    title: "Vegetais",
    examples: ["alface", "brócolis", "cenoura", "espinafre"]
  },
  fruits: {
    color: "purple-500",
    title: "Frutas",
    examples: ["maçã", "banana", "laranja", "morango"]
  },
  dairy: {
    color: "teal-500",
    title: "Laticínios",
    examples: ["leite", "queijo", "iogurte"]
  },
  other: {
    color: "gray-500",
    title: "Outros",
    examples: []
  }
};

// Função para identificar a categoria do alimento baseado no nome
export const identifyFoodCategory = (foodName: string): keyof typeof foodCategories => {
  const lowerName = foodName.toLowerCase();

  for (const [category, info] of Object.entries(foodCategories)) {
    if (info.examples.some(example => lowerName.includes(example))) {
      return category as keyof typeof foodCategories;
    }
  }

  return "other";
};

interface MealPlanCardProps {
  mealPlan: MealPlan;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onClick: (id: string) => void;
  className?: string;
}

const MealPlanCard = ({ mealPlan, onEdit, onDelete, onClick, className }: MealPlanCardProps) => {
  return (
    <Card className={cn("overflow-hidden transition-all hover-scale cursor-pointer shadow-card", className)}>
      <CardContent className="p-6" onClick={() => onClick(mealPlan.id)}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-lg">{mealPlan.title}</h3>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              <span>Starts {format(mealPlan.startDate, "MMM dd, yyyy")}</span>
            </div>
          </div>
          <div className="inline-flex items-center px-2.5 py-0.5 h-6 rounded-full text-xs font-medium bg-accent text-accent-foreground">
            {format(mealPlan.createdAt, "MMM dd, yyyy")}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div>
            <h4 className="text-xs font-medium uppercase text-muted-foreground">Breakfast</h4>
            <p className="text-sm line-clamp-1">{mealPlan.breakfast}</p>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase text-muted-foreground">Lunch</h4>
            <p className="text-sm line-clamp-1">{mealPlan.lunch}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(mealPlan.id);
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-primary"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(mealPlan.id);
          }}
        >
          <Edit2 className="mr-2 h-4 w-4" />
          Edit Plan
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MealPlanCard;
