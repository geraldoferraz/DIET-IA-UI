import { findPatients } from "@/api/patients";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { queryClient } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { UserX2 } from "lucide-react";
import { useEffect } from "react";
import { PatientTableRow } from "./patientTableRow";

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

    useEffect(() => {
        queryClient.prefetchQuery({
            queryKey: ["patients"],
            queryFn: findPatients,
        });
    }, []);

    const { data: patients = [], isLoading } = useQuery({
        queryKey: ["patients"],
        queryFn: findPatients,
    });

    if (isLoading) {
        return (
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]"></TableHead>
                            <TableHead>
                                <Skeleton className="h-4 w-32" />
                            </TableHead>
                            <TableHead className="w-[300px]">
                                <Skeleton className="h-4 w-40" />
                            </TableHead>
                            <TableHead className="w-[250px]">
                                <Skeleton className="h-4 w-36" />
                            </TableHead>
                            <TableHead className="w-[250px]">
                                <Skeleton className="h-4 w-32" />
                            </TableHead>
                            <TableHead className="w-[250px]">
                                <Skeleton className="h-4 w-28" />
                            </TableHead>
                            <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-40" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-48" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-32" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-28" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-36" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-8 w-20" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

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
                    {patients.length > 0 ? (
                        patients?.map((patient: Patient) => (
                            <PatientTableRow key={patient.id} patient={patient} />
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="h-[400px] align-middle">
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <UserX2 className="w-16 h-16 text-green-600" />
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-lg font-semibold text-gray-700">
                                            Nenhum paciente encontrado
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Cadastre um novo paciente para começar
                                        </span>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}