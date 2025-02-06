import { DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";

interface Patient {
    id: string;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    birthDate: string;
    weight?: number;
    height?: number;
    address?: string;
    createdAt?: string;
}

export function PatientDetails({ patient }: { patient: Patient }) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogDescription className="text-lg text-muted-foreground ml-4 mb-2">Detalhes do Paciente</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
                <p><strong>Nome:</strong> {patient.name}</p>
                <p><strong>CPF:</strong> {patient.cpf}</p>
                <p><strong>Telefone:</strong> {patient.phone}</p>
                <p><strong>Endereço:</strong> {patient.address || "Não informado"}</p>
            </div>
        </DialogContent>
    );
}