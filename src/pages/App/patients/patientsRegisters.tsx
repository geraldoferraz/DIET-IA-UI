import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PatientTableRow } from "./patientTableRow";
import { findPatients } from "@/api/patients";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

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

export function PatientsRegisters() {

    const { data: patients = [], isLoading } = useQuery({
        queryKey: ["patients"],
        queryFn: findPatients,
    });

    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]"></TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead className="w-[300px]">E-mail</TableHead>
                        <TableHead className="w-[250px]">Data de Nascimento</TableHead>
                        <TableHead className="w-[250px]">Telefone</TableHead>
                        <TableHead className="w-[250px]">Endereço</TableHead>
                        <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        Array.from({ length: 10 }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                            </TableRow>
                        ))
                    ) : patients.length > 0 ? (
                        patients?.map((patient: Patient) => (
                            <PatientTableRow key={patient.id} patient={patient} />
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500 py-8 font-medium text-base">
                                Nenhum paciente foi encontrado.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}