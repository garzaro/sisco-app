import {z} from "zod";

export function SchemaDiretor() {
  const usuarioSchema = z.object({

    nomeDiretor: z.string()
      .nonempty("Nome completo é de preenchimento obrigatório")
      .min(3, "Nome deve ter ao menos 3 caracteres")
      .refine(
        (value) => /^[a-zA-Z\s]+$/.test(value),
        "Nome completo deve conter apenas letra"
      ),

    cpf: z.string()
      .nonempty("CPF é de preenchimento obrigatório")
      .regex(/^\d{11}$/, "O CPF deve ter conter 11 caracteres"),

    matricula: z.string()
      .nonempty("Matricula é de preenchimento obrigatório")
      .min(6, "Matrícula deve ter ao menos 6 caracteres"),
      // .refine(
      //   (value) => /^[a-zA-Z@.]+$/.test(value),
      //   "Matrícula deve seguir o padrao (ex: 123456) "
      // ),

    emailDiretor: z.string()
      .nonempty("E-mail é de preenchimento obrigatório")
      .email("E-mail inválido")
      .transform(v => v.replace(/^\s+/, "")
      ),
  });
  return usuarioSchema;
}
