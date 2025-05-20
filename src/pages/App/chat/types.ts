
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isNutritionist: boolean;
  status?: "online" | "offline" | "away";
  lastSeen?: Date;
}

export interface Message {
  id: string;
  content: string;
  sender: string;
  receiver: string;
  timestamp: Date;
  read?: boolean;
  attachments?: {
    type: "image" | "document" | "link";
    url: string;
    name?: string;
  }[];
}

export interface ChatContainerProps {
  currentUser: User;
  contacts: User[];
}

export interface ChatMessagesProps {
  messages: Message[];
  currentUser: User;
}

export interface ChatSidebarProps {
  contacts: User[];
  selectedContact: User | null;
  currentUser: User;
  messages: Record<string, Message[]>;
  onSelectContact: (contact: User) => void;
  onSearch?: (term: string) => void;
  onAddContact?: () => void;
  getConversationId: (userId: string, contactId: string) => string;
}