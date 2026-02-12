import {z} from "zod";

export function SchemaEscola() {
  const escolaSchema = z.object({
    nomeEscola: z.string()
      .nonempty("Nome da escola é de preenchimento obrigatório")
      .min(2, "Nome da escola ter ao menos 3 caracteres")
      .refine(
        (value) => /^[a-zA-Z\s]+$/.test(value), // vou deixar {} aqui se der erro eu excluo
        "Nome da escola deve conter apenas letra"
      ),

    codigo: z.string()
      .nonempty("Código é de preenchimento obrigatório")
      .regex(/^\d{10}$/, "O código deve ter conter 10 caracteres"),

    email: z.string()
      .nonempty("E-mail é de preenchimento obrigatório")
      .email("e-mail inválido")
      .transform(v => v.replace(/^\s+/, "")),

    telefone: z.string().trim()
      .nonempty("Telefone é de preenchimento obrigatório"),

    unidadeFederal: z.string().trim()
      .nonempty("Unidade Federal é de preenchimento obrigatório"),

    municipio: z.string().trim()
      .nonempty("Município é de preenchimento obrigatório")
      .min(3, "Município deve ter no mínimo 3 caracteres"),

    bairro: z.string().trim()
      .nonempty("Bairro é de preenchimento obrigatório")
      .min(3, "Bairro deve ter no mínimo 3 caracteres"),

    logradouro: z.string().trim()
      .nonempty("Endereço é de preenchimento obrigatório")
      .min(10, "Endereço deve ter no mínimo 10 caracteres"),

  })
  return escolaSchema;
}