import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Message, User } from "../types";

interface ChatContactItemProps {
    contact: User;
    currentUser: User;
    messages: Message[];
    selected: boolean;
    onClick: () => void;
}

export const ChatContactItem = ({
    contact,
    currentUser,
    messages,
    selected,
    onClick,
}: ChatContactItemProps) => {
    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
    const unreadCount = messages.filter(
        (m) => m.receiver === currentUser.id && !m.read
    ).length;

    return (
        <div
        role="button"
        tabIndex={0}
        aria-selected={selected}
        className={cn(
            "flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors mb-1",
            selected && "bg-secondary"
        )}
        onClick={onClick}
        >
        <div className="relative">
            {contact.avatar ? (
            <img
                src={contact.avatar}
                alt={contact.name}
                className="w-12 h-12 rounded-full"
            />
            ) : (
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-medium">
                {contact.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </span>
            </div>
            )}
            {contact.status === "online" && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            )}
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline">
            <h3 className="font-medium text-sm truncate">{contact.name}</h3>
            {lastMessage && (
                <span className="text-xs text-muted-foreground">
                {format(new Date(lastMessage.timestamp), "HH:mm")}
                </span>
            )}
            </div>
            <p className="text-xs text-muted-foreground truncate">
            {lastMessage
                ? lastMessage.sender === currentUser.id
                ? `You: ${lastMessage.content}`
                : lastMessage.content
                : "Start a conversation"}
            </p>
        </div>
        {unreadCount > 0 && (
            <div className="min-w-5 h-5 rounded-full bg-primary flex items-center justify-center text-xs text-white font-medium">
            {unreadCount}
            </div>
        )}
        </div>
    );
};