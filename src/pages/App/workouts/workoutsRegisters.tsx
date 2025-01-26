import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { WorkoutTableRow } from "./workoutTableRow";

interface Workout {
    id: string;
    training: string;
    name: string;
    duration: number;
    description: string;
    calories: number;
    created_at: string;
}

export function WorkoutsRegisters(){
    const mockWorkouts: Workout[] = [
        {
            id: '1',
            name: 'Corrida na avenida boa viagem - desafiador',
            training: 'cardio',
            duration: 30,
            calories: 200,
            description: 'Corrida leve no parque',
            created_at: new Date().toISOString()
        },
        {
            id: '2',
            name: 'Musculação',
            training: 'musculacao',
            duration: 45,
            calories: 300,
            description: 'Treino de força',
            created_at: new Date().toISOString()
        }
    ];

    return(
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]"></TableHead>
                        <TableHead>Exercício</TableHead>
                        <TableHead className="w-[280px]">Data</TableHead>
                        <TableHead className="w-[220px]">Tipo</TableHead>
                        <TableHead className="w-[250px]">Calorias</TableHead>
                        <TableHead className="w-[250px]">Duração</TableHead>
                        <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockWorkouts.map((workout) => (
                        <WorkoutTableRow key={workout.id} workout={workout} />
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}