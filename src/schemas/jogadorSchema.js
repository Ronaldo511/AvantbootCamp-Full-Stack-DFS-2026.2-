import { z } from "zod"; 

export const jogadorSchema = z.object({
    nome: z.string().min(3, "O nome deve possuir pelo menos 3 caracteres."),


    email: z.email("E-mail invalido."),

    telefone: z.string().min(10, "Telefone invalido.")
});