import { z } from "zod";

export function SchemaValidacao() {
  const usuarioSchema = z.object({
    nome: z.string()
      .nonempty("Nome completo é de preenchimento obrigatório")
      .min(2, "Nome deve ter ao menos 3 caracteres")
      .refine(
        (value) => /^[a-zA-Z\s]+$/.test(value), // vou deixar {} aqui se der erro eu excluo
        "Nome completo deve conter apenas letra"
      ),

    cpf: z.string()
      .nonempty("CPF é de preenchimento obrigatório")
      .regex(/^\d{11}$/, "O CPF deve ter conter 11 caracteres"),

    usuario: z.string()
      .nonempty("Nome de usuário é de preenchimento obrigatório")
      .min(3, "Nome de usuario deve ter ao menos 3 caracteres")
      .refine(
        (value) => /^[a-zA-Z@.]+$/.test(value),
        "Usuário deve seguir o padrao (ex: user.nickname, user) "
      ),

    email: z.string()
      .nonempty("e-mail é de preenchimento obrigatório")
      .email("e-mail inválido"),

    email_confirm: z.string().email("Confirme o e-mail"),
  });
  return usuarioSchema;
}

/** PARA CPF E CALCULO DE DIGITO
 * import { z } from "zod";
 *
 * const cpfSchema = z
 *   .string()
 *   .transform((val) => val.replace(/[^\d]/g, "")) // remove pontos e traços
 *   .refine((val) => /^\d{11}$/.test(val), {
 *     message: "CPF deve conter 11 números",
 *   })
 *   .refine((val) => {
 *     if (/^(\d)\1+$/.test(val)) return false; // todos os dígitos iguais
 *     let sum = 0;
 *     for (let i = 0; i < 9; i++) sum += Number(val[i]) * (10 - i);
 *     let firstCheck = (sum * 10) % 11;
 *     if (firstCheck === 10) firstCheck = 0;
 *     if (firstCheck !== Number(val[9])) return false;
 *
 *     sum = 0;
 *     for (let i = 0; i < 10; i++) sum += Number(val[i]) * (11 - i);
 *     let secondCheck = (sum * 10) % 11;
 *     if (secondCheck === 10) secondCheck = 0;
 *     return secondCheck === Number(val[10]);
 *   }, { message: "CPF inválido" });
 *
 *
 *   ------------------------------------------------------------------------
 *
 *   import { z } from "zod";
 *
 * export function Validacao() {
 *   return z.object({
 *     nome: z.string()
 *       .nonempty("Nome é obrigatório")
 *       .min(2, "Nome deve ter ao menos 2 caracteres"),
 *     cpf: z.string()
 *       .regex(/^\d{11}$/, "CPF deve conter 11 números"),
 *     email: z.string()
 *       .email("Email inválido"),
 *     nomeUsuario: z.string()
 *       .regex(/^[a-zA-Z@]+$/, "O nome de usuário só pode conter letras e @")
 *       .min(3, "O nome de usuário deve ter ao menos 3 caracteres"),
 *   });
 * }
 *
 *
 *
 * **/