import { PatientsRegisters } from "./patientsRegisters";
import { Dialog } from "@/components/ui/dialog";
import { CreatePatientDialog } from "./createPatient";

export function Patients(){
    return(
        <div>
            <div className="flex justify-between items-center">
                <div className="flex flex-col justify-between ml-1 gap-1">
                    <h1 className="text-2xl font-normal">Histórico de pacientes</h1>
                    <div className="text-md text-muted-foreground mb-5">
                        <p>Nesta seção você pode acompanhar seu histórico de pacientes.</p>
                    </div>
                </div>
                <Dialog>
                    <CreatePatientDialog />
                </Dialog>
            </div>
            <PatientsRegisters />
        </div>
    )
}