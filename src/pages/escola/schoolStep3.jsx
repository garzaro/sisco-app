import * as React from "react";
import {Controller, useFormContext} from "react-hook-form";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Divider} from "@heroui/react";
import DividerWithText from "@/components/ui/DividerWithText.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {useEffect, useMemo, useState} from "react";
import ProvedorService from "@/app/service/provedorService.js";

export function SchoolStep3() {
  const serviceProvedores = useMemo(() => ProvedorService(), []);
  const [provedores, setProvedores] = useState([]);
  const {register, control, formState:{ errors }} = useFormContext();

  useEffect(() => {
    serviceProvedores.buscarProvedor()
      .then(response => {
        console.log("Usuario salvo", response);
        setProvedores( response.data || [] );
      })
      .catch (err => {
        console.log(err);
      });
  }, [serviceProvedores]);

  return (
    <section className="w-full flex-shrink-0 p-4 space-y-4">
      {/*nome diretor*/}
      <div className="flex flex-col gap-1">
        <Label htmlFor="label-nome-diretor">
          Diretor
        </Label>
        <Input
          type="text"
          {...register("diretor")}
          id="label-nome-diretor"
          placeholder="colocar um icone de informacao de campo nulo"
          className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded w-96 h-10 text-zinc-200"
        />
        {errors.diretor &&
          <span className=" text-sm text-red-300 ">{errors.diretor.message}</span>}
      </div>

      {/*divider*/}
      <DividerWithText title="Informações de conexão" />

      <Controller
        name="provedor"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select value={ field.value?.toString() || '' }
                    className={errors ? "bg-red-400" : "bg-zinc-700"}
                    onValueChange={ field.onChange }
            >
              <SelectTrigger className={`border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded
              w-96 h-10 text-zinc-200 
              ${error ? "border-red-500 bg-red-500/10" : "border-zinc-600 hover:border-l-red-400"}`}
              >
                <SelectValue placeholder="Selecione o provedor" />
              </SelectTrigger>
              <SelectContent>
                { provedores.length > 0 ? (
                  provedores.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.nome}
                    </SelectItem>
                  ))
                ) : ( <SelectItem value="empty" disable >
                  Nehum provedore cadastrado
                  </SelectItem>
                  )}
              </SelectContent>
            </Select>
          </>
        )}
      />
    </section>
  );
}

