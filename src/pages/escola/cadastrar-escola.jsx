"use client"
import * as React from "react";
import * as messages from "@/components/toastr/toastr.jsx";
import {useState} from "react";
import { motion } from "framer-motion";
import {SchemaEscola} from "@/components/zod/schemaEscola.js";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";
import EscolaService from "@/app/service/escolaService.js";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {SchoolStep2} from "@/pages/escola/schoolStep2.jsx";
import {SchoolStep1} from "@/pages/escola/schoolStep1.jsx";
import {SchoolStep3} from "@/pages/escola/schoolStep3.jsx";

/**
 * to-do list
 * formulário de cadastro de usuários,
 * cobrindo todos os elementos, funções e comportamentos esperados
 *
 * 1. Estrutura e Componentização**
 * [x] Criar componente principal do formulário (`FormularioEscola`)
 * [x] Definir estados locais para cada campo (`useState` ou `react-hook-form`)
 * [x] Dividir em subcomponentes (ex: `Input`, `Botao`, `SelectPerfil`)
 * [x] Configurar mensagens de validação
 * [x] Configurar gerenciamento de erros
 *
 * 2. Campos do Formulário**
 * [x] Campo **Nome escola**
 * [x] Campo **codigo**
 * [x] Campo **E-mail**
 * [x] Campo **Municipio**
 * [x] Campo **Estado**
 * [x] Campo **Bairro**
 * [x] Campo **Logradouro**
 * [x] Campo **Telefone**
 * [] Campo **Diretor**
 * [] Campo **Perfil / Tipo de usuário** (ex: select: “Administrador”, “Usuário comum”)
 * [] Campo **Ativo / Inativo** (checkbox ou switch)
 * [] (Opcional) Campo de **foto de perfil / upload de imagem**
 *
 * 3. Validações**
 * [x] Validar campos obrigatórios antes do envio
 * [x] Validar formato de e-mail
 * [x] Exibir mensagens de erro próximas aos campos
 * [x] Impedir envio enquanto houver erros
 * [x] (Opcional) Validação em tempo real (onChange ou onBlur)
 *
 * 4. Funcionalidades Principais**
 * [x] Controlar os valores de cada campo via estado
 * [] Permitir limpar todos os campos (botão “Limpar”)
 * [] Localstorage - estudar a logica
 * [x] Configurar o CORS no backend
 * [x] Enviar os dados via `POST` para a API (ao clicar “Salvar”)
 * [] Exibir carregamento (spinner ou desabilitar botão) durante o envio
 * [] Mostrar mensagem de sucesso ao salvar
 * [] Mostrar mensagem de erro em caso de falha - front e backend
 * [] Precisa reposicionar a mesangem do objeto de resposta, esta saindo abaixo do rodape
 * [] No erro o spinner nao esta saindo fica permanente
 * [x] Limpar o formulário após cadastro bem-sucedido
 * [x] (Opcional) Redirecionar o usuário após salvar
 *
 * 5. Botões e Ações**
 * [x] Form Carroussel - top demais
 * [x] **Salvar / Cadastrar** → envia o formulário
 * [] **Limpar / Resetar** → apaga todos os valores
 * [] **Cancelar / Voltar** → retorna à lista de usuários ou tela anterior
 * [] (Opcional) **Pré-visualizar** → exibe resumo dos dados antes do envio
 *
 * 6. Feedback e UX**
 * [] Mostrar mensagens de feedback claras (erro, sucesso, aviso)
 * [x] Indicar campos obrigatórios com asterisco (*)
 * [] Alterar visual dos campos com erro (ex: borda vermelha)
 * [] Mostrar estado de carregamento no botão (“Salvando...”)
 * [] Utilizar `toast` ou `alert` moderno para mensagens rápidas
 * [x] Focar automaticamente no primeiro campo inválido
 * [] (Opcional) Exibir contagem de caracteres para campos longos
 * [x] (Opcional) Usar placeholders
 * [] Colocar loader ao salvar usuario e escolas
 * [] Colocar o x em cada campo para resetar - ver login ja tem
 * [] Colocar mascara CPF telefone
 * [] Tooltips informativos nos campos
 *
 *7. Estilo e Layout**
 * [] Usar layout responsivo (grid ou flex)
 * [] Garantir boa usabilidade em telas pequenas
 * [] Manter espaçamento e alinhamento consistentes
 * [] Aplicar estilos de foco e hover nos campos e botões
 * [] Adicionar tema claro/escuro (se o app suportar)
 * [] Garantir contraste de cores e acessibilidade
 *
 *8. Testes e Validação Final**
 * [] Testar fluxo completo de preenchimento e envio
 * [] Testar comportamento em campos obrigatórios vazios
 * [] Testar envio com dados inválidos (e-mails errados, senhas curtas, etc.)
 * [] Testar mensagens de erro e sucesso
 * [] Testar limpeza e reset do formulário
 * [] Testar navegação (cancelar, voltar, redirecionar)
 * [] Testar responsividade e aparência em dispositivos diferentes
 *
 *9. Extras (opcionais de melhoria)**
 * [] Tirar htmlFor dos labels
 * [] Adicionar máscaras automáticas (ex: CPF, telefone)
 * [] Implementar autocomplete (ex: nomes já usados)
 * [] Usar biblioteca de validação (`yup`, `zod`, `validator.js`)
 * [] Integrar com `react-hook-form` para simplificar controle
 * [] Adicionar animações sutis ao salvar ou exibir mensagens
 * [] Implementar salvamento automático (auto-save em rascunho)
 * [] Adicionar confirmação antes de limpar/cancelar
 *
 * **/

