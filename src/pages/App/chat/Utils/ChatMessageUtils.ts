import { format } from "date-fns";
import { Message } from "../types";

export interface RawMessage {
    _id: { toString(): string };
    senderId: string;
    content: string;
    createdAt: string;
}

export function groupMessagesByDate(messages: Message[]) {
    const groups: { date: string; messages: Message[] }[] = [];

    messages.forEach((message) => {
        const messageDate = new Date(message.timestamp).toISOString().split('T')[0];
        const existingGroup = groups.find((group) => group.date === messageDate);

        if (existingGroup) {
            existingGroup.messages.push(message);
        } else {
            groups.push({ date: messageDate, messages: [message] });
        }
    });

    return groups;
}

export const formatDateHeading = (dateString: string) => {
    const today = format(new Date(), "yyyy-MM-dd");
    const yesterday = format(new Date(Date.now() - 86400000), "yyyy-MM-dd");

    if (dateString === today) return "Today";
    if (dateString === yesterday) return "Yesterday";
    return format(new Date(dateString), "MMMM d, yyyy");
};

export function normalizeRawMessage(
    raw: RawMessage,
    currentUserId: string,
    otherUserId: string
): Message {
    const sender = raw.senderId;
    const receiver = sender === currentUserId ? otherUserId : currentUserId;

    return {
        id: raw._id.toString(),
        content: raw.content,
        sender,
        receiver,
        timestamp: new Date(raw.createdAt),
    };
}
