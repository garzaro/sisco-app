"use client"
import * as React from "react";
import * as messages from "@/components/toastr/toastr.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { motion } from "framer-motion";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SchemaProvedor} from "@/components/zod/schemaProvedor.js";
import ProvedorService from "@/app/service/provedorService.js";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {ProvedorStep1} from "@/pages/provedor/provedorStep1.jsx";

/**
 * to-do list
 * formulário de cadastro de provedor,
 * cobrindo todos os elementos, funções e comportamentos esperados
 *
 * 1. Estrutura e Componentização**
 * [] Criar componente principal do formulário (`FormularioProvedor`)
 * [] Definir estados locais para cada campo (`useState` ou `react-hook-form`)
 * [] Dividir em subcomponentes (ex: `Input`, `Botao`, `SelectPerfil`)
 * [] Configurar mensagens de validação
 * [] Configurar gerenciamento de erros
 *
 * 2. Campos do Formulário**
 * [] Campo **Provedor internet**
 * [] Campo **iplink**
 * [] Campo **velocidade**
 * [] Campo **link**
 * [] Campo **mascara**
 * [] Campo **gatway**
 * [] Campo **dns 1**
 * [] Campo **dns 2**
 * [] Campo **dns 3**
 * [] Campo **Perfil / Tipo de usuário** (ex: select: “Administrador”, “Usuário comum”)
 * [] Campo **Ativo / Inativo** (checkbox ou switch)
 * [] (Opcional) Campo de **foto de perfil / upload de imagem**
 *
 * 3. Validações**
 * [] Validar campos obrigatórios antes do envio
 * [] Validar formato de e-mail
 * [] Exibir mensagens de erro próximas aos campos
 * [] Impedir envio enquanto houver erros
 * [] (Opcional) Validação em tempo real (onChange ou onBlur)
 *
 * 4. Funcionalidades Principais**
 * [] Controlar os valores de cada campo via estado
 * [] Permitir limpar todos os campos (botão “Limpar”)
 * [] Localstorage - estudar a logica
 * [] Configurar o CORS no backend
 * [] Enviar os dados via `POST` para a API (ao clicar “Salvar”)
 * [] Exibir carregamento (spinner ou desabilitar botão) durante o envio
 * [] Mostrar mensagem de sucesso ao salvar
 * [] Mostrar mensagem de erro em caso de falha - front e backend
 * [] Precisa reposicionar a mesangem do objeto de resposta, esta saindo abaixo do rodape
 * [] No erro o spinner nao esta saindo fica permanente
 * [] Limpar o formulário após cadastro bem-sucedido
 * [] (Opcional) Redirecionar o usuário após salvar
 *
 * 5. Botões e Ações**
 * [] Form Carroussel - top demais
 * [] **Salvar / Cadastrar** → envia o formulário
 * [] **Limpar / Resetar** → apaga todos os valores
 * [] **Cancelar / Voltar** → retorna à lista de usuários ou tela anterior
 * [] (Opcional) **Pré-visualizar** → exibe resumo dos dados antes do envio
 *
 * 6. Feedback e UX**
 * [] Mostrar mensagens de feedback claras (erro, sucesso, aviso)
 * [] Indicar campos obrigatórios com asterisco (*)
 * [] Alterar visual dos campos com erro (ex: borda vermelha)
 * [] Mostrar estado de carregamento no botão (“Salvando...”)
 * [] Utilizar `toast` ou `alert` moderno para mensagens rápidas
 * [] Focar automaticamente no primeiro campo inválido
 * [] (Opcional) Exibir contagem de caracteres para campos longos
 * [] (Opcional) Usar placeholders
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

const schema = SchemaProvedor();

function ProvedorCreate() {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      provedorInternet: '',
      ipLink: '',
      velocidadeLink: '',
      mascaraRede: '',
      dnsPrimario: '',
      dnsSecundario: '',
      dnsTerciario: '',
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
  const serviceProvedor = ProvedorService();

  const provedorSave = async (data) => {
    setLoading(true);
    const provedor = { ...data, };
    await serviceProvedor.salvar(provedor)
      .then(response => {
        reset();
        console.log("Provedor salvo", response);
        messages.successMessage("Provedor salvo com sucesso", response);
        setTimeout(() => navigate('/'), 5000)
      })
      .catch (err => {
        console.log(err);
        messages.errorSaveProvedorMessage(err.response?.data?.message || 'erro ao salvar provedor')
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
          onSubmit={handleSubmit(provedorSave, (errors) => console.log("Erros de validação:", errors))} /**high order functon**/
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
                <h2 className="text-xl font-semibold mb-4 text-center">Informações do Provedor - PASSO 1</h2>

                <ProvedorStep1/>

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

                {/*<SchoolStep2 />*/}

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

                {/*<SchoolStep3/>*/}

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
export default ProvedorCreate;

