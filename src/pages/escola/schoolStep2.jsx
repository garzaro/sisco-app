import * as React from "react";
import {Controller, useFormContext} from "react-hook-form";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";
import {required} from "zod/mini";

const estadosBrasileiros = [
  { uf: "AC", nome: "Acre" },
  { uf: "AL", nome: "Alagoas" },
  { uf: "AP", nome: "Amapá" },
  { uf: "AM", nome: "Amazonas" },
  { uf: "BA", nome: "Bahia" },
  { uf: "CE", nome: "Ceará" },
  { uf: "DF", nome: "Distrito Federal" },
  { uf: "ES", nome: "Espírito Santo" },
  { uf: "GO", nome: "Goiás" },
  { uf: "MA", nome: "Maranhão" },
  { uf: "MT", nome: "Mato Grosso" },
  { uf: "MS", nome: "Mato Grosso do Sul" },
  { uf: "MG", nome: "Minas Gerais" },
  { uf: "PA", nome: "Pará" },
  { uf: "PB", nome: "Paraíba" },
  { uf: "PR", nome: "Paraná" },
  { uf: "PE", nome: "Pernambuco" },
  { uf: "PI", nome: "Piauí" },
  { uf: "RJ", nome: "Rio de Janeiro" },
  { uf: "RN", nome: "Rio Grande do Norte" },
  { uf: "RS", nome: "Rio Grande do Sul" },
  { uf: "RO", nome: "Rondônia" },
  { uf: "RR", nome: "Roraima" },
  { uf: "SC", nome: "Santa Catarina" },
  { uf: "SP", nome: "São Paulo" },
  { uf: "SE", nome: "Sergipe" },
  { uf: "TO", nome: "Tocantins" },
];

export function SchoolStep2() {
  const {register, control, formState:{ errors }} = useFormContext();
  return (
    <section className="w-full flex-shrink-0 p-4 space-y-4">
      {/*unidade federal*/}
      <div className="flex flex-col gap-1">
        <Label htmlFor="label-uf-municipio">
          Estado - ( UF )
          <span className="text-red-400 font-bold text-sm">*</span>
        </Label>
        <Controller
          name="unidadeFederal"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
            <Select value={ field.value }
                    // className={errors ? "bg-red-400" : "bg-zinc-700"}
                    onValueChange={ field.onChange }
            >
              <SelectTrigger className={`border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded
              w-96 h-10 text-zinc-200 
              ${error ? "border-red-500 bg-red-500/10" : "border-zinc-600 hover:border-l-red-400"}`}
              >
                <SelectValue placeholder="colocar api IBGE, mudar estado muda cidade" />
              </SelectTrigger>
              <SelectContent>
                {
                  estadosBrasileiros.map((eB) => (
                  <SelectItem key={eB.uf} value={eB.nome}>
                    {eB.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
              {
                errors.unidadeFederal &&
                <span className=" text-sm text-red-300 ">{ errors.unidadeFederal.message }</span>
              }
            </>
          )}
        />
      </div>

      {/*municipio da escola*/}
      <div className="flex flex-col gap-1">
        <Label htmlFor="label-municipio-escola">
          Município
          <span className="text-red-400 font-bold text-sm">*</span>
        </Label>
        <Input
          type="text"
          {...register("municipio", {required: true})}
          id="label-municipio-escola"
          placeholder="COLOCAR API, MUDA ESTADO MUDA DE CIDADE"
          className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded w-96 h-10 text-zinc-200"
        />
        {errors.municipio &&
          <span className=" text-sm text-red-300 ">{errors.municipio.message}</span>}
      </div>

      {/** bairro **/}
      <div className="flex flex-col gap-1">
        <Label htmlFor="label-uf-municipio">
          Bairro
          <span className="text-red-400 font-bold text-sm">*</span>
        </Label>
        <Input
          type="text"
          {...register("bairro", {required: true})}
          id="label-bairro"
          placeholder="Digite o bairro"
          className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded
                    w-96 h-10 text-zinc-200"
        />
        {errors.bairro &&
          <span className=" text-sm text-red-300 ">{errors.bairro.message}</span>}
      </div>

      {/** logradouro **/}
      <div className="flex flex-col gap-1">
        <Label htmlFor="label-logradouro">
          Logradouro ( rua, avedida, praça )
          <span className="text-red-400 font-bold text-sm">*</span>
        </Label>
        <Input
          type="text"
          {...register("logradouro", {required: true})}
          id="label-logradouro"
          placeholder="Digite o endereço"
          className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded
                    w-96 h-10 text-zinc-200"
        />
        {errors.logradouro &&
          <span className=" text-sm text-red-300 ">{errors.logradouro.message}</span>}
      </div>

    </section>
  );
}

/**
 * Outro detalhe importante (multi-step)
 *
 * Como se usa steps animados, os campos do Step 1 não estão desmontando, o que é bom 👍
 * Mas se algum dia desmontar, use:
 *
 * useForm({
 *   shouldUnregister: false,
 * });
 *
 * **/