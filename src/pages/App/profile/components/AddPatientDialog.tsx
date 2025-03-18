
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Patient, patientService } from "@/lib/data";

interface AddPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (patient: Patient) => void;
  patientToEdit?: Patient;
}

const AddPatientDialog = ({ open, onOpenChange, onSave, patientToEdit }: AddPatientDialogProps) => {
  const isEditing = !!patientToEdit;
  
  const [patient, setPatient] = useState<Omit<Patient, "id" | "createdAt" | "updatedAt">>({
    name: patientToEdit?.name || "",
    age: patientToEdit?.age || 0,
    weight: patientToEdit?.weight || 0,
    height: patientToEdit?.height || 0,
    goal: patientToEdit?.goal || "",
    notes: patientToEdit?.notes || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric inputs
    if (name === "age" || name === "weight" || name === "height") {
      setPatient((prev) => ({
        ...prev,
        [name]: value === "" ? 0 : Number(value),
      }));
    } else {
      setPatient((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    if (isEditing && patientToEdit) {
      const updatedPatient = patientService.update(patientToEdit.id, patient);
      if (updatedPatient) {
        onSave(updatedPatient);
      }
    } else {
      const newPatient = patientService.create(patient);
      onSave(newPatient);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Patient" : "Add New Patient"}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="form-input-wrapper">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={patient.name}
              onChange={handleChange}
              placeholder="Enter patient's full name"
              className="rounded-lg"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="form-input-wrapper">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={patient.age || ""}
                onChange={handleChange}
                placeholder="Years"
                className="rounded-lg"
              />
            </div>
            
            <div className="form-input-wrapper">
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                value={patient.weight || ""}
                onChange={handleChange}
                placeholder="kg"
                className="rounded-lg"
              />
            </div>
            
            <div className="form-input-wrapper">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                name="height"
                type="number"
                value={patient.height || ""}
                onChange={handleChange}
                placeholder="cm"
                className="rounded-lg"
              />
            </div>
          </div>
          
          <div className="form-input-wrapper">
            <Label htmlFor="goal">Nutrition Goal</Label>
            <Input
              id="goal"
              name="goal"
              value={patient.goal || ""}
              onChange={handleChange}
              placeholder="E.g., Weight loss, Muscle gain, Diabetes management"
              className="rounded-lg"
            />
          </div>
          
          <div className="form-input-wrapper">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={patient.notes || ""}
              onChange={handleChange}
              placeholder="Any allergies, preferences, or additional information"
              className="rounded-lg min-h-[100px]"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {isEditing ? "Update Patient" : "Add Patient"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;
