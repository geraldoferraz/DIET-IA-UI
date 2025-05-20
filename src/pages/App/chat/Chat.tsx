import { ChatContainer } from "@/pages/App/chat";
import { User } from "@/pages/App/chat/types";

const mockCurrentUser: User = {
    id: "nutritionist-1",
    name: "Dr. Emma Johnson",
    email: "emma.johnson@nutrition.com",
    isNutritionist: true,
    status: "online"
};

const mockPatients: User[] = [
{
    id: "patient-1",
    name: "Alex Thompson",
    email: "alex@example.com",
    isNutritionist: false,
    status: "online"
},
{
    id: "patient-2",
    name: "Jamie Williams",
    email: "jamie@example.com",
    isNutritionist: false,
    status: "offline",
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
},
{
    id: "patient-3",
    name: "Sam Rodriguez",
    email: "sam@example.com",
    isNutritionist: false,
    status: "away",
    lastSeen: new Date(Date.now() - 15 * 60 * 1000) // 15 minutes ago
},
{
    id: "patient-4",
    name: "Taylor Smith",
    email: "taylor@example.com",
    isNutritionist: false,
    status: "offline",
    lastSeen: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
},
{
    id: "patient-5",
    name: "Jordan Lee",
    email: "jordan@example.com",
    isNutritionist: false,
    status: "online"
}
];

export const ChatPage = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        }}>
            <ChatContainer
                apiBaseUrl="http://localhost:3000"
                currentUser={mockCurrentUser}
                contacts={mockPatients}
            />
        </div>
    );
};
