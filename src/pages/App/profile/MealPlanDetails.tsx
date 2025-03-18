import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MealPlan, Patient, mealPlanService, patientService, FoodOption } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import AddMealPlanDialog from "./components/AddMealPlanDialog";
import { foodCategories, identifyFoodCategory } from "./components/MealPlanCard";

import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  Edit2,
  Printer,
  User2,
  Coffee,
  UtensilsCrossed,
  Sandwich,
  IceCream,
  AlertCircle,
  Flame,
  Apple,
  Fish
} from "lucide-react";

const NUTRITION_COLORS: Record<string, string> = {
  calories: "amber-500",
  protein: "red-500",
  carbs: "green-500",
  fats: "blue-500"
};

const MEAL_ORDER = [
  "breakfast",
  "morningSnack",
  "lunch",
  "afternoonSnack",
  "dinner",
  "eveningSnack",
  "snacks"
];

interface MealTabInfo {
  id: string;
  title: string;
  icon: JSX.Element;
  content: string | undefined;
  options?: FoodOption[];
}

const MealPlanDetails = () => {
  const { mealPlanId } = useParams<{ mealPlanId: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [editMealPlanOpen, setEditMealPlanOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [availableMeals, setAvailableMeals] = useState<MealTabInfo[]>([]);

  const generateAvailableMeals = (mealPlan: MealPlan): MealTabInfo[] => {
    const mealsMap: Record<string, MealTabInfo | undefined> = {
      breakfast: mealPlan.breakfast ? {
        id: "breakfast",
        title: "Breakfast",
        icon: <Coffee className="h-4 w-4" />,
        content: mealPlan.breakfast,
        options: mealPlan.breakfastOptions
      } : undefined,
      lunch: mealPlan.lunch ? {
        id: "lunch",
        title: "Lunch",
        icon: <Sandwich className="h-4 w-4" />,
        content: mealPlan.lunch,
        options: mealPlan.lunchOptions
      } : undefined,
      dinner: mealPlan.dinner ? {
        id: "dinner",
        title: "Dinner",
        icon: <UtensilsCrossed className="h-4 w-4" />,
        content: mealPlan.dinner,
        options: mealPlan.dinnerOptions
      } : undefined
    };

    if (mealPlan.snacks) {
      const snackTimes = ["morning", "afternoon", "evening"];

      snackTimes.forEach(time => {
        const timeOptions = mealPlan.snackOptions?.filter(opt =>
          opt.name.toLowerCase().includes(time) ||
          opt.quantity.toLowerCase().includes(time)
        );

        if (timeOptions?.length) {
          mealsMap[`${time}Snack`] = {
            id: `${time}Snack`,
            title: `${time.charAt(0).toUpperCase() + time.slice(1)} Snack`,
            icon: <IceCream className="h-4 w-4" />,
            content: mealPlan.snacks,
            options: timeOptions
          };
        }
      });

      if (!Object.keys(mealsMap).some(key => key.includes("Snack"))) {
        mealsMap.snacks = {
          id: "snacks",
          title: "Snacks",
          icon: <IceCream className="h-4 w-4" />,
          content: mealPlan.snacks,
          options: mealPlan.snackOptions
        };
      }
    }

    return MEAL_ORDER
      .map(id => mealsMap[id])
      .filter((meal): meal is MealTabInfo => meal !== undefined);
  };

  const parseAndRenderMealItems = (mealDescription: string) => {
    if (!mealDescription) return null;

    const items = mealDescription
      .split(/[.,]/)
      .map(item => item.trim())
      .filter(Boolean);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
        {items.map((item, index) => {
          const category = identifyFoodCategory(item);
          const itemColor = category === "carbs" || ["fruits", "vegetables"].includes(category)
            ? NUTRITION_COLORS.carbs
            : category === "fats"
              ? NUTRITION_COLORS.fats
              : NUTRITION_COLORS.protein;

          return (
            <div
              key={index}
              className={`p-2 rounded-md border border-${itemColor}/30`}
              style={{ borderLeftWidth: '4px', borderLeftColor: `var(--${itemColor.replace('-', '-')})` }}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-${itemColor}`} />
                <span>{item}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    if (!mealPlanId) return;

    const foundMealPlan = mealPlanService.getById(mealPlanId);
    if (!foundMealPlan) {
      navigate("/");
      return;
    }

    setMealPlan(foundMealPlan);

    const foundPatient = patientService.getById(foundMealPlan.patientId);
    if (foundPatient) setPatient(foundPatient);

    const meals = generateAvailableMeals(foundMealPlan);
    setAvailableMeals(meals);

    if (meals.length && (!activeTab || !meals.some(m => m.id === activeTab))) {
      setActiveTab(meals[0].id);
    }
  }, [mealPlanId, navigate, activeTab]);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow || !contentRef.current) return;

    const printContent = `
      <html>
        <head>
          <title>${mealPlan?.title || 'Meal Plan'} - ${patient?.name || 'Patient'}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { font-size: 24px; margin-bottom: 5px; }
            h2 { font-size: 20px; margin-top: 20px; margin-bottom: 10px; }
            h3 { font-size: 16px; margin-top: 15px; margin-bottom: 5px; color: #555; }
            p { margin-bottom: 10px; }
            .header { margin-bottom: 30px; }
            .section { margin-bottom: 20px; }
            .food-option { padding: 5px; margin-bottom: 5px; background-color: #f9f9f9; border-radius: 4px; }
            .food-option span { font-weight: bold; }
          </style>
        </head>
        <body>
          ${contentRef.current.innerHTML}
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const handleEditMealPlan = (updatedMealPlan: MealPlan) => {
    setMealPlan(updatedMealPlan);
    const meals = generateAvailableMeals(updatedMealPlan);
    setAvailableMeals(meals);

    if (meals.length && !meals.some(m => m.id === activeTab)) {
      setActiveTab(meals[0].id);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <main className="page-container max-w-5xl w-full">
        <Button
          variant="ghost"
          className="mb-6 hover:bg-white/80 gap-1"
          onClick={() => navigate(`/patient/${patient?.id}`)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Patient
        </Button>

        <Card className="mb-6 overflow-hidden shadow-md rounded-xl animate-fade-in">
          <div className="bg-primary/5 px-6 py-5 border-b border-border">
            <h1 className="text-2xl font-semibold text-primary">{mealPlan?.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Nutritional plan designed for {patient?.name}
            </p>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">Start Date:</span>
                  <span>{mealPlan?.startDate ? format(mealPlan.startDate, "MMMM d, yyyy") : "-"}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <User2 className="h-4 w-4 text-primary" />
                  <span className="font-medium">Patient:</span>
                  <span>{patient?.name}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium">Created:</span>
                  <span>{mealPlan?.createdAt ? format(mealPlan.createdAt, "MMMM d, yyyy") : "-"}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
                <Button
                  variant="outline"
                  onClick={handlePrint}
                  className="bg-white hover:bg-gray-50"
                  size="sm"
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>

                <Button
                  variant="outline"
                  onClick={() => { }}
                  className="bg-white hover:bg-gray-50"
                  size="sm"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>

                <Button
                  onClick={() => setEditMealPlanOpen(true)}
                  size="sm"
                >
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Plan
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Object.entries(mealPlan?.nutritionInfo || {}).map(([key, value]) => {
                const color = NUTRITION_COLORS[key as keyof typeof NUTRITION_COLORS];
                return (
                  <Card key={key} className={`shadow-sm bg-${color}/10`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {key === 'calories' && <Flame className={`h-4 w-4 text-${color}`} />}
                          {key === 'protein' && <Fish className={`h-4 w-4 text-${color}`} />}
                          {key === 'carbs' && <Apple className={`h-4 w-4 text-${color}`} />}
                          {key === 'fats' && (
                            <div className={`h-4 w-4 rounded-full bg-${color} flex items-center justify-center`}>
                              <span className="text-[8px] font-bold text-white">F</span>
                            </div>
                          )}
                          <span className="text-xs font-medium text-gray-600">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        </div>
                        <Badge variant="outline" className="bg-white">Daily</Badge>
                      </div>
                      <p className="text-2xl font-bold text-foreground">
                        {value}
                        <span className="text-sm font-normal ml-1">{key === 'calories' ? 'kcal' : 'g'}</span>
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </Card>

        {availableMeals.length > 0 ? (
          <div className="mb-6">
            <Tabs
              key={availableMeals.map(m => m.id).join('-')}
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
              defaultValue={availableMeals[0]?.id}
            >
              <TabsList
                className="w-full max-w-md mx-auto grid h-auto bg-white shadow-sm rounded-xl"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(availableMeals.length, 4)}, minmax(0, 1fr))`
                }}
              >
                {availableMeals.map((meal) => (
                  <TabsTrigger
                    key={meal.id}
                    value={meal.id}
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-xl py-3"
                  >
                    <div className="flex flex-col items-center gap-1">
                      {meal.icon}
                      <span className="text-xs font-medium">{meal.title}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="mt-6 space-y-6" ref={contentRef}>
                {availableMeals.map((meal) => (
                  <TabsContent key={meal.id} value={meal.id} className="animate-fade-in">
                    <Card className="overflow-hidden shadow-sm rounded-xl">
                      <div className="flex items-center gap-3 bg-primary/5 px-6 py-4 border-b border-border">
                        {meal.icon}
                        <h2 className="text-lg font-medium text-primary">{meal.title}</h2>
                      </div>
                      <CardContent className="p-6">
                        <div className="prose max-w-none">
                          <h3 className="text-base font-semibold text-gray-700 mb-2">Current Meal</h3>
                          <div className="bg-white p-4 rounded-lg border border-border shadow-sm">
                            <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-2">{meal.content}</p>
                            {parseAndRenderMealItems(meal.content || "")}
                          </div>
                        </div>

                        {meal.options && meal.options.length > 0 && (
                          <div className="mt-6">
                            <h3 className="text-base font-semibold text-gray-700 mb-2">Food Options</h3>
                            <div className="bg-white p-4 rounded-lg border border-border">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {meal.options.map((option, index) => {
                                  const category = identifyFoodCategory(option.name);
                                  const categoryColor = foodCategories[category].color;

                                  return (
                                    <div
                                      key={index}
                                      className={`flex items-center justify-between py-2 px-3 rounded-md border border-${categoryColor}/30`}
                                      style={{ borderLeftWidth: '4px', borderLeftColor: `var(--${categoryColor.replace('-', '-')})` }}
                                    >
                                      <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full bg-${categoryColor}`}></div>
                                        <span className="font-medium">{option.name}</span>
                                      </div>
                                      <Badge variant="outline" className="ml-2 bg-white">{option.quantity}</Badge>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </div>
        ) : (
          <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500">No meals have been added to this plan yet.</p>
            <Button
              onClick={() => setEditMealPlanOpen(true)}
              className="mt-4"
              variant="outline"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Add Meals to Plan
            </Button>
          </div>
        )}

        {mealPlan?.notes && (
          <Card className="overflow-hidden shadow-sm rounded-xl animate-fade-in mb-6">
            <div className="flex items-center gap-3 bg-primary/5 px-6 py-4 border-b border-border">
              <AlertCircle className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-primary">Additional Notes</h2>
            </div>
            <CardContent className="p-6">
              <div className="bg-white p-4 rounded-lg border border-border shadow-sm">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{mealPlan.notes}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <AddMealPlanDialog
        patientId={patient?.id || ""}
        open={editMealPlanOpen}
        onOpenChange={setEditMealPlanOpen}
        onSave={handleEditMealPlan}
        mealPlanToEdit={mealPlan || undefined}
      />
    </div>
  );
};

export default MealPlanDetails;
