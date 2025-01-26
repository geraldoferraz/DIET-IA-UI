import {
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { CreateWorkoutDialog } from "./createWorkout";

export function WorkoutCardTitle() {
    return (
        <>
            <CardHeader className="p-1 mb-3">
                <CardTitle className="flex justify-between">
                    Histórico de treinos
                    <Dialog>
                        <CreateWorkoutDialog />
                    </Dialog>
                </CardTitle>
            </CardHeader>
            <CardContent className="text-md text-muted-foreground mb-5 p-1" style={{ marginTop: '-25px' }}>
                <p>Nesta seção você pode ver o histórico de treinos realizados durante o ultimo mês.</p>
            </CardContent>
        </>
    );
}
