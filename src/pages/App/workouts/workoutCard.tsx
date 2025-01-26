import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
// import { FaCirclePlus } from "react-icons/fa6";
import { CreateWorkoutDialog } from "./createWorkout";

export function WorkoutCardTitle() {
    return (
        <>
            <Card className="mb-3">
                <CardHeader>
                    <CardTitle className="flex justify-between">
                        Histórico de treinos
                        <Dialog>
                            <CreateWorkoutDialog />
                        </Dialog>
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-md text-muted-foreground" style={{ marginTop: '-25px' }}>
                    <p>Nesta seção você pode ver o histórico de treinos realizados durante o ultimo mês.</p>
                </CardContent>
            </Card>
        </>
    );
}
