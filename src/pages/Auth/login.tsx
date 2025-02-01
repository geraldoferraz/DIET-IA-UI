import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "@/api/login";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export function Login() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isLoading },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            toast.success("Login realizado com sucesso!");
            navigate('/home');
        },
        onError: (error) => {
            toast.error("Email ou senha inválidos");
            console.error("Erro ao fazer login:", error);
        }
    });

    async function onSubmit(data) {
        loginMutation.mutate(data);
    }

    return (
        <>
            <Helmet title="Login" />
            <div className="min-h-screen flex items-center justify-center">
                <Card className="max-w-md w-full p-12 sm:p-8 rounded-2xl">
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Bem-vindo de volta
                        </h1>
                    </div>

                    <p className="text-sm text-muted-foreground mb-8 text-center">
                        Acesse seus monitoramentos e acompanhe sua evolução.
                    </p>

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    {...register("email")}
                                    className={cn(errors.email && "border-red-500 focus-visible:ring-red-500")}
                                />
                                {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Digite sua senha"
                                    {...register("password")}
                                    className={cn(errors.password && "border-red-500 focus-visible:ring-red-500")}
                                />
                                {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
                            </div>
                        </div>

                        <Button
                            disabled={isSubmitting || isLoading}
                            type="submit"
                            className="w-full h-10 relative overflow-hidden group"
                        >
                            <div className="relative flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <>
                                        <FaSpinner className="animate-spin h-5 w-5" />
                                        <span>Entrando...</span>
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
                                        <span className="font-bold">Acessar Plataforma</span>
                                    </>
                                )}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t">
                        <div className="flex flex-col gap-3">
                            <p className="text-sm text-muted-foreground">
                                Ainda não tem uma conta?
                            </p>
                            <div className="flex flex-col gap-2">
                                <Button
                                    variant="outline"
                                    className="w-full p-6 flex justify-between"
                                    asChild
                                >
                                    <Link to="/sign-up" className="flex items-center justify-between w-full">
                                        <span className="flex items-center gap-2">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-primary"
                                            >
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                                <circle cx="9" cy="7" r="4" />
                                                <line x1="19" y1="8" x2="19" y2="14" />
                                                <line x1="22" y1="11" x2="16" y2="11" />
                                            </svg>
                                            <span className="flex flex-col items-start text-left ml-2">
                                                <span className="text-sm font-medium">Criar conta gratuita</span>
                                                <span className="text-xs text-muted-foreground">
                                                    Comece sua jornada de transformação agora
                                                </span>
                                            </span>
                                        </span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {isLoading && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <FaSpinner className="animate-spin text-white w-10 h-10" />
                        </div>
                    )}
                </Card>
            </div>
        </>
    );
}
