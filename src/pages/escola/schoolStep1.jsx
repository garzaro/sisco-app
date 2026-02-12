import {Button} from "@/components/ui/button.jsx";
import * as React from "react";
import {useFormContext} from "react-hook-form";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";

export const SchoolStep1 = () => {
  const {register, formState:{ errors }} = useFormContext();
  return (
    <section className="w-full flex-shrink-0 p-4 space-y-4">

      {/*nome da escola*/}
      <div className="flex flex-col gap-1">
        <Label htmlFor="label-nome-escola">
          Nome Escola
          <span className="text-red-400 font-bold text-sm">*</span>
        </Label>
        <Input
          type="text"
          {...register("nomeEscola", {required: true})}
          id="label-nome-escola"
          placeholder="Digite o nome da escola"
          className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded w-full h-10 text-zinc-200"
        />
        {errors.nomeEscola &&
          <span className=" text-sm text-red-300 ">{errors.nomeEscola.message}</span>}
      </div>

      {/*codigo da escola*/}
      <div className="flex flex-col gap-1">
        <Label htmlFor="label-codigo-escola">
          Código Escola
          <span className="text-red-400 font-bold text-sm">*</span>
        </Label>
        <Input
          type="number"
          {...register("codigo", {required: true})}
          id="label-codigo-escola"
          placeholder="Digite o codigo da escola - tirar as setinhas do campo"
          className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded w-full h-10 text-zinc-200"
        />
        {errors.codigo &&
          <span className=" text-sm text-red-300 ">{errors.codigo.message}</span>}
      </div>

      {/*email da escola*/}
      <div className="flex flex-col gap-1">
        <Label htmlFor="label-email">
          E-mail
          <span className="text-red-400 font-bold text-sm">*</span>
        </Label>
        <Input
          type="email"
          {...register("email", {required: true})}
          id="label-email"
          placeholder="Digite o e-mail"
          className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded w-full h-10 text-zinc-200"
        />
        {errors.email &&
          <span className=" text-sm text-red-300 ">{errors.email.message}</span>}
      </div>

      {/*telefone*/}
      <div className="flex flex-col gap-1">
        <Label htmlFor="label-uf-municipio">
          Telefone
          <span className="text-red-400 font-bold text-sm">*</span>
        </Label>
        <Input
          type="number"
          {...register("telefone", {required: true})}
          id="label-telefone"
          placeholder="Digite o telefone com DDD"
          className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded w-full h-10 text-zinc-200"
        />
        {errors.telefone &&
          <span className=" text-sm text-red-300 ">{errors.telefone.message}</span>}
      </div>
    </section>
  );
}