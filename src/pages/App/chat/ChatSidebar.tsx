import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useMemo, useState } from "react";
import { ChatContactItem } from "./Components/ChatContactItem";
import { Header } from "./Components/Header";
import { ChatSidebarProps } from "./types";

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  contacts,
  selectedContact,
  currentUser,
  messages,
  onSelectContact,
  onSearch,
  onAddContact,
  getConversationId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(
    () =>
      contacts.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [contacts, searchTerm]
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onSearch?.(term);
  };

  return (
    <div className="w-80 border-r bg-white flex flex-col">
      <Header
        title="Messages"
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onAddContact={onAddContact ?? (() => {})}
      />
      <ScrollArea className="flex-1">
        <div className="px-2">
          {filtered.map((contact) => {
            const roomId = getConversationId(currentUser.id, contact.id);
            const convMessages = messages[roomId] || [];
            return (
              <ChatContactItem
                key={contact.id}
                contact={contact}
                currentUser={currentUser}
                messages={convMessages}
                selected={selectedContact?.id === contact.id}
                onClick={() => onSelectContact(contact)}
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
