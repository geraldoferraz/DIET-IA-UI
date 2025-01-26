import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableRow, TableCell } from "@/components/ui/table";
import { Search } from "lucide-react";
import { WorkoutDetails } from "./workoutDetails";
import { FaTrashAlt } from "react-icons/fa";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface WorkoutTableRowProps {
    workout: {
        id: string;
        training: string;
        name: string;
        calories: number;
        duration: number;
        description: string;
        created_at: string;
    };
}

export function WorkoutTableRow({ workout }: WorkoutTableRowProps) {
    const formattedDate = format(new Date(workout.created_at), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR
    });

    function handleDeleteWorkout(id: string){
        console.log('ID do registro:', id)
    }

    return (
        <TableRow>
            <TableCell>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Search className="w-3 h-3" />
                            <span className="sr-only">Detalhes do treino</span>
                        </Button>
                    </DialogTrigger>

                    <WorkoutDetails workout={workout}/>
                </Dialog>
            </TableCell>

            <TableCell className="font-bold">
                {workout.name}
            </TableCell>

            <TableCell className="font-medium">
                {formattedDate}
            </TableCell>

            <TableCell>
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                    <span className="font-medium text-muted-foreground">{workout.training}</span>
                </div>
            </TableCell>

            <TableCell className="font-bold">
                {workout.calories} Kcal
            </TableCell>

            <TableCell className="font-medium text-muted-foreground">
                {workout.duration} minutos
            </TableCell>

            <TableCell>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline">
                            <FaTrashAlt className="w-3.7 h-3.7"/>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Você deseja apagar o registro do treino selecionado ?</AlertDialogTitle>
                            <AlertDialogDescription className="pb-5">
                                Essa ação vai fazer com que você perca o registro de treino específico.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>
                                Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteWorkout(workout.id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </TableCell>

        </TableRow>
    );
}
