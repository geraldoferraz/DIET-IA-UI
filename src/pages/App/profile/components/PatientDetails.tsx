import { Patient } from '@/lib/data';
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

interface PatientDetailsProps {
  patient: Patient;
}

export function PatientDetails2({ patient }: PatientDetailsProps) {
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Informações do Paciente</h3>
        <div className="grid grid-cols-2 gap-y-4 text-sm">
          <InfoItem label="Idade" value={`${patient.age} anos`} />
          <InfoItem label="Peso" value={`${patient.weight} kg`} />
          <InfoItem label="Altura" value={`${patient.height} cm`} />
          <InfoItem 
            label="Paciente desde" 
            value={format(patient.createdAt, "dd/MM/yyyy")} 
          />
        </div>
      </Card>

      {patient.goal && (
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Objetivo Nutricional</h3>
          <p>{patient.goal}</p>
        </Card>
      )}

      {patient.notes && (
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Observações Clínicas</h3>
          <p className="whitespace-pre-line">{patient.notes}</p>
        </Card>
      )}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
} 