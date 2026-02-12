import {z} from "zod";

export function SchemaProvedor() {
  const provedorSchema = z.object({
    provedorInternet: z.string()
      .nonempty("Nome do provedor é de preenchimento obrigatório")
      .min(2, "Nome do provedor deve ter ao menos 2 caracteres")
      .refine(
        (value) => /^[a-zA-Z\s]+$/.test(value),
        "Nome da escola deve conter apenas letra"
      ),

    ipLink: z.string()
      .nonempty("IP é de preenchimento obrigatório")
      .regex(/^\d{32}$/, "O IP deve conter 32 caracteres"),

    velocidadeLink: z.string()
      .nonempty("Velocidade é de preenchimento obrigatório"),

    mascaraRede: z.string().trim()
      .nonempty("Máscara é de preenchimento obrigatório"),

    gatewayProvedor: z.string().trim()
      .nonempty("Gateway é de preenchimento obrigatório"),

    dnsPrimario: z.string().trim()
      .nonempty("Dns primário é de preenchimento obrigatório")
      .min(12, "Dns primário deve conter 12 caracteres"),

    dnsSecundario: z.string().trim()
      .nonempty("Dns secundário é de preenchimento obrigatório")
      .min(12, "Dns secundário deve conter 12 caracteres"),

    dnsTerciario: z.string().trim()
      .nonempty("Dns terciário é de preenchimento obrigatório")
      .min(12, "Dns terciário deve conter 12 caracteres"),
  })
  return provedorSchema;
}