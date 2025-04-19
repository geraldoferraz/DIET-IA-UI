import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ShieldX } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Unathorized() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="max-w-md w-full p-12 text-center">
                <div className="space-y-6">
                    <ShieldX className="h-12 w-12 mx-auto text-rose-500" />
                    <div className="space-y-2">
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Acesso não autorizado
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Você não tem permissão para acessar esta página.
                        </p>
                    </div>

                    <Button
                        onClick={handleGoBack}
                        className="w-full"
                        variant="outline"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar para a página anterior
                    </Button>
                </div>
            </Card>
        </div>
    );
}
