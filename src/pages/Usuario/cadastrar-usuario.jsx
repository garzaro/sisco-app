"use client"
import * as React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Button} from "@/components/ui/button.jsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {SchemaUsuario} from "@/components/zod/schemaUsuario.js";
import UsuarioService from "@/app/service/usuarioService.js";
import {Swiper, SwiperSlide} from "swiper/react";
import { motion } from "framer-motion";
import {Eye, EyeOff} from "lucide-react";
import * as messages from "@/components/toastr/toastr.jsx"
import SpinnerWithText from "@/components/spectrumui/spinner-with-text.jsx";

//import {useRef} from "react";

/**
 * to-do list
 * formulário de cadastro de usuários,
 * cobrindo todos os elementos, funções e comportamentos esperados
 *
 * 1. Estrutura e Componentização**
 * [x] Criar componente principal do formulário (`FormularioUsuario`)
 * [x] Definir estados locais para cada campo (`useState` ou `react-hook-form`)
 * [x] Dividir em subcomponentes (ex: `Input`, `Botao`, `SelectPerfil`)
 * [x] Configurar mensagens de validação
 * [] Configurar gerenciamento de erros
 *
 * 2. Campos do Formulário**
 * [x] Campo **Nome completo**
 * [x] Campo **E-mail**
 * [x] Campo **Confirmar E-mail**
 * [x] Campo **Senha**
 * [x] Campo **Confirmar senha**
 * [] Campo **Perfil / Tipo de usuário** (ex: select: “Administrador”, “Usuário comum”)
 * [] Campo **Ativo / Inativo** (checkbox ou switch)
 * [] (Opcional) Campo de **foto de perfil / upload de imagem**
 *
 * 3. Validações**
 * [x] Validar campos obrigatórios antes do envio
 * [x] Validar formato de e-mail
 * [x] Validar se email e confirmação coincidem
 * [x] Validar tamanho mínimo da senha
 * [x] Validar se senha e confirmação coincidem
 * [x] Olhinho na senha
 * [x] Exibir mensagens de erro próximas aos campos
 * [x] Impedir envio enquanto houver erros
 * [x] (Opcional) Validação em tempo real (onChange ou onBlur)
 *
 * 4. Funcionalidades Principais**
 * [x] Controlar os valores de cada campo via estado
 * [x] Permitir limpar todos os campos (botão “Limpar”)
 * [] Localstorage - estudar a logica
 * [x] Configurar o CORS no backend
 * [x] Enviar os dados via `POST` para a API (ao clicar “Salvar”)
 * [x] Exibir carregamento (spinner ou desabilitar botão) durante o envio
 * [x] Mostrar mensagem de sucesso ao salvar
 * [x] Mostrar mensagem de erro em caso de falha - front e backend
 * [] Precisa reposicionar a mesangem do objeto de resposta, esta saindo abixo do rodape
 * [x] No erro o spinner ano esta saindo fica permanente
 * [x] Limpar o formulário após cadastro bem-sucedido
 * [x] (Opcional) Redirecionar o usuário após salvar
 *
 * 5. Botões e Ações**
 * [x] Form Carroussel - top demais
 * [x] **Salvar / Cadastrar** → envia o formulário
 * [x] **Limpar / Resetar** → apaga todos os valores
 * [] **Cancelar / Voltar** → retorna à lista de usuários ou tela anterior
 * [x] (Opcional) **Pré-visualizar** → exibe resumo dos dados antes do envio
 *
 * 6. Feedback e UX**
 * [x] Mostrar mensagens de feedback claras (erro, sucesso, aviso)
 * [x] Indicar campos obrigatórios com asterisco (*)
 * [] Alterar visual dos campos com erro (ex: borda vermelha)
 * [] Mostrar estado de carregamento no botão (“Salvando...”)
 * [x] Utilizar `toast` ou `alert` moderno para mensagens rápidas
 * [x] Focar automaticamente no primeiro campo inválido
 * [] (Opcional) Exibir contagem de caracteres para campos longos
 * [x] (Opcional) Usar placeholders
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

const schema = SchemaUsuario();

function UsuarioCreate() {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nomeCompleto: '',
      cpf: '',
      username: '',
      email: '',
      password: '',
    },
    mode: "onTouched"
  });
  const {register, handleSubmit, reset, watch, formState: {errors}} = methods;
  const [loading, setLoading] = useState(false);
  const [step, setStep] = React.useState(0);
  const next = () => setStep((umPassoPraFrente) => Math.min(umPassoPraFrente + 1, 2));
  const prev = () => setStep((umPassoPraTras) => Math.min(umPassoPraTras - 1, 0));
  const email = watch('email');
  const password = watch('password')
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const serviceUsuario = UsuarioService();

  const usuarioSave = async (data) => {
    setLoading(true);
    const usuario = { ...data, };
    await serviceUsuario.salvar(usuario)
      .then(res => {
        reset();
        console.log("Usuario salvo", res);
        messages.successMessage("Usuário salvo com sucesso");
        setTimeout(() => navigate('/login-form'), 5000)
      })
      .catch (err => {
        console.log(err);
        messages.errorSaveUserMessage(err.response?.data?.message || 'erro ao salvar usuario....')
      })
    await new Promise(resolve => setTimeout(resolve, 3000)) /**spinner**/
    setLoading(false);
  }
  //h-screen bg-zinc-950 flex items-center justify-center - form w-full  formProvidaer{...methods}
  return (
    <FormProvider {...methods}>
      {/**feedback**/}
      { loading && <SpinnerWithText title="Salvando" /> }

      <main className="overflow-hidden bg-zinc-900 flex items-center justify-center">
        <form
          onSubmit={handleSubmit(usuarioSave)} /**high order functon**/
          className="w-full max-w-xl mx-auto p-6 rounded-2xl shadow-xl bg-zinc-950"
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
               **/}
              <section className="w-full  flex-shrink-0 p-4 space-y-4">
                <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="label-nome-completo">
                    Nome Completo
                    <span className="text-red-400 font-bold text-sm">*</span>
                  </Label>
                  <Input
                    type="text"
                    {...register("nomeCompleto", {required: true})}
                    id="label-nome-completo"
                    placeholder="Digite o nome completo"
                    className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded
                    w-96 h-10 text-zinc-200"
                  />
                  {errors.nomeCompleto &&
                    <span className=" text-sm text-red-300 ">{errors.nomeCompleto.message}</span>}
                </div>

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

                <div className="flex flex-col gap-1">
                  <Label htmlFor="label-username">
                    Usuário
                    <span className="text-red-400 font-bold text-sm">*</span>
                  </Label>
                  <Input
                    type="text"
                    {...register("username", {required: true})}
                    id="label-username"
                    placeholder="Digite o nome de usuário"
                    className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded
                    w-96 h-10 text-zinc-200"
                  />
                  {errors.username &&
                    <span className=" text-sm text-red-300 ">{errors.username.message}</span>}
                </div>

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
                    className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded
                     w-96 h-10 text-zinc-200"
                  />
                  {errors.email &&
                    <span className=" text-sm text-red-300 ">{errors.email.message}</span>}
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="label-email-confirm">
                    Confirme o e-mail
                    <span className="text-red-400 font-bold text-sm">*</span>
                  </Label>
                  <Input
                    type="text"
                    {...register("email_confirm", {
                      required: true,
                      validate: value => value === email || 'Emails não conferem' /**se falhar o schema**/
                    })}
                    onPaste={(e) => e.preventDefault()}
                    id="label-email-confirm"
                    placeholder="Confirme o e-mail"
                    className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded
                     w-96 h-10 text-zinc-200"
                  />
                  {errors.email_confirm &&
                    <span className=" text-sm text-red-300 ">{errors.email_confirm.message}</span>}
                </div>

                {/*botões*/}
                <div className="flex justify-between py-4"> {/**gap-6 py-4**/}
                  <Button
                    type="button"
                    onClick={next}
                    className="flex w-28 bg-emerald-500 hover:bg-emerald-600 text-zinc-100 font-bold h-10
                    rounded-full border-l-2 border-zinc-100 hover:border-l-orange-400 shadow-sm"
                  >
                    PRÓXIMO
                  </Button>

                  <Button
                    type="button"
                    //onClick={handleCancelar}
                    className="flex w-28 bg-red-500 hover:bg-red-400 text-zinc-100 font-bold h-10 rounded-full
                     border-l-2 border-zinc-100 hover:border-l-red-200 shadow-sm"
                  >
                    CANCELAR
                  </Button>
                </div>
              </section>

              {/* STEP 2 - senha */}
              <section className="w-full flex-shrink-0 p-4 space-y-4">
                <h2 className="text-xl font-semibold mb-4">Segurança</h2>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="label-password">
                    Senha
                    <span className="text-red-400 font-bold text-sm">*</span>
                  </Label>
                  <div className="relative w-96">
                    <Input
                      type={show ? "text" : "password"}
                      {...register("password", {required: true})}
                      id="label-password"
                      placeholder="Digite a senha"
                      className="
                      border-l-2 border-zinc-600 hover:border-l-red-400
                      shadow-sm rounded w-full h-10 text-zinc-200 pr-10"
                    />
                    {/**zolhos da senha**/}
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                      onClick={() => setShow(!show)}
                    >
                      {show ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="text-sm text-red-300">{errors.password.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="label-confirm-password">
                    Confirmar senha
                    <span className="text-red-400 font-bold text-sm">*</span>
                  </Label>
                  <div className="relative w-96">
                    <Input
                      type={showConfirm ? "text" : "password"}
                      {...register("confirm_password", {
                        required: true,
                        validate: value => value === password || "As senhas não são iguais", /**se falhar o schema**/
                      })}
                      onPaste={(e) => e.preventDefault()}
                      id="label-confirm-password"
                      placeholder="Confirme a senha"
                      className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded
                     w-96 h-10 text-zinc-200"
                    />
                    {/**zolhos da senha**/}
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>
                  </div>
                  {errors.confirm_password &&
                    <span className=" text-sm text-red-300 ">{errors.confirm_password.message}</span>}
                </div>

                <div className="flex justify-between py-4"> {/**gap-6 py-4**/}
                  <Button
                    type="button"
                    onClick={prev}
                    className="flex w-28 bg-red-500 hover:bg-red-400 text-zinc-100 font-bold h-10 rounded-full
                     border-l-2 border-zinc-100 hover:border-l-red-200 shadow-sm"
                  >
                    VOLTAR
                  </Button>

                  <Button
                    type="submit"
                    className="flex w-28 bg-emerald-500 hover:bg-emerald-600 text-zinc-100 font-bold h-10
                    rounded-full border-l-2 border-zinc-100 hover:border-l-orange-400 shadow-sm"
                  >
                    FINALIZAR
                  </Button>
                </div>
              </section>
            </motion.div>
          </div>

          {/* DOTS - barra de progresso - bolinhas*/}
          <div className="flex justify-center gap-3 mt-6">
            {[0, 1].map((i) => (
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
      </main>
    </FormProvider>
  )
}
export default UsuarioCreate;

/**
 *
 * src/
 *  └─ app/
 *      └─ Usuario/
 *          ├─ UsuarioCreate.jsx
 *          ├─ MultiStepForm.jsx
 *          ├─ steps/
 *          │   ├─ UserStep1.jsx
 *          │   └─ UserStep2.jsx
 *          ├─ schemaUsuario.js
 *          ├─ maskCpf.js
 *          └─ PasswordInput.jsx
 *
 * **/

/**
 * function LoadingOverlay() {
 *   return (
 *     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[9999]">
 *       <div className="flex flex-col items-center gap-4">
 *         <Spinner className="w-10 h-10 text-white" />
 *         <span className="text-white text-lg font-semibold">Salvando...
 *         {/*<Spinner classNames={{label: "text-foreground mt-4"}} label="hidden" variant="dots" />
}
*         </span>
*       </div>
*     </div>
*
*   )
;
*
}
 * **/

/**
 * const usuarioSave = (data) => {
 *   console.log("Ta vindo o que?", data);
 *   const payload = {
 *     ...data,
 *   }
 *   serviceUsuario.salvar(payload)
 *   console.log("Salvando o que ?", payload)
 *   const mensagem = toast.loading("Salvando...")
 *     .then(res => {
 *       console.log("\0/ o objeto esta sendo salvo", res);
 *       toast.loading(mensagem, {render: "Usuario salvo com sucesso", type: "success", isLoading: false});
 *     })
 *     .catch(err => console.log(err));
 *
 *   toast.promise(serviceUsuario.salvar(payload),
 *     console.log("Ta tentando salvar o que?", payload),
 *     {
 *       loading: "Salvando o usuário...",
 *       success: (res) => `Usuário salvo com o ID ${res.id}`,
 *       position: "center",
 *       autoClose: 5000,
 *     }
 *   )
 *     .then((res) => {
 *       console.log(res);
 *       toast.update(res.message?.data || "Usuário salvo com sucesso", {});
 *     })
 *     .catch((err) => {
 *       console.log(err);
 *       toast.error(err.message.data || "ocorreu um erro ao salvar o usuário");
 *       setOutPut(JSON.stringify(data, null, 2));
 *     })
 * }
 *
 * **/





//   //const save = serviceUsuario.salvar(usuario);
//   toast.promise(save, {
//     loading: "Salvando o usuário...",
//     success: "Usuário salvo com sucesso!",
//     error: "Erro ao salvar o usuário!",
//     autoClose: 5000,
//   });
//   save
//     .then((res) => {
//       console.log("O que esta tentando salvar?", res);
//       toast.success(`Usuário salvo com o ID: ${res.id}`, {}) //so pra ver se salva id
//   })
//   .catch((err) => {
//     console.log("Mostrar o erro ao salvar", err);
//     toast.error(err.response?.data.message || err.response.data,
//       "Um erro ocorreu ao salvar o usuário", {});
//   })
//   setOutPut(JSON.stringify(data, null, 2));
// }
//
// const handleCancelar = () => {
//   setTimeout(navigate('/login'), 2000);

/**
 * /* --------------------------------------------------------------------------
*   /*                     FUNÇÃO ÚNICA DE SUBMISSÃO (CREATE/UPDATE)
*   /* --------------------------------------------------------------------------
*
*
const onSubmit = async (data) => {
*
  setLoading(true);
*
*
  try {
  *
    const usuario = usuarioLogado.obterItem("_usuario_logado");
  *
  *
    const payload = {
      *         ...data,
      *         usuario: usuario?.id,
      *
    };
  *
  *
    if (id) {
    *         // UPDATE
    *
      await servicoLancamento.atualizarLancamento(payload);
    *
      mensagemDeSucesso("Lançamento atualizado com sucesso");
    *
    } else {
    *         // CREATE
    *
      await servicoLancamento.salvarLancamento(payload);
    *
      mensagemDeSucesso("Lançamento criado com sucesso");
    *
    }
  *
  *
    setTimeout(() => navigate("/consultar-lancamento"), 1500);
  *
  } catch (error) {
  *
    mensagemDeErro(
    * error?.response?.data?.message ??
    * "Erro inesperado ao salvar lançamento."
    *
  )
    ;
  *
  } finally {
  *
    setLoading(false);
  *
  }
*
};
 *
 * **/

