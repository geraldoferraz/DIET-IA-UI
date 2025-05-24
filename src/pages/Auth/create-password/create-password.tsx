import { createPassword } from "@/api/patients";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface CreatePasswordFormData {
    password: string;
    confirmPassword: string;
}

interface CreatePasswordPayload {
    password: string;
    token: string;
}

export function CreatePassword() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const token = new URLSearchParams(search).get("token");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreatePasswordFormData>();

    const createPasswordMutation = useMutation({
        mutationFn: async ({ password }: { password: string }) => {
            if (!token) {
                toast.error("Erro ao criar senha. Tente novamente.");
                return;
            }

            const payload: CreatePasswordPayload = {
                password,
                token,
            };

            return await createPassword(payload);
        },
        onSuccess: () => {
            toast.success("Senha criada com sucesso!");
            navigate("/sign-in");
        },
        onError: (err: Error) => {
            toast.error(err.message || "Erro ao criar senha. Tente novamente.");
        },
    });

    const onSubmit = (data: CreatePasswordFormData) => {
        if (data.password !== data.confirmPassword) {
            toast.error("As senhas não coincidem");
            return;
        }

        if (data.password.length < 6) {
            toast.error("A senha deve ter no mínimo 6 caracteres");
            return;
        }

        createPasswordMutation.mutate({ password: data.password });
    };

    return (
        <>
            <Helmet title="Criar Senha" />
            <div className="min-h-screen flex items-center justify-center">
                <Card className="max-w-md w-full p-12 sm:p-8 rounded-2xl">
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Criar Nova Senha
                        </h1>
                    </div>

                    <p className="text-sm text-muted-foreground mb-8 text-center">
                        Digite sua nova senha para acessar a plataforma.
                    </p>

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Nova Senha</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Digite sua nova senha"
                                    {...register("password", { required: true })}
                                    className={cn(errors.password && "border-red-500 focus-visible:ring-red-500")}
                                />
                                {errors.password && (
                                    <span className="text-xs text-red-500">
                                        Este campo é obrigatório
                                    </span>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirme sua nova senha"
                                    {...register("confirmPassword", { required: true })}
                                    className={cn(errors.confirmPassword && "border-red-500 focus-visible:ring-red-500")}
                                />
                                {errors.confirmPassword && (
                                    <span className="text-xs text-red-500">
                                        Este campo é obrigatório
                                    </span>
                                )}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-10 relative overflow-hidden group"
                            disabled={createPasswordMutation.isPending}
                        >
                            <div className="relative flex items-center justify-center gap-2">
                                {createPasswordMutation.isPending ? (
                                    <>
                                        <Loader2 className="animate-spin h-5 w-5" />
                                        <span>Criando senha...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                        >
                                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                            <polyline points="10 17 15 12 10 7" />
                                            <line x1="15" y1="12" x2="3" y2="12" />
                                        </svg>
                                        <span className="font-bold">Criar Senha</span>
                                    </>
                                )}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </Button>
                    </form>

                    {createPasswordMutation.isPending && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <Loader2 className="animate-spin text-white w-10 h-10" />
                        </div>
                    )}
                </Card>
            </div>
        </>
    );
}
