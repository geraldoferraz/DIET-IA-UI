    import { anamnese } from "@/api/anamnese";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { AnamnesePageProps } from "@/types/Anamnese";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ClipboardX, Eye, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PaginationComponent } from "./pagination";
import { AnamneseSkeleton } from "./skeleton";

export function AnamnesePage({ patientId, page: initialPage, itemsPerPage }: AnamnesePageProps) {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const navigate = useNavigate();

    const { data: anamneseData, isLoading } = useQuery({
        queryKey: ["patient-anamnese", patientId, currentPage, itemsPerPage],
        queryFn: async () => {
            const result = await anamnese(patientId, currentPage, itemsPerPage);
            return result;
        }
    });

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
    <div className="p-6">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold ml-2 text-foreground">Histórico de Anamneses</h2>
            <Button
                onClick={() => navigate(`/anamnese/${patientId}`)}
                variant="default"
                size="sm"
                className="flex items-center gap-2"
            >
                <Plus className="h-4 w-4" />
                Criar Anamnese
            </Button>
        </div>
        <div className="space-y-8">
        {isLoading ? (
            <AnamneseSkeleton />
        ) : !anamneseData?.data || anamneseData.data.length === 0 ? (
            <Card className="p-10">
                <div className="text-center py-12 text-foreground flex flex-col items-center gap-4">
                    <ClipboardX className="h-12 w-12 text-foreground" />
                    <span className="text-lg font-medium">Nenhuma anamnese registrada</span>
                </div>
            </Card>
        ) : (
            <>
            {anamneseData.data.map((anamnese, index) => (
            <Card
                key={anamnese.id || index}
                className="overflow-hidden bg-card hover:shadow-lg transition-all duration-300 rounded-lg"
            >
                <div className="border-l-4 border-l-primary h-full">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-14 w-14 border-2 border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-primary">
                            {anamnese.user?.name.split(' ').slice(0,2).map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                        </Avatar>
                        <div>
                        <h4 className="font-medium text-foreground">{anamnese.user?.name}</h4>
                        <time className="text-sm text-muted-foreground">
                            {format(
                            new Date(anamnese.createdAt || new Date()),
                                "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                            { locale: ptBR }
                            )}
                        </time>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Deletar
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </div>

                    <Separator style={{ marginBottom: "20px", marginTop: "-8px" }} />

                    <div className="space-y-6">
                    <div className="bg-primary/5 rounded-lg p-4">
                        <h5 className="text-sm font-semibold text-primary mb-3">
                        Medições e Avaliações
                        </h5>
                        <div className="grid grid-cols-4 gap-4">
                        <div className="rounded p-3">
                            <span className="text-xs text-muted-foreground block">Peso</span>
                            <p className="text-lg font-medium">{anamnese.weight}kg</p>
                        </div>
                        <div className="rounded p-3">
                            <span className="text-xs text-muted-foreground block">Altura</span>
                            <p className="text-lg font-medium">{anamnese.height}m</p>
                        </div>
                        <div className="rounded p-3">
                            <span className="text-xs text-muted-foreground block">IMC</span>
                            <p className="text-lg font-medium">
                            {anamnese.imc}
                            </p>
                        </div>
                        <div className="rounded p-3">
                            <span className="text-xs text-muted-foreground block">Percentual de Gordura</span>
                            <p className="text-lg font-medium">
                            {anamnese.fatPercentage}
                            </p>
                        </div>
                        </div>
                    </div>

                    {anamnese.notes && (
                        <div className="bg-muted/30 border rounded-lg p-4">
                        <h5 className="text-sm font-semibold text-primary mb-3">
                            Observações da Consulta
                        </h5>
                        <p className="text-sm leading-relaxed">{anamnese.notes}</p>
                        </div>
                    )}
                    </div>
                </div>
                </div>
            </Card>
            ))}

            {anamneseData.pagination.pages > 1 && (
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={anamneseData.pagination.pages}
                    onPageChange={handlePageClick}
                />
            )}
            </>
        )}
        </div>
    </div>
    );
}
