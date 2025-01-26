import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";


export function WorkoutsTableFilters(){
    return(
        <form className="flex items-center gap-4 mb-6 mt-10">
            <span className="text-sm font-semibold">Filtros:</span>
            <Input placeholder="ID do treino" className="h-8 w-auto"/>
            <Select defaultValue="all">
                <SelectTrigger className="h-8 w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all" >Tipo do treino</SelectItem>
                    <SelectItem value="pending">Musculação</SelectItem>
                    <SelectItem value="canceled">Cardio</SelectItem>
                </SelectContent>
            </Select>

            <div className="ml-auto flex gap-4">
                <Button type="submit" variant="secondary" size="sm">
                    <Search className="h-4 w-4 mr-2"/>
                    Filtrar resultados
                </Button>

                <Button type="button" variant="outline" size="sm">
                    <X className="h-4 w-4 mr-2"/>
                    Remover Filtros
                </Button>
            </div>
        </form>
    )
}