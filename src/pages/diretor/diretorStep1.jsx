import {Button} from "@/components/ui/button.jsx";
import * as React from "react";
import {useFormContext} from "react-hook-form";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";

export const DiretorStep1 = () => {
  const {register, setError, formState:{ errors }} = useFormContext();
  return (
    <section className="w-full flex-shrink-0 p-4 space-y-4">
      {/*nome do diretor*/}
      <div className="flex flex-col gap-1">
        <Label htmlFor="label-nome-diretor">
          Nome Completo
          <span className="text-red-400 font-bold text-sm">*</span>
        </Label>
        <Input
          type="text"
          {...register("nomeDiretor", {required: true})}
          id="label-nome-diretor"
          placeholder="Digite o nome do diretor"
          className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded w-full h-10 text-zinc-200"
        />
        {errors.nomeDiretor &&
          <span className=" text-sm text-red-300 ">{errors.nomeDiretor.message}</span>}
      </div>
      {/*cpf do diretor*/}
      <div className="flex flex-col gap-1">
        <Label htmlFor="label-cpf">
          CPF
          <span className="text-red-400 font-bold text-sm">*</span>
        </Label>
        <Input
          type="text"
          {...register("cpf", {required: true})}
          id="label-cpf"
          placeholder="Digite o CPF"
          className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded
                     w-96 h-10 text-zinc-200"
        />
        {errors.cpf &&
          <span className=" text-sm text-red-300 ">{errors.cpf.message}</span>}
      </div>
      {/*matricula do diretor*/}
      <div className="flex flex-col gap-1">
        <Label htmlFor="label-matricula">
          Matrícula
          <span className="text-red-400 font-bold text-sm">*</span>
        </Label>
        <Input
          type="number"
          {...register("matricula", {required: true})}
          id="label-matricula"
          placeholder="Digite a matricula"
          className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded w-full h-10 text-zinc-200"
        />
        {errors.matricula &&
          <span className=" text-sm text-red-300 ">{errors.matricula.message}</span>}
      </div>

      {/*email do diretor*/}
      <div className="flex flex-col gap-1">
        <Label htmlFor="label-email-diretor">
          Email
          <span className="text-red-400 font-bold text-sm">*</span>
        </Label>
        <Input
          type="email"
          {...register("emailDiretor", {required: true})}
          id="label-email-diretor"
          placeholder="Digite o email do diretor"
          className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded w-full h-10 text-zinc-200"
        />
        {errors.emailDiretor &&
          <span className=" text-sm text-red-300 ">{errors.emailDiretor.message}</span>}
      </div>
    </section>
  );
}