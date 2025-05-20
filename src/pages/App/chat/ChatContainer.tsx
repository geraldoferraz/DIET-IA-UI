import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";
import { ChatSidebar } from "./ChatSidebar";
import { normalizeRawMessage, RawMessage } from "./Utils/ChatMessageUtils";
import { getRoomId } from "./Utils/Utils";
import { Message, User } from "./types";

interface ChatContainerProps {
  currentUser: User;
  contacts: User[];
  apiBaseUrl: string;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  currentUser,
  contacts,
  apiBaseUrl,
}) => {
  const [selectedContact, setSelectedContact] = useState<User | null>(
    contacts[0] || null
  );
  const [rawMessages, setRawMessages] = useState<RawMessage[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  // configura socket e join-chat
  useEffect(() => {
    const sock = io(apiBaseUrl, {
      auth: { userId: currentUser.id },
    });
    setSocket(sock);

    if (selectedContact) {
      sock.emit("join-chat", {
        userId: currentUser.id,
        patientId: selectedContact.id,
      });
    }

    sock.on("receive-message", (raw: RawMessage) => {
      setRawMessages((prev) => [...prev, raw]);
    });

    return () => {
      sock.disconnect();
    };
  }, [apiBaseUrl, currentUser.id, selectedContact]);

  // fetch histórico via REST
  useEffect(() => {
    if (!selectedContact) return;
    fetch(`${apiBaseUrl}/messages/${selectedContact.id}`, {
      headers: { Authorization: currentUser.id },
    })
      .then((res) => res.json() as Promise<RawMessage[]>)
      .then(setRawMessages)
      .catch(console.error);
  }, [apiBaseUrl, currentUser.id, selectedContact]);

  // normaliza rawMessages para Message[]
  useEffect(() => {
    if (!selectedContact) return;
    const normalized = rawMessages.map((raw) =>
      normalizeRawMessage(raw, currentUser.id, selectedContact.id)
    );
    setMessages(normalized);
  }, [rawMessages, currentUser.id, selectedContact]);

  // envio de mensagem
  const handleSendMessage = (content: string) => {
    if (!socket || !selectedContact) return;
    const payload = {
      chatId: getRoomId(currentUser.id, selectedContact.id),
      senderId: currentUser.id,
      content,
      createdAt: new Date().toISOString(),
    };
    socket.emit("send-message", {
      userId: currentUser.id,
      patientId: selectedContact.id,
      ...payload,
    });
    setRawMessages((prev) => [...prev, { ...payload, _id: crypto.randomUUID() }]);
  };

  // agrupa mensagens por roomId para sidebar
  const groupedByRoom = messages.reduce((acc, msg) => {
    const room = getRoomId(
      currentUser.id,
      // se remeteu, other is patient
      msg.sender === currentUser.id ? selectedContact!.id : msg.sender
    );
    acc[room] = acc[room] || [];
    acc[room].push(msg);
    return acc;
  }, {} as Record<string, Message[]>);

  return (
    <div className="flex h-full w-full overflow-hidden border rounded-none">
      <ChatSidebar
        contacts={contacts}
        selectedContact={selectedContact}
        onSelectContact={setSelectedContact}
        currentUser={currentUser}
        messages={groupedByRoom}
        getConversationId={getRoomId}
      />

      <div className="flex flex-col flex-1 bg-secondary/20">
        {selectedContact ? (
          <>
            <div className="p-4 border-b bg-white shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                {selectedContact.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h3 className="font-medium">{selectedContact.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {selectedContact.isNutritionist ? "Nutritionist" : "Patient"}
                </p>
              </div>
            </div>

            <ChatMessages messages={messages} currentUser={currentUser} />
            <ChatInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Card className="p-6 max-w-md text-center">
              <p className="text-muted-foreground">
                Select a contact to start chatting
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
