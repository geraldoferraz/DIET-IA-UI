import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
    phone: z.string().length(11, "Telefone deve ter 11 dígitos"),
    age: z.string().length(2, "Idade deve ter 2 dígitos"),
    otp: z.string().length(6, "Código deve ter 6 dígitos"),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