const schema = SchemaEscola();

function EscolaCreate() {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nomeEscola: '',
      codigo: '',
      email: '',
      municipio: '',
      unidadeFederal: '',
      bairro: '',
      logradouro: '',
      telefone: '',
      diretor: '',
      firewall: '',
      provedor: '',
      ipEscola: ''
    },
    mode: "onChange"
  });
  const {handleSubmit, reset}  = methods;

  const [outPut, setOutPut] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const next = () => setStep((umPassoPraFrente) => Math.min(umPassoPraFrente + 1, 2));
  const prev = () => setStep((umPassoPraTras) => Math.min(umPassoPraTras - 1, 0));
  const navigate = useNavigate();
  const serviceEscola = EscolaService();

  const escolaSave = async (data) => {
    setLoading(true);
    const escola = { ...data, };
    await serviceEscola.salvar(escola)
      .then(response => {
        reset();
        console.log("Escola salva", response);
        messages.successMessage("Escola salva com sucesso", response);
        setTimeout(() => navigate('/'), 5000)
      })
      .catch (err => {
        console.log(err);
        messages.errorSaveEscolaMessage(err.response?.data?.message || 'erro ao salvar escola')
        setOutPut(JSON.stringify(data, null, 2));
      })
    await new Promise(resolve => setTimeout(resolve, 3000)) /**spinner**/
    setLoading(false);
  }
  //h-screen bg-zinc-950 flex items-center justify-center - form w-full  formProvidaer{...methods}
  // style={{ textTransform: 'uppercase'}}
  return (
    <FormProvider {...methods}>
      {/**feedback**/}
      {/*{ loading && <SpinnerWithText title="Salvando" /> }*/}

      <main className="overflow-hidden bg-zinc-900 flex items-center justify-center">
        <form
          onSubmit={handleSubmit(escolaSave, (errors) => console.log("Erros de validação:", errors))} /**high order functon**/
          className="w-full max-w-xl mx-auto p-16 rounded-2xl shadow-xl bg-zinc-950"
        >
          <div className="overflow-hidden w-full relative">
            <motion.div
              className="flex"
              animate={{x: `-${step * 100}%`}}
              transition={{type: "spring", stiffness: 1000, damping: 30}}
            >
              {/** step 1
               flex-shrink-0 = esconde
               space-y-4 = espaço xy
               section**/}
              <div className="w-full  flex-shrink-0 p-4 space-y-4">
                <h2 className="text-xl font-semibold mb-4 text-center">Informações da Escola - PASSO 1</h2>

                <SchoolStep1/>

                {/*botões*/}
                <div className="flex justify-between pr-4 p-4 py-4"> {/**gap-6 py-4**/}
                  <Button
                    type="button"
                    //onClick={handleCancelar}
                    className="flex w-28 bg-red-500/40 hover:bg-red-400/70 text-zinc-100 font-bold h-10 rounded-full
                     border-l-2 border-zinc-100 hover:text-zinc-300 hover:border-l-red-200 shadow-sm cursor-pointer"
                  >
                    CANCELAR
                  </Button>

                  <Button
                    type="button"
                    onClick={next}
                    className="w-28 bg-emerald-500 hover:bg-emerald-600 text-zinc-100 font-bold h-10 rounded-full
                     border-l-2 border-zinc-100 hover:border-l-orange-400 shadow-sm cursor-pointer"
                  >
                    PRÓXIMO
                  </Button>
                </div>
              </div>

              {/** STEP 2 **/}
              <section className="w-full flex-shrink-0 pr-4 p-4 space-y-4">
                <h2 className="text-xl font-semibold text-center mb-4">Endereço da Escola - PASSO 2</h2>

                <SchoolStep2 />

                <div className="flex justify-between pr-4 p-4"> {/**gap-6 py-4**/}
                  <Button
                    type="button"
                    onClick={prev}
                    className="flex w-28 bg-red-500/40 hover:bg-red-400/70 text-zinc-100 font-bold h-10 rounded-full
                     border-l-2 border-zinc-100 hover:text-zinc-300 hover:border-l-red-200 shadow-sm cursor-pointer"
                  >
                    VOLTAR
                  </Button>

                  <Button
                    type="button"
                    onClick={next}
                    className="flex w-28 bg-emerald-500 hover:bg-emerald-600 text-zinc-100 font-bold h-10 rounded-full
                     border-l-2 border-zinc-100 hover:border-l-orange-400 shadow-sm cursor-pointer"
                  >
                    PRÓXIMO
                  </Button>
                </div>
              </section>

              {/** STEP 3 **/}
              <section className="w-full flex-shrink-0 pr-4 p-4 space-y-4">
                <h2 className="text-xl font-semibold text-center mb-4">DIretor - PASSO 3</h2>

                <SchoolStep3/>

                <div className="flex justify-between pr-4 p-4"> {/**gap-6 py-4**/}
                  <Button
                    type="button"
                    onClick={prev}
                    className="flex w-28 bg-red-500/40 hover:bg-red-400/70 text-zinc-100 font-bold h-10 rounded-full
                     border-l-2 border-zinc-100 hover:text-zinc-300 hover:border-l-red-200 shadow-sm cursor-pointer"
                  >
                    VOLTAR
                  </Button>

                  <Button
                    type="submit"
                    className="flex w-28 bg-emerald-500 hover:bg-emerald-600 text-zinc-100 font-bold h-10 rounded-full
                     border-l-2 border-zinc-100 hover:border-l-orange-400 shadow-sm cursor-pointer"
                  >
                    SALVAR
                  </Button>
                </div>
              </section>

            </motion.div>
          </div>

          {/* DOTS - barra de progresso - bolinhas*/}
          <div className="flex justify-center gap-3 mt-6">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                type="button"
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  step === i ? "bg-blue-500/50 scale-125" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </form>
        {/*<ToastContainer position="bottom-center" autoClose={3000} />*/}
        {outPut}
      </main>
    </FormProvider>
  )
}
export default EscolaCreate;

