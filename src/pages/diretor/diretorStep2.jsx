import {Button} from "@/components/ui/button.jsx";
import * as React from "react";
import {useFormContext} from "react-hook-form";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";

  // dataSaidaDiretor: '',
export const DiretorStep2 = () => {
  const {register, formState:{ errors }} = useFormContext();
  return (
    <section className="w-full flex-shrink-0 p-4 space-y-4">

      {/*data entrada diretor*/}
      <div className="flex flex-col gap-1">
        <Label htmlFor="label-data-entrada">
          Data Entrada
          <span className="text-red-400 font-bold text-sm">*</span>
        </Label>
        <Input
          type="date"
          {...register("dataEntradaDiretor", {required: true})}
          id="label-data-entrada"
          placeholder="Digite a data de entrada"
          className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded w-full h-10 text-zinc-200"
        />
        {errors.dataEntradaDiretor &&
          <span className=" text-sm text-red-300 ">{errors.dataEntradaDiretor.message}</span>}
      </div>

      {/*/!*data saida do diretor*!/*/}
      {/*<div className="flex flex-col gap-1">*/}
      {/*  <Label htmlFor="label-saida-diretor">*/}
      {/*    Data Saída*/}
      {/*    /!*<span className="text-red-400 font-bold text-sm">*</span>*!/*/}
      {/*  </Label>*/}
      {/*  <Input*/}
      {/*    type="date"*/}
      {/*    {...register("dataSaidaDiretor", {required: true})}*/}
      {/*    id="label-saida-diretor"*/}
      {/*    placeholder="Digite a data de saída"*/}
      {/*    className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded w-full h-10 text-zinc-200"*/}
      {/*  />*/}
      {/*  /!*{errors.cpf &&*!/*/}
      {/*  /!*  <span className=" text-sm text-red-300 ">{errors.cpf.message}</span>}*!/*/}
      {/*</div>*/}
    </section>
  );
}