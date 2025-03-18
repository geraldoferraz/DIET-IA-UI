
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Coffee, UtensilsCrossed, Sandwich, IceCream, AlertCircle, Plus, X, ArrowRight, ArrowLeft, CheckCircle2, Flame, Fish, Apple } from "lucide-react";
import { cn } from "@/lib/utils";
import { MealPlan, mealPlanService } from "@/lib/data";
import { identifyFoodCategory, foodCategories } from "./MealPlanCard";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AddMealPlanDialogProps {
  patientId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (mealPlan: MealPlan) => void;
  mealPlanToEdit?: MealPlan;
}

type MealType = {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
}

const availableMeals: MealType[] = [
  {
    id: "breakfast",
    title: "Breakfast",
    icon: <Coffee className="h-5 w-5 text-amber-500" />,
    description: "Morning meal to start the day"
  },
  {
    id: "morningSnack",
    title: "Morning Snack",
    icon: <IceCream className="h-5 w-5 text-purple-500" />,
    description: "Light snack between breakfast and lunch"
  },
  {
    id: "lunch",
    title: "Lunch",
    icon: <Sandwich className="h-5 w-5 text-green-500" />,
    description: "Mid-day meal"
  },
  {
    id: "afternoonSnack",
    title: "Afternoon Snack",
    icon: <IceCream className="h-5 w-5 text-purple-500" />,
    description: "Light snack between lunch and dinner"
  },
  {
    id: "dinner",
    title: "Dinner",
    icon: <UtensilsCrossed className="h-5 w-5 text-indigo-500" />,
    description: "Evening meal"
  },
  {
    id: "eveningSnack",
    title: "Evening Snack",
    icon: <IceCream className="h-5 w-5 text-purple-500" />,
    description: "Light snack before bedtime"
  }
];

