import { Building, ChevronDown, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AccountMenu() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    const mockUser = {
        name: 'John Doe',
        email: 'john@example.com'
    }

    function handleSignOut() {
        navigate('/login')
    }

    return (
        <div className="pr-3">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 select-none">
                        {mockUser.name}
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex flex-col">
                        <span className="mb-0">{mockUser.name}</span>
                        <span className="text-xs font-normal text-muted-foreground">{mockUser.email}</span>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <Building className="w-4 h-4 mr-2" />
                        <span>Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400">
                        <button className="w-full" onClick={handleSignOut}>
                            <LogOut className="w-4 h-4 mr-2" />
                            <span>Sair</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
