import { useAuthStore } from "@/store/useAuthStore";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function AccountMenu() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    const userStore = useAuthStore((state) => state.user);
    const user = userStore;
    const clearUser = useAuthStore((state) => state.clearUser);

    function handleSignOut() {
        clearUser();
        localStorage.removeItem("auth-storage");
        navigate('/sign-in')
    }

    return (
        <div className="pr-3">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 select-none">
                        {user?.name}
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex flex-col">
                        <span className="mb-0">{user?.name}</span>
                        <span className="text-xs font-normal text-muted-foreground">{user?.email}</span>
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
