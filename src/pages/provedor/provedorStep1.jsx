import {Button} from "@/components/ui/button.jsx";
import * as React from "react";
import {useFormContext} from "react-hook-form";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";

/**
         : '',
 *       : '',
 *       dnsPrimario: '',
 *       dnsSecundario: '',
 *       dnsTerciario:
 *
 * **/

export const ProvedorStep1 = () => {
  const {register, setError, formState:{ errors }} = useFormContext();
  return (
    <section className="w-full flex-shrink-0 p-4 space-y-4">

      {/**nome do provedor**/}
      <div className="flex flex-col gap-1">
        <Label htmlFor="label-provedor-internet">
          Provedor
          <span className="text-red-400 font-bold text-sm">*</span>
        </Label>
        <Input
          type="text"
          {...register("provedorInternet", {required: true})}
          id="label-provedor-internet"
          placeholder="Digite o nome do provedor"
          className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded w-full h-10 text-zinc-200"
        />
        {errors.provedorInternet &&
          <span className=" text-sm text-red-300 ">{errors.provedorInternet.message}</span>}
      </div>

      {/**velocidade do link**/}
      <div className="flex flex-col gap-1">
        <Label htmlFor="label-velocidade-link">
          Velocidade Link
          <span className="text-red-400 font-bold text-sm">*</span>
        </Label>
        <Input
          type="text"
          {...register("velocidadeLink", {required: true})}
          id="label-velocidade-link"
          placeholder="Digite a a velocidade do link"
          className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded w-full h-10 text-zinc-200"
        />
        {errors.velocidadeLink &&
          <span className=" text-sm text-red-300 ">{errors.velocidadeLink.message}</span>}
      </div>


    </section>
  );
}