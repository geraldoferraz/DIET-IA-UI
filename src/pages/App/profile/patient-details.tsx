import { useNavigate } from "react-router-dom";
import { User2, ClipboardList, History } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePatientProfile } from "@/hooks/usePatientProfile";
import { mockPatients } from "@/mocks/patient";
import { PatientHeader } from "./components/PatientHeader";
import { PatientDetails } from "../patients/patientDetails";
import { MealPlansList } from "./components/MealPlansList";
import AddPatientDialog from "./components/AddPatientDialog";
import AddMealPlanDialog from "./components/AddMealPlanDialog";
import DeleteMealPlanDialog from "./components/DeleteMealPlanDialog";

export default function PatientProfile() {
    const navigate = useNavigate();
    const {
        patient,
        mealPlans,
        editPatientOpen,
        addMealPlanOpen,
        mealPlanToEdit,
        mealPlanToDelete,
        setEditPatientOpen,
        setAddMealPlanOpen,
        setMealPlanToEdit,
        handleDeleteDialogChange,
        handleEditPatient,
        handleMealPlanSave,
        handleDeleteMealPlan,
        confirmDeleteMealPlan,
    } = usePatientProfile(mockPatients[0]);

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6">

                <Card className="w-full mb-6">
                    <div className="px-6 py-6">
                        <PatientHeader
                            patient={patient}
                            onEdit={() => setEditPatientOpen(true)}
                            onAddMealPlan={() => setAddMealPlanOpen(true)}
                        />

                        <Tabs defaultValue="profile" className="mt-6">
                            <TabsList className="bg-transparent p-0 h-12 w-full flex justify-start border-b">
                                <TabsTrigger
                                    value="profile"
                                    className="h-12 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-primary px-6"
                                >
                                    <User2 className="h-4 w-4 mr-2" />
                                    Profile
                                </TabsTrigger>
                                <TabsTrigger
                                    value="anamnese"
                                    className="h-12 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-primary px-6"
                                >
                                    <History className="h-4 w-4 mr-2" />
                                    Anamnese
                                </TabsTrigger>
                                <TabsTrigger
                                    value="mealPlans"
                                    className="h-12 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-primary px-6"
                                >
                                    <ClipboardList className="h-4 w-4 mr-2" />
                                    Meal Plans
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="profile" className="pt-6">
                                <PatientDetails />
                            </TabsContent>

                            {/* <TabsContent value="anamnese" className="pt-6">
                                <Anamnese />
                            </TabsContent> */}

                            <TabsContent value="mealPlans" className="pt-6">
                                <MealPlansList
                                    mealPlans={mealPlans}
                                    onAddPlan={() => setAddMealPlanOpen(true)}
                                    onEditPlan={(id) => {
                                        const plan = mealPlans.find(p => p.id === id);
                                        setMealPlanToEdit(plan);
                                        setAddMealPlanOpen(true);
                                    }}
                                    onDeletePlan={handleDeleteMealPlan}
                                    onViewPlan={(id) => navigate(`/meal-plan/${id}`)}
                                />
                            </TabsContent>
                        </Tabs>
                    </div>
                </Card>
            </div>

            <AddPatientDialog
                open={editPatientOpen}
                onOpenChange={setEditPatientOpen}
                onSave={handleEditPatient}
                patientToEdit={patient}
            />

            <AddMealPlanDialog
                patientId={patient.id}
                open={addMealPlanOpen}
                onOpenChange={setAddMealPlanOpen}
                onSave={handleMealPlanSave}
                mealPlanToEdit={mealPlanToEdit}
            />

            <DeleteMealPlanDialog
                open={!!mealPlanToDelete}
                onOpenChange={handleDeleteDialogChange}
                onConfirm={confirmDeleteMealPlan}
            />
        </div>
    );
}