const AddMealPlanDialog = ({
  patientId,
  open,
  onOpenChange,
  onSave,
  mealPlanToEdit
}: AddMealPlanDialogProps) => {
  const isEditing = !!mealPlanToEdit;
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);

  const [mealPlan, setMealPlan] = useState<Omit<MealPlan, "id" | "createdAt" | "updatedAt">>({
    patientId,
    title: "",
    startDate: new Date(),
    breakfast: "",
    breakfastOptions: [],
    lunch: "",
    lunchOptions: [],
    dinner: "",
    dinnerOptions: [],
    snacks: "",
    snackOptions: [],
    notes: "",
    nutritionInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    }
  });

  const [newFoodOption, setNewFoodOption] = useState<{ mealType: string; name: string; quantity: string }>({
    mealType: "",
    name: "",
    quantity: ""
  });

  const generateSteps = () => {
    const steps = [
      {
        id: "general",
        title: "General Information",
        icon: <UtensilsCrossed className="h-5 w-5" />
      }
    ];

    availableMeals.forEach(meal => {
      if (selectedMeals.includes(meal.id)) {
        steps.push({
          id: meal.id,
          title: meal.title,
          icon: meal.icon
        });
      }
    });

    steps.push({
      id: "notes",
      title: "Additional Notes",
      icon: <AlertCircle className="h-5 w-5" />
    });

    return steps;
  };

  const steps = generateSteps();

  useEffect(() => {
    if (mealPlanToEdit) {
      setMealPlan({
        patientId: mealPlanToEdit.patientId,
        title: mealPlanToEdit.title,
        startDate: mealPlanToEdit.startDate,
        breakfast: mealPlanToEdit.breakfast,
        breakfastOptions: mealPlanToEdit.breakfastOptions || [],
        lunch: mealPlanToEdit.lunch,
        lunchOptions: mealPlanToEdit.lunchOptions || [],
        dinner: mealPlanToEdit.dinner,
        dinnerOptions: mealPlanToEdit.dinnerOptions || [],
        snacks: mealPlanToEdit.snacks,
        snackOptions: mealPlanToEdit.snackOptions || [],
        notes: mealPlanToEdit.notes || "",
        nutritionInfo: mealPlanToEdit.nutritionInfo || {
          calories: 0,
          protein: 0,
          carbs: 0,
          fats: 0
        }
      });

      const selected: string[] = [];
      if (mealPlanToEdit.breakfast) selected.push("breakfast");
      if (mealPlanToEdit.lunch) selected.push("lunch");
      if (mealPlanToEdit.dinner) selected.push("dinner");

      if (mealPlanToEdit.snacks) {
        const hasSnacks = mealPlanToEdit.snackOptions && mealPlanToEdit.snackOptions.length > 0;

        if (hasSnacks && mealPlanToEdit.snackOptions?.some(option =>
          option.name.toLowerCase().includes('morning') ||
          option.quantity.toLowerCase().includes('morning'))) {
          selected.push("morningSnack");
        }


        if (hasSnacks && mealPlanToEdit.snackOptions?.some(option =>
          option.name.toLowerCase().includes('afternoon') ||
          option.quantity.toLowerCase().includes('afternoon'))) {
          selected.push("afternoonSnack");
        }


        if (hasSnacks && mealPlanToEdit.snackOptions?.some(option =>
          option.name.toLowerCase().includes('evening') ||
          option.quantity.toLowerCase().includes('evening'))) {
          selected.push("eveningSnack");
        }


        if (selected.every(id => id !== "morningSnack" && id !== "afternoonSnack" && id !== "eveningSnack")
          && mealPlanToEdit.snacks) {
          selected.push("morningSnack", "afternoonSnack", "eveningSnack");
        }
      }

      setSelectedMeals(selected);
    } else {
      setMealPlan({
        patientId,
        title: "",
        startDate: new Date(),
        breakfast: "",
        breakfastOptions: [],
        lunch: "",
        lunchOptions: [],
        dinner: "",
        dinnerOptions: [],
        snacks: "",
        snackOptions: [],
        notes: "",
        nutritionInfo: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fats: 0
        }
      });
      setSelectedMeals(["breakfast", "lunch", "dinner"]);
    }
    setCurrentStep(0);
  }, [mealPlanToEdit, patientId, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMealPlan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'calories' | 'protein' | 'carbs' | 'fats') => {
    const value = parseInt(e.target.value) || 0;
    setMealPlan((prev) => {
      const nutritionInfo = {
        ...prev.nutritionInfo,
        [field]: value
      };
      return {
        ...prev,
        nutritionInfo
      };
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setMealPlan((prev) => ({
        ...prev,
        startDate: date,
      }));
    }
  };

  const handleSave = () => {
    if (isEditing && mealPlanToEdit) {
      const updatedMealPlan = mealPlanService.update(mealPlanToEdit.id, mealPlan);
      if (updatedMealPlan) {
        onSave(updatedMealPlan);
      }
    } else {
      const newMealPlan = mealPlanService.create(mealPlan);
      onSave(newMealPlan);
    }
    onOpenChange(false);
  };

  const handleAddFoodOption = (mealType: 'breakfastOptions' | 'lunchOptions' | 'dinnerOptions' | 'snackOptions') => {
    if (newFoodOption.name.trim() && newFoodOption.quantity.trim() && newFoodOption.mealType === mealType) {
      setMealPlan(prev => ({
        ...prev,
        [mealType]: [...(prev[mealType] || []), { name: newFoodOption.name, quantity: newFoodOption.quantity }]
      }));
      setNewFoodOption({ mealType: "", name: "", quantity: "" });
    }
  };

  const handleRemoveFoodOption = (mealType: 'breakfastOptions' | 'lunchOptions' | 'dinnerOptions' | 'snackOptions', index: number) => {
    setMealPlan(prev => ({
      ...prev,
      [mealType]: prev[mealType]?.filter((_, i) => i !== index) || []
    }));
  };

  const toggleMealSelection = (mealId: string) => {
    setSelectedMeals(prev => {
      if (prev.includes(mealId)) {
        return prev.filter(id => id !== mealId);
      } else {
        return [...prev, mealId];
      }
    });
  };

  const getFoodOptionComponent = (
    mealType: 'breakfastOptions' | 'lunchOptions' | 'dinnerOptions' | 'snackOptions',
    label: string,
  ) => {
    const options = mealPlan[mealType] || [];

    return (
      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-primary text-sm font-medium">{label}</Label>
          <div className="text-xs text-muted-foreground">
            {options.length} option{options.length !== 1 ? 's' : ''} added
          </div>
        </div>

        {options.length > 0 && (
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2">
              {options.map((option, index) => {
                const category = identifyFoodCategory(option.name);
                const categoryColor = foodCategories[category].color;

                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-md bg-white border border-slate-200 shadow-sm`}
                  >
                    <div className="flex items-center flex-1">
                      <div className={`w-3 h-3 rounded-full bg-${categoryColor} mr-2`}></div>
                      <span className="font-medium">{option.name}</span>
                      <span className="text-sm text-gray-500 ml-2 font-mono">({option.quantity})</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 hover:bg-red-50 hover:text-red-500"
                      onClick={() => handleRemoveFoodOption(mealType, index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-2">
          <Input
            placeholder="Food name"
            className="flex-1 focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0 border-primary/20"
            value={newFoodOption.mealType === mealType ? newFoodOption.name : ""}
            onChange={(e) => setNewFoodOption({ mealType, name: e.target.value, quantity: newFoodOption.quantity })}
            onClick={() => setNewFoodOption(prev => ({ ...prev, mealType }))}
          />
          <Input
            placeholder="Quantity"
            className="flex-0 w-28 focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0 border-primary/20"
            value={newFoodOption.mealType === mealType ? newFoodOption.quantity : ""}
            onChange={(e) => setNewFoodOption({ ...newFoodOption, quantity: e.target.value })}
            onClick={() => setNewFoodOption(prev => ({ ...prev, mealType }))}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => handleAddFoodOption(mealType)}
            className="bg-white border-primary/20 hover:bg-primary/5"
            disabled={!newFoodOption.name.trim() || !newFoodOption.quantity.trim() || newFoodOption.mealType !== mealType}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center space-x-1 sm:space-x-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 cursor-pointer
                ${currentStep === index
                  ? 'border-primary bg-primary text-white'
                  : index < currentStep
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-300 text-gray-400'}`}
              onClick={() => setCurrentStep(index)}
            >
              {index < currentStep ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <span className="text-xs font-medium">{index + 1}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-4 h-0.5 sm:w-6 ${index < currentStep ? 'bg-primary' : 'bg-gray-300'
                  }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="space-y-2 p-1">
              <Label htmlFor="title" className="text-sm font-medium">Plan Title</Label>
              <Input
                id="title"
                name="title"
                value={mealPlan.title}
                onChange={handleChange}
                placeholder="E.g., Weight Loss Plan - Week 1"
                className="rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 border-primary/20"
              />
            </div>

            <div className="space-y-2 p-1">
              <Label htmlFor="startDate" className="text-sm font-medium">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal rounded-lg border-primary/20",
                      !mealPlan.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {mealPlan.startDate ? (
                      format(mealPlan.startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={mealPlan.startDate}
                    onSelect={handleDateSelect}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="mt-6 space-y-3">
              <Label className="font-medium">Select Meals to Include</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableMeals.map((meal) => (
                  <div
                    key={meal.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${selectedMeals.includes(meal.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-200 hover:border-slate-300'
                      }`}
                    onClick={() => toggleMealSelection(meal.id)}
                  >
                    <Checkbox
                      checked={selectedMeals.includes(meal.id)}
                      onCheckedChange={() => toggleMealSelection(meal.id)}
                      className="mt-1"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-primary">{meal.icon}</span>
                        <span className="font-medium">{meal.title}</span>
                      </div>
                      <p className="text-sm text-slate-500">{meal.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              {selectedMeals.length === 0 && (
                <p className="text-sm text-red-500 font-medium">Please select at least one meal</p>
              )}
            </div>
          </div>
        );

      case 'breakfast':
        return (
          <div className="space-y-4 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Coffee className="h-5 w-5 text-amber-500" />
              <Label htmlFor="breakfast" className="font-medium text-primary">Breakfast</Label>
            </div>
            <Textarea
              id="breakfast"
              name="breakfast"
              value={mealPlan.breakfast}
              onChange={handleChange}
              placeholder="Ex: Greek yogurt with honey and fresh berries, whole grain toast with avocado, green tea"
              className="rounded-lg min-h-[120px] border-primary/20 focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0"
            />
            {getFoodOptionComponent('breakfastOptions', 'Breakfast Food Options')}
          </div>
        );

      case 'morningSnack':
        return (
          <div className="space-y-4 p-4">
            <div className="flex items-center gap-2 mb-3">
              <IceCream className="h-5 w-5 text-purple-500" />
              <Label htmlFor="morningSnack" className="font-medium text-primary">Morning Snack</Label>
            </div>
            <Textarea
              id="snacks"
              name="snacks"
              value={mealPlan.snacks}
              onChange={handleChange}
              placeholder="Ex: Apple slices with almond butter, carrot sticks with hummus, handful of mixed nuts"
              className="rounded-lg min-h-[120px] border-primary/20 focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0"
            />
            {getFoodOptionComponent('snackOptions', 'Snack Food Options')}
          </div>
        );

      case 'lunch':
        return (
          <div className="space-y-4 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sandwich className="h-5 w-5 text-green-500" />
              <Label htmlFor="lunch" className="font-medium text-primary">Lunch</Label>
            </div>
            <Textarea
              id="lunch"
              name="lunch"
              value={mealPlan.lunch}
              onChange={handleChange}
              placeholder="Ex: Grilled chicken salad with olive oil dressing, quinoa, mixed vegetables, and a piece of fruit"
              className="rounded-lg min-h-[120px] border-primary/20 focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0"
            />
            {getFoodOptionComponent('lunchOptions', 'Lunch Food Options')}
          </div>
        );

      case 'afternoonSnack':
        return (
          <div className="space-y-4 p-4">
            <div className="flex items-center gap-2 mb-3">
              <IceCream className="h-5 w-5 text-purple-500" />
              <Label htmlFor="afternoonSnack" className="font-medium text-primary">Afternoon Snack</Label>
            </div>
            <Textarea
              id="snacks"
              name="snacks"
              value={mealPlan.snacks}
              onChange={handleChange}
              placeholder="Ex: Greek yogurt with honey, fruit, or a small handful of nuts"
              className="rounded-lg min-h-[120px] border-primary/20 focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0"
            />
            {getFoodOptionComponent('snackOptions', 'Snack Food Options')}
          </div>
        );

      case 'dinner':
        return (
          <div className="space-y-4 p-4">
            <div className="flex items-center gap-2 mb-3">
              <UtensilsCrossed className="h-5 w-5 text-indigo-500" />
              <Label htmlFor="dinner" className="font-medium text-primary">Dinner</Label>
            </div>
            <Textarea
              id="dinner"
              name="dinner"
              value={mealPlan.dinner}
              onChange={handleChange}
              placeholder="Ex: Baked salmon with steamed vegetables, brown rice, and a small side salad"
              className="rounded-lg min-h-[120px] border-primary/20 focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0"
            />
            {getFoodOptionComponent('dinnerOptions', 'Dinner Food Options')}
          </div>
        );

      case 'eveningSnack':
        return (
          <div className="space-y-4 p-4">
            <div className="flex items-center gap-2 mb-3">
              <IceCream className="h-5 w-5 text-purple-500" />
              <Label htmlFor="eveningSnack" className="font-medium text-primary">Evening Snack</Label>
            </div>
            <Textarea
              id="snacks"
              name="snacks"
              value={mealPlan.snacks}
              onChange={handleChange}
              placeholder="Ex: Herbal tea with a small piece of dark chocolate, or a small bowl of berries"
              className="rounded-lg min-h-[120px] border-primary/20 focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0"
            />
            {getFoodOptionComponent('snackOptions', 'Snack Food Options')}
          </div>
        );

      case 'notes':
        return (
          <div className="space-y-6 p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-5 w-5 text-gray-500" />
              <Label htmlFor="notes" className="font-medium text-primary">Additional Notes</Label>
            </div>
            <Textarea
              id="notes"
              name="notes"
              value={mealPlan.notes}
              onChange={handleChange}
              placeholder="Any additional instructions, dietary restrictions, or general notes about this meal plan"
              className="rounded-lg min-h-[120px] border-primary/20 focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0"
            />

            <div className="mt-8">
              <h3 className="text-base font-medium text-primary mb-4">Nutrition Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-amber-500" />
                    <Label htmlFor="calories" className="text-sm font-medium">Calories (kcal)</Label>
                  </div>
                  <Input
                    id="calories"
                    type="number"
                    min="0"
                    placeholder="e.g., 2200"
                    value={mealPlan.nutritionInfo?.calories || ""}
                    onChange={(e) => handleNumberChange(e, 'calories')}
                    className="rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 border-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Fish className="h-4 w-4 text-red-500" />
                    <Label htmlFor="protein" className="text-sm font-medium">Protein (g)</Label>
                  </div>
                  <Input
                    id="protein"
                    type="number"
                    min="0"
                    placeholder="e.g., 120"
                    value={mealPlan.nutritionInfo?.protein || ""}
                    onChange={(e) => handleNumberChange(e, 'protein')}
                    className="rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 border-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Apple className="h-4 w-4 text-green-500" />
                    <Label htmlFor="carbs" className="text-sm font-medium">Carbs (g)</Label>
                  </div>
                  <Input
                    id="carbs"
                    type="number"
                    min="0"
                    placeholder="e.g., 250"
                    value={mealPlan.nutritionInfo?.carbs || ""}
                    onChange={(e) => handleNumberChange(e, 'carbs')}
                    className="rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 border-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white">F</span>
                    </div>
                    <Label htmlFor="fats" className="text-sm font-medium">Fats (g)</Label>
                  </div>
                  <Input
                    id="fats"
                    type="number"
                    min="0"
                    placeholder="e.g., 70"
                    value={mealPlan.nutritionInfo?.fats || ""}
                    onChange={(e) => handleNumberChange(e, 'fats')}
                    className="rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 border-primary/20"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0 flex flex-col h-[90vh] max-h-[90vh] overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2 border-b sticky top-0 bg-white z-10">
          <DialogTitle className="text-xl flex items-center gap-2">
            <span className="text-primary">
              {steps[currentStep].icon}
            </span>
            {isEditing ? "Edit Meal Plan" : "Create New Meal Plan"} - {steps[currentStep].title}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-6 overflow-y-auto">
          <div className="pb-4">
            <StepIndicator />
            {renderStepContent()}
          </div>
        </ScrollArea>

        <DialogFooter className="px-6 py-4 border-t mt-auto bg-white z-10">
          <div className="flex gap-2 w-full justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div>
              <Button variant="outline" onClick={() => onOpenChange(false)} className="mr-2">
                Cancel
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleSave}
                  className="gap-2"
                  disabled={selectedMeals.length === 0}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {isEditing ? "Update Meal Plan" : "Save Meal Plan"}
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  className="gap-2"
                  disabled={currentStep === 0 && selectedMeals.length === 0}
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMealPlanDialog;
