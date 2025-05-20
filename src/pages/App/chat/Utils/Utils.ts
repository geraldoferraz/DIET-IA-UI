export function getRoomId(userId: string, patientId: string) {
    return `chat:${userId}:${patientId}`;
}