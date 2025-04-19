type Role = "patient" | "nutritionist";

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
}