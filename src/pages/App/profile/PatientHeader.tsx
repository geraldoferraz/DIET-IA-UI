import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Patient } from '@/lib/data';
import { Plus } from "lucide-react";

interface PatientHeaderProps {
  patient: Patient;
  isLoading: boolean;
}

export function PatientHeader({ patient, isLoading }: PatientHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      {isLoading ? (
        <>
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-32" />
        </>
      ) : (
        <>
          <Avatar className="h-16 w-16 border-0">
            <AvatarFallback>
              {patient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-xl font-semibold">{patient.name}</h1>
            <p className="text-muted-foreground">{patient.email}</p>
          </div>

          <Button onClick={() => {}}>
            <Plus className="h-4 w-4" />
            Criar Plano
          </Button>
        </>
      )}
    </div>
    );
}