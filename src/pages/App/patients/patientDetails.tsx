import { getPatientById } from "@/api/patients";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

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

export function PatientDetails() {
    const { id } = useParams();

    const { data: patient, isLoading } = useQuery<Patient>({
        queryKey: ['patient', id],
        queryFn: () => getPatientById(id as string),
    });

    return (
        <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
            <div className="w-full">
                    <CardContent>
                        <form className="space-y-6">

                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { label: "Name", name: "name", type: "text", value: patient?.name },
                                    { label: "Email", name: "email", type: "email", value: patient?.email },
                                    { label: "CPF", name: "cpf", type: "text", value: patient?.cpf },
                                    { label: "Telefone", name: "phone", type: "text", value: patient?.phone },
                                    { label: "Data de nascimento", name: "birthDate", type: "date", value: patient?.birthDate },
                                    { label: "Peso (kg)", name: "weight", type: "number", value: patient?.weight },
                                    { label: "Altura (cm)", name: "height", type: "number", value: patient?.height },
                                    { label: "Endereço", name: "address", type: "text", value: patient?.address }
                                ].map(({ label, name, type, value }) => (
                                    <div className="space-y-2" key={name}>
                                        {isLoading ? (
                                            <Skeleton className="h-10 w-full mt-3" />
                                        ) : (
                                            <>
                                                <Label htmlFor={name}>{label}</Label>
                                                <Input
                                                    id={name}
                                                    type={type}
                                                    defaultValue={value}
                                                />
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end items-center gap-6 pt-4">
                                {isLoading ? (
                                    <>
                                        <Skeleton className="h-10 w-24 mt-3" />
                                        <Skeleton className="h-10 w-32 mt-3" />
                                    </>
                                ) : (
                                    <>
                                        <Button variant="outline" asChild>
                                            <Link
                                                to="/home"
                                                className="flex items-center gap-2"
                                            >
                                                <ArrowLeft className="w-4 h-4" />
                                                Voltar
                                            </Link>
                                        </Button>
                                        <Button type="submit" className="text-white font-bold">
                                            Salvar alterações
                                        </Button>
                                    </>
                                )}
                            </div>
                        </form>
                    </CardContent>
            </div>
        </div>
    );
}