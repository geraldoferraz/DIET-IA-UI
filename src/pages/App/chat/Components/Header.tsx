import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
    title: string;
    searchTerm: string;
    onSearch: (term: string) => void;
    onAddContact: () => void;
}

export const Header = ({ title, searchTerm, onSearch, onAddContact }: HeaderProps) => {
    return (
    <div className="p-5 border-b mb-2">
        <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="icon" asChild>
            <Link to="/home">
                <ArrowLeft className="h-5 w-5" />
            </Link>
            </Button>
            <h2 className="font-semibold">{title}</h2>
        </div>
        <div className="flex flex-col gap-4">
            <div className="relative">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search contacts..."
                className="pl-9 bg-secondary/50 border-0"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
            />
            </div>
            <Button
            variant="default"
            className="flex items-center gap-2"
            onClick={onAddContact}
            >
            <Plus className="h-4 w-4" />
            <span>Add contact</span>
            </Button>
        </div>
    </div>
    );
};