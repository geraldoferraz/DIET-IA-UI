import { Home } from "lucide-react";
import { IoStatsChart } from "react-icons/io5";
import { RiMentalHealthLine } from "react-icons/ri";
import { AccountMenu } from "./Account-menu";
import { NavLink } from "./Nav-link";
import { ThemeToggle } from "./theme/theme-toggle";
import { Separator } from "./ui/separator";

export function Header() {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center gap-6 p-6 justify-between">
                <div className="flex justify-center items-center gap-2 pl-3">
                    <RiMentalHealthLine className="h-5 w-5" />
                    <h2 className="text-lg font-bold">Diet.IA</h2>
                </div>

                <Separator orientation="vertical" className="h-6 w-0.5 font-bold" />

                <nav className="flex items-center space-x-4 lg:space-x-6">
                    <NavLink to="/home" >
                        <Home className="h-4 w-4" />
                        Home
                    </NavLink>

                    <NavLink to="/dashboard">
                        <IoStatsChart className="h-4 w-4" />
                        Dashboard
                    </NavLink>
                </nav>

                <div className="ml-auto flex items-center gap-2">
                    <ThemeToggle />
                    <AccountMenu />
                </div>
            </div>
        </div>
    );
}