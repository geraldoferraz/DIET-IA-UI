import { MealPlan, Patient } from '@/lib/data';
import { useState } from 'react';
import { toast } from 'sonner';

export function usePatientProfile(initialPatient: Patient) {
  const [patient, setPatient] = useState<Patient>(initialPatient);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [editPatientOpen, setEditPatientOpen] = useState(false);
  const [addMealPlanOpen, setAddMealPlanOpen] = useState(false);
  const [mealPlanToEdit, setMealPlanToEdit] = useState<MealPlan | undefined>();
  const [mealPlanToDelete, setMealPlanToDelete] = useState<string | null>(null);

  const handleEditPatient = (updatedPatient: Patient) => {
    setPatient(updatedPatient);
    toast.success(`Paciente atualizado com sucesso: ${updatedPatient.name}`);
  };

  const handleMealPlanSave = (updatedMealPlan: MealPlan) => {
    if (mealPlanToEdit) {
      setMealPlans(plans => plans.map(plan => 
        plan.id === updatedMealPlan.id ? updatedMealPlan : plan
      ));
      toast.success(`Plano atualizado: ${updatedMealPlan.title}`);
    } else {
      setMealPlans(plans => [updatedMealPlan, ...plans]);
      toast.success(`Novo plano criado: ${updatedMealPlan.title}`);
    }
    setMealPlanToEdit(undefined);
  };

  const handleDeleteMealPlan = (id: string) => setMealPlanToDelete(id);

  const confirmDeleteMealPlan = () => {
    if (mealPlanToDelete) {
      setMealPlans(plans => plans.filter(plan => plan.id !== mealPlanToDelete));
      toast.success('Plano alimentar excluído');
      setMealPlanToDelete(null);
    }
  };

  const handleDeleteDialogChange = (open: boolean) => {
    if (!open) setMealPlanToDelete(null);
  };

  return {
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
  };
} 