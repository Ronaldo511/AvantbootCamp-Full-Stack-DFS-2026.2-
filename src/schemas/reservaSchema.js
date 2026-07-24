import { z } from "zod";

export const reservaSchema = z
  .object({
    dataHoraInicio: z.coerce.date({
      error: "A data e hora de início são obrigatórias."
    }),

    dataHoraFim: z.coerce.date({
      error: "A data e hora de término são obrigatórias."
    }),

    jogadorId: z.coerce
      .number()
      .int("O ID do jogador deve ser um número inteiro.")
      .positive("O ID do jogador deve ser maior que zero."),

    quadraId: z.coerce
      .number()
      .int("O ID da quadra deve ser um número inteiro.")
      .positive("O ID da quadra deve ser maior que zero.")
  })
  .refine(
    (dados) => dados.dataHoraFim > dados.dataHoraInicio,
    {
      message: "A data e hora final devem ser posteriores ao início.",
      path: ["dataHoraFim"]
    }
  );

        


    