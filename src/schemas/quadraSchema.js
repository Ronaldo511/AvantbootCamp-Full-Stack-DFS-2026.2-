import { z } from "zod";

export const quadraSchema = z.object({nome: z 
    .string()
    .trim()
    .min(3, "O nome da quadra deve possuir pelo menos 3 caracteres."),
 modalidade: z
    .string()
    .trim()
    .min(3, "A modalidade deve possuir pelo menos 3 caracteres."),
    
    localizacao: z
    .string()
    .trim()
    .min(3, "A localização deve possuir pelo menos 3 caracteres.")
     
})
