import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PiPlusCircleBold } from "react-icons/pi";
import { FaCirclePlus } from "react-icons/fa6";

export function CreateWorkoutDialog() {
    const [isOpen, setIsOpen] = useState(false);

    function handleCreateWorkout(event: React.FormEvent) {
        event.preventDefault();
        // Aqui você implementará a lógica de criação
        setIsOpen(false);
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)} className="flex items-center gap-2 text-sm font-bold">
                Adicionar treino
                <FaCirclePlus className="w-6 h-6"/>
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription className="text-lg text-white ml-4 mb-4">
                            Novo registro de treino
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleCreateWorkout}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="text-muted-foreground">
                                        Exercício
                                    </TableCell>
                                    <TableCell className="flex justify-end">
                                        <input 
                                            type="text" 
                                            className="w-[240px] p-3 bg-transparent border rounded-md" 
                                            placeholder="Nome do exercício" 
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="text-muted-foreground">
                                        Tipo
                                    </TableCell>
                                    <TableCell className="flex justify-end">
                                        <Select>
                                            <SelectTrigger className="w-[240px]">
                                                <SelectValue placeholder="Selecione o tipo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="cardio">Cardio</SelectItem>
                                                <SelectItem value="strength">Musculação</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="text-muted-foreground">
                                        Duração (min)
                                    </TableCell>
                                    <TableCell className="flex justify-end">
                                        <input 
                                            type="number" 
                                            className="w-[240px] p-3 bg-transparent border rounded-md" 
                                            placeholder="Duração em minutos" 
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <Button 
                                            type="submit" 
                                            className="w-full mt-4"
                                        >
                                            Adicionar treino <PiPlusCircleBold className="ml-2"/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
