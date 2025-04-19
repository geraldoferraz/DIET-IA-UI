import { getPatientById } from "@/api/patients";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Patient } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import { ClipboardList, History, User2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { AnamnesePage } from "../anamnese/anamnese";
import { PatientDetails } from "../patients/patientDetails";
import { PatientHeader } from "./PatientHeader";

export default function PatientProfile() {
    const { id } = useParams();

    const { data: patient, isLoading } = useQuery<Patient>({
        queryKey: ['patient', id],
        queryFn: () => getPatientById(id as string),
    });

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6">
                <Card className="w-full mb-6">
                    <div className="px-6 py-6">
                        <PatientHeader
                            patient={patient as Patient}
                            isLoading={isLoading}
                        />

                        <Tabs defaultValue="profile" className="mt-6">
                            <TabsList className="bg-transparent p-0 h-12 w-full flex justify-start border-b">
                                <TabsTrigger
                                    value="profile"
                                    className="h-12 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-primary px-6"
                                >
                                    <User2 className="h-4 w-4 mr-2" />
                                    Profile
                                </TabsTrigger>
                                <TabsTrigger
                                    value="anamnese"
                                    className="h-12 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-primary px-6"
                                >
                                    <History className="h-4 w-4 mr-2" />
                                    Anamnese
                                </TabsTrigger>
                                <TabsTrigger
                                    value="mealPlans"
                                    className="h-12 rounded-none data-[state=active]:shadow-none data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-primary px-6"
                                >
                                    <ClipboardList className="h-4 w-4 mr-2" />
                                    Meal Plans
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="profile" className="pt-6">
                                <PatientDetails />
                            </TabsContent>

                            <TabsContent value="anamnese" className="pt-6">
                                <AnamnesePage patientId={id as string} page={1} itemsPerPage={6} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </Card>
            </div>
        </div>
    );
}

