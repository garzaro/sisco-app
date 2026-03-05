import {z} from "zod";

export function SchemaContact() {
  const contactSchema = z.object({
    nomeCompleto: z.string()
      .nonempty("Nome completo é de preenchimento obrigatório")
      .min(2, "Nome deve ter ao menos 3 caracteres")
      .refine(
        (value) => /^[a-zA-Z\s]+$/.test(value), // vou deixar {} aqui se der erro eu excluo
        "Nome completo deve conter apenas letra"
      ),

    email: z.string()
      .nonempty("e-mail é de preenchimento obrigatório")
      .email("e-mail inválido")
      .transform(v => v.replace(/^\s+/, "")),

    mensagem: z.string().trim()
      .nonempty("Senha é de preenchimento obrigatório")
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
    });
  return contactSchema;
}