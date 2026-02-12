"use client"

import {useState} from "react";
import * as messages from "@/components/toastr/toastr.jsx";
import {FormProvider, useForm} from "react-hook-form";
import {motion} from "framer-motion";
import {SchemaDiretor} from "@/components/zod/schemaDiretor.js";
import {useNavigate} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import DiretorService from "@/app/service/diretorService.js";
import {DiretorStep1} from "@/pages/diretor/diretorStep1.jsx";
import {Button} from "@/components/ui/button.jsx";
import {DiretorStep2} from "@/pages/diretor/diretorStep2.jsx";
import * as React from "react";



/**
 * to-do list
 * formulário de cadastro,
 * cobrindo todos os elementos, funções e comportamentos esperados
 *
 * 1. Estrutura e Componentização**
 * [x] Criar componente principal do formulário
 * [x] Definir estados locais para cada campo (`useState` ou `react-hook-form`)
 * [x] Dividir em subcomponentes (ex: `Input`, `Botao`, `SelectPerfil`)
 * [x] Configurar mensagens de validação
 * [x] Configurar gerenciamento de erros
 *
 * 2. Campos do Formulário**
 * [x] Campo **Nome diretor**
 * [x] Campo **cpf diretor**
 * [x] Campo **matricula**
 * [x] Campo **email**
 * [x] Campo **data entrada diretor**
 * [x] Campo **data saida diretor**
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

const schema = SchemaDiretor();

function DiretorCreate() {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nomeDiretor: '',
      cpf: '',
      matricula: '',
      emailDiretor: '',
    },
    mode: "onChange"
  });
  const {handleSubmit, reset}  = methods;

  const [outPut, setOutPut] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const serviceDiretor = DiretorService();

  const diretorSave = async (data) => {
    setLoading(true);
    const diretor = { ...data, };
    await serviceDiretor.salvar(diretor)
      .then(response => {
        console.log("DADOS ", response.data);
        console.log("STATUS ", response.status);
        console.log(" STATUS DO TEXTO ", response.statusText);
        console.log("HEADERS ", response.headers);
        console.log("CONFIGURAÇÕES ", response.config);
        reset();
        messages.successMessage("Diretor cadastrado com sucesso");
        setTimeout(() => navigate('/'), 5000)
      })
      .catch (err => {
        console.log("DADOS ", err.data)
        console.log("STATUS", err);
        console.log("HEADERS ", err.headers);
        messages.errorSaveMessage(err.response?.data?.message)
      })
    await new Promise(resolve => setTimeout(resolve, 3000)) /**spinner**/
    setLoading(false);
    setOutPut(JSON.stringify(data, null, 2));
  }

  return (
    <FormProvider {...methods}>
      <main className="overflow-hidden bg-zinc-900 flex items-center justify-center">
        <form
          onSubmit={handleSubmit(diretorSave, (errors) => console.log("Erros de validação do form: ", errors))} /**high order functon**/
          className="w-full max-w-xl mx-auto p-16 rounded-2xl shadow-xl bg-zinc-950"
        >
          <div className="overflow-hidden w-full relative">
            {/**
             step 1
             **/}
            <div className="w-full  flex-shrink-0 p-4 space-y-4">
              <h2 className="text-xl font-semibold mb-4 text-center">Informações Pessoais do diretor</h2>

              <DiretorStep1/>

              {/*botões*/}
              <div className="flex justify-between pr-4 p-4 py-4"> {/**gap-6 py-4**/}
                <Button
                  type="submit"
                  className="w-28 bg-emerald-500 hover:bg-emerald-600 text-zinc-100 font-bold h-10 rounded-full
                   border-l-2 border-zinc-100 hover:border-l-orange-400 shadow-sm cursor-pointer"
                >
                  SALVAR
                </Button>

                <Button
                  type="button"
                  //onClick={handleCancelar}
                  className="flex w-28 bg-red-500/40 hover:bg-red-400/70 text-zinc-100 font-bold h-10 rounded-full
                   border-l-2 border-zinc-100 hover:text-zinc-300 hover:border-l-red-200 shadow-sm cursor-pointer"
                >
                  CANCELAR
                </Button>

              </div>
            </div>
          </div>
        </form>
        {/*<ToastContainer position="bottom-center" autoClose={3000} />*/}
        {outPut}
      </main>
    </FormProvider>
  )
}
export default DiretorCreate;