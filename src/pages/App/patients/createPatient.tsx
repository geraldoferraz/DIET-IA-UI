import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PiPlusCircleBold } from "react-icons/pi";
import { FaCirclePlus } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPatient } from "@/api/patients";
import { toast } from "sonner";

const schema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
    phone: z.string().min(10, "Telefone inválido"),
    birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
    weight: z.preprocess((val) => Number(val) || 0, z.number().positive("Peso deve ser um número positivo").optional()),
    height: z.preprocess((val) => Number(val) || 0, z.number().positive("Altura deve ser um número positivo").optional()),
    address: z.string().min(1, "Endereço é obrigatório"),
    number: z.string().min(1, "Número é obrigatório"),
    neighborhood: z.string().min(1, "Bairro é obrigatório"),
    apartment: z.string().optional(),
});

export function CreatePatientDialog() {
    const userStore = useAuthStore((state) => state.user);
    const user = userStore?.user;
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
    });

    const createPatientMutation = useMutation({
        mutationFn: createPatient,
        onSuccess: async () => {
            toast.success("Paciente cadastrado com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["patients"] });
            reset();
            setIsOpen(false);
        },
        onError: (error) => {
            toast.error("Erro ao cadastrar paciente, verifique se o CPF ou e-mail já estão cadastrados");
            console.error("Erro ao cadastrar paciente:", error);
        }
    });

    function handleCreatePatient(data) {
        const fullAddress = `${data.address} ${data.number}, ${data.neighborhood}${data.apartment ? `, Apt: ${data.apartment}` : ""}`;
        const patientData = { ...data, address: fullAddress };
        delete patientData.number;
        delete patientData.neighborhood;
        delete patientData.apartment;
        createPatientMutation.mutate(patientData);
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)} className="flex items-center text-sm font-bold text-white mb-5">
                Adicionar paciente
                <FaCirclePlus className="w-6 h-6" />
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-screen-2xl max-h-[100vh] w-full flex flex-col justify-center rounded-lg overflow-auto">
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-2xl font-bold text-gray-800">Cadastrar Novo Paciente</DialogTitle>
                        <DialogDescription className="text-md text-gray-600 mb-6">
                            Preencha os dados abaixo para adicionar um novo paciente.
                        </DialogDescription>
                    </DialogHeader>

                    <Separator className="my-4" />
                    <div className="flex items-center mb-6 gap-3">
                        Nutricionista responsável <Separator orientation="vertical" className="h-6 w-px bg-gray-300" /> <span className="text-base font-medium text-black">{user?.name}</span>
                    </div>

                    <form onSubmit={handleSubmit(handleCreatePatient)} className="grid grid-cols-2 gap-8">
                        {[
                            { label: "Nome", name: "name", type: "text" },
                            { label: "E-mail", name: "email", type: "email" },
                            { label: "CPF", name: "cpf", type: "text" },
                            { label: "Telefone", name: "phone", type: "text" },
                            { label: "Data de Nascimento", name: "birthDate", type: "date" },
                            { label: "Peso (kg)", name: "weight", type: "number" },
                            { label: "Altura (cm)", name: "height", type: "number" },
                            { label: "Endereço", name: "address", type: "text" },
                            { label: "Número", name: "number", type: "text" },
                            { label: "Bairro", name: "neighborhood", type: "text" },
                            { label: "Apartamento", name: "apartment", type: "text" },
                        ].map(({ label, name, type }) => (
                            <div className="flex flex-col" key={name}>
                                <Label htmlFor={name} className="font-medium text-gray-700 mb-2 ml-1">{label}</Label>
                                <Input id={name} type={type} {...register(name)} className={errors[name] ? "border-red-500" : ""} placeholder={label} />
                                {errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>}
                            </div>
                        ))}

                        <div className="col-span-2 flex justify-end items-center gap-4 mt-4">
                            <Button type="submit" className="w-full mb-6 text-white font-bold py-3 rounded-lg">
                                Adicionar paciente <PiPlusCircleBold className="ml-2" />
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}