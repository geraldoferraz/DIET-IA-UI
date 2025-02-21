import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Search } from "lucide-react";
import { FaTrashAlt } from "react-icons/fa";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TableCell, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { deletePatient } from "@/api/patients";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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

export function PatientTableRow({ patient }: { patient: Patient }) {
    const navigate = useNavigate();
    const formattedDate = format(new Date(patient.birthDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

    const deletePatientMutation = useMutation({
        mutationFn: deletePatient,
        onSuccess: () => {
            toast.success("Paciente excluído com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["patients"] });
        },
        onError: (error) => {
            toast.error("Erro ao excluir paciente");
            console.error("Erro ao excluir paciente:", error);
        }
    });

    function handleDeletePatient(id: string) {
        deletePatientMutation.mutate(id);
    }

    const handleNavigateToDetails = () => {
        navigate(`/patient/${patient.id}`);
    };

    return (
        <TableRow>
            <TableCell>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNavigateToDetails}
                >
                    <Search className="w-3 h-3" />
                    <span className="sr-only">Ver detalhes do paciente</span>
                </Button>
            </TableCell>
            <TableCell className="font-semibold">{patient.name}</TableCell>
            <TableCell className="font-semibold">{patient.email}</TableCell>
            <TableCell className="font-medium text-muted-foreground">{formattedDate}</TableCell>
            <TableCell className="font-medium text-muted-foreground">{patient.phone}</TableCell>
            <TableCell className="font-medium text-muted-foreground truncate overflow-hidden whitespace-nowrap max-w-[250px]">{patient.address || ""}</TableCell>
            <TableCell>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline">
                            <FaTrashAlt className="w-3.7 h-3.7" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Você deseja apagar o registro do paciente selecionado?</AlertDialogTitle>
                            <AlertDialogDescription className="pb-5">
                                Essa ação vai fazer com que você perca o registro do paciente específico.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeletePatient(patient.id)}>Confirmar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </TableCell>
        </TableRow>
    );
}