// import { createAnamnese } from "@/api/anamnese";
import { getPatientById } from "@/api/patients";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { FormValues } from "@/types/Anamnese";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PatientHeader } from "../profile/PatientHeader";

type FormFieldProps = {
    field: ControllerRenderProps<FormValues, keyof FormValues>;
};

export function CreateAnamnese() {
    const { patientId } = useParams();
    const navigate = useNavigate();

    const { data: patient, isLoading: isLoadingPatient } = useQuery({
        queryKey: ["patient", patientId],
        queryFn: () => getPatientById(patientId as string),
    });

    const form = useForm<FormValues>({
        defaultValues: {
            weight: 0,
            height: 0,
            waterIntake: 0,
            fatPercentage: 0,
            physicalActivity: "",
            mealsFrequency: "",
            sleepQuality: "",
            bathroomQuality: "",
            objective: "",
            notes: ""
        },
    });

    const onSubmit = async (data: FormValues) => {
        console.log(data);
        // try {
        //     await createAnamnese({
        //         ...data,
        //         patientId: patientId as string,
        //     });
        //     navigate(`/patient/${patientId}`);
        // } catch (error) {
        //     console.error(error);
        // }
    };

    return (
        <div className="p-6 space-y-6">
            <Card className="p-6">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                        <PatientHeader patient={patient} isLoading={isLoadingPatient} />
                    </div>
                        <Button className="flex items-center gap-2" variant="outline" type="button" onClick={() => navigate(-1)}>
                            Cancelar
                            <X className="w-4 h-4 mr-2" />
                        </Button>
                    </div>
                    <Separator className="mb-8 mt-2" />
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="weight"
                                render={({ field }: FormFieldProps) => (
                                    <FormItem>
                                        <FormLabel>Peso (kg)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                {...field}
                                                onChange={e => field.onChange(parseFloat(e.target.value))} 
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="height"
                                render={({ field }: FormFieldProps) => (
                                    <FormItem>
                                        <FormLabel>Altura (m)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                {...field}
                                                onChange={e => field.onChange(parseFloat(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="waterIntake"
                                render={({ field }: FormFieldProps) => (
                                    <FormItem>
                                        <FormLabel>Ingestão de Água (L)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.1"
                                                {...field}
                                                onChange={e => field.onChange(parseFloat(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="fatPercentage"
                                render={({ field }: FormFieldProps) => (
                                    <FormItem>
                                        <FormLabel>Percentual de Gordura (%)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.1"
                                                {...field}
                                                onChange={e => field.onChange(parseFloat(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="physicalActivity"
                            render={({ field }: FormFieldProps) => (
                                <FormItem>
                                    <FormLabel>Atividade Física</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="mealsFrequency"
                            render={({ field }: FormFieldProps) => (
                                <FormItem>
                                    <FormLabel>Frequência das Refeições</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="sleepQuality"
                            render={({ field }: FormFieldProps) => (
                                <FormItem>
                                    <FormLabel>Qualidade do Sono</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bathroomQuality"
                            render={({ field }: FormFieldProps) => (
                                <FormItem>
                                    <FormLabel>Qualidade das Evacuações</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="objective"
                            render={({ field }: FormFieldProps) => (
                                <FormItem>
                                    <FormLabel>Objetivo</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }: FormFieldProps) => (
                                <FormItem>
                                    <FormLabel>Observações</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-4">
                            <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                                Cancelar
                            </Button>
                            <Button type="submit">Salvar Anamnese</Button>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
