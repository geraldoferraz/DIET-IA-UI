import { Link, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { getPatientById } from "@/api/patients";
import { ArrowLeft } from "lucide-react";
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

const getInitials = (name: string | undefined) => {
    if (!name) return "??";
    const words = name.split(" ");
    const firstInitial = words[0]?.charAt(0) || "";
    const lastInitial = words.length > 1 ? words[words.length - 1].charAt(0) : "";
    return (firstInitial + lastInitial).toUpperCase();
};

export function PatientDetails() {
    const { id } = useParams();

    const { data: patient, isLoading } = useQuery<Patient>({
        queryKey: ['patient', id],
        queryFn: () => getPatientById(id as string),
    });

    return (
        <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
            <div className="p-6 w-full">
                <h1 className="text-2xl font-bold mb-6">Perfil do Paciente</h1>
                <Card>
                    <CardContent className="pt-6">
                        <form className="space-y-6">
                            <div className="flex items-center gap-4">
                                {isLoading ? (
                                    <>
                                        <Skeleton className="w-16 h-16 rounded-full" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-5 w-24" />
                                            <Skeleton className="h-4 w-48" />
                                        </div>
                                        <Skeleton className="h-10 w-16" />
                                    </>
                                ) : (
                                    <>
                                        <Avatar className="w-16 h-16">
                                            <AvatarImage src="" alt="Avatar" />
                                            <AvatarFallback>
                                                {getInitials(patient?.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-medium">Your avatar</h3>
                                            <p className="text-sm text-muted-foreground">
                                                PNG or JPG less than 500px in width and height.
                                            </p>
                                        </div>
                                        <Button type="button" variant="secondary">Add</Button>
                                    </>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
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

                            <div className="flex justify-end items-center gap-6 pt-6">
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
                </Card>
            </div>
        </div>
    );
}