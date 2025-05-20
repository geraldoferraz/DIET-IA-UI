
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send, Smile } from "lucide-react";
import { useState } from "react";

  interface ChatInputProps {
    onSendMessage: (content: string) => void;
  }

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!message.trim()) return;

      onSendMessage(message);
      setMessage("");
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t bg-white"
      >
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Paperclip className="h-5 w-5" />
            <span className="sr-only">Attach files</span>
          </Button>

          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="min-h-[46px] resize-none flex-1 bg-secondary/30 border-0 focus-visible:ring-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (message.trim()) {
                  handleSubmit(e);
                }
              }
            }}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Smile className="h-5 w-5" />
            <span className="sr-only">Add emoji</span>
          </Button>

          <Button
            type="submit"
            size="icon"
            className="rounded-full"
            disabled={!message.trim()}
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    );
  };
