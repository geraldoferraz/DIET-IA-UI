import { Patient } from '@/lib/data';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";

interface PatientHeaderProps {
  patient: Patient;
  onEdit: () => void;
  onAddMealPlan: () => void;
}

export function PatientHeader({ patient, onEdit, onAddMealPlan }: PatientHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-16 w-16 border-0">
        <AvatarFallback>
          {patient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <h1 className="text-xl font-semibold">{patient.name}</h1>
        <p className="text-muted-foreground">{patient.email}</p>
      </div>

      <Button variant="outline" onClick={onEdit}>
        <Edit className="mr-2 h-4 w-4" />
        Editar
      </Button>

      <Button onClick={onAddMealPlan}>
        <Plus className="h-4 w-4" />
        Criar Plano
      </Button>
    </div>
  );
} 