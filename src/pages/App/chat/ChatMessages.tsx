
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect, useRef } from "react";
import { ChatMessagesProps } from "./types";
import { formatDateHeading, groupMessagesByDate } from "./Utils/ChatMessageUtils";

export const ChatMessages = ({ messages, currentUser }: ChatMessagesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const messageGroups = groupMessagesByDate(messages);

  return (
    <ScrollArea
      ref={scrollRef}
      className="flex-1 p-4"
      style={{ height: 'calc(100vh - 138px)' }}
    >
      <div className="space-y-6">
        {messageGroups.map((group) => (
          <div key={group.date} className="space-y-4">
            <div className="flex justify-center">
              <div className="text-xs bg-secondary/70 text-muted-foreground px-3 py-1 rounded-full">
                {formatDateHeading(group.date)}
              </div>
            </div>

            {group.messages.map((message) => {
              const isCurrentUser = message.sender === currentUser.id;

              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    isCurrentUser ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[75%] rounded-2xl px-4 py-2 text-sm",
                      isCurrentUser
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-secondary rounded-bl-none"
                    )}
                  >
                    <div className="mb-1">{message.content}</div>
                    <div
                      className={cn(
                        "text-xs mt-1 text-right",
                        isCurrentUser ? "text-primary-foreground/80" : "text-muted-foreground"
                      )}
                    >
                      {format(new Date(message.timestamp), "HH:mm")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground text-sm">
              No messages yet. Start a conversation!
            </p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