/**
 * {/*unidade federal
}
*
<div className="flex flex-col gap-1">
  * <Label htmlFor="label-uf-municipio">
  * Estado - ( UF )
  * <span className="text-red-400 font-bold text-sm">*</span>
  * </Label>
  * <Input
  *                     type="text"
  * {...register("unidadeFederal", {required: true})}
  * id="label-uf-municipio"
  * placeholder="Digite a unidade federal do municipio"
  * className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded
  * w-96 h-10 text-zinc-200"
  * />
  * {errors.unidadeFederal &&
  * <span className=" text-sm text-red-300 ">{errors.unidadeFederal.message}</span>}
  * </div>
*
* {/** bairro **}
* <div className="flex flex-col gap-1">
  * <Label htmlFor="label-uf-municipio">
  * Bairro
  * <span className="text-red-400 font-bold text-sm">*</span>
  * </Label>
  * <Input
  *                     type="text"
  * {...register("bairro", {required: true})}
  * id="label-bairro"
  * placeholder="Digite o bairro"
  * className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded
  * w-96 h-10 text-zinc-200"
  * />
  * {errors.bairro &&
  * <span className=" text-sm text-red-300 ">{errors.bairro.message}</span>}
  * </div>
*
* {/** logradouro **
* <div className="flex flex-col gap-1">
  * <Label htmlFor="label-logradouro">
  * Logradouro ( rua, avedida, praça )
  * <span className="text-red-400 font-bold text-sm">*</span>
  * </Label>
  * <Input
  *                     type="text"
  * {...register("logradouro", {required: true})}
  * id="label-logradouro"
  * placeholder="Digite o endereço"
  * className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded
  * w-96 h-10 text-zinc-200"
  * />
  * {errors.logradouro &&
  * <span className=" text-sm text-red-300 ">{errors.logradouro.message}</span>}
  * </div>
*
* {/*telefone*
* <div className="flex flex-col gap-1">
  * <Label htmlFor="label-uf-municipio">
  * Telefone
  * <span className="text-red-400 font-bold text-sm">*</span>
  * </Label>
  * <Input
  *                     type="number"
  * {...register("telefone", {required: true})}
  * id="label-telefone"
  * placeholder="Digite o telefone com DDD"
  * className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded
  * w-96 h-10 text-zinc-200"
  * />
  * {errors.telefone &&
  * <span className=" text-sm text-red-300 ">{errors.telefone.message}</span>}
  * </div>
 *
 * **/
