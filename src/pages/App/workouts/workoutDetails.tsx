import { DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

interface WorkoutDetailsProps {
    workout: {
        id: string;
        training: string;
        name: string;
        duration: number;
        calories: number;
        description: string;
        created_at: string;
    }
}

export function WorkoutDetails({ workout }: WorkoutDetailsProps) {

    const formattedDate = format(new Date(workout.created_at), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR
    });

    return (
        <DialogContent>
            <DialogHeader>
                <DialogDescription className="text-lg text-muted-foreground ml-4 mb-2">Detalhes do treino</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Tipo de treino</TableCell>
                            <TableCell className="flex justify-end">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                                    <span className="font-medium text-muted-foreground">{workout.training}</span>
                                </div>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Exercício realizado</TableCell>
                            <TableCell className="flex justify-end">
                                {workout.name}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Tempo de duração</TableCell>
                            <TableCell className="flex justify-end">
                                {workout.duration} minutos
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Calorias</TableCell>
                            <TableCell className="flex justify-end">
                                {workout.calories} Kcal
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Data da realização</TableCell>
                            <TableCell className="flex justify-end">
                                {formattedDate}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Descrição do treino</TableCell>
                            <TableCell className="flex justify-end ml-16 ">
                                {workout.description}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </DialogContent>
    )
}