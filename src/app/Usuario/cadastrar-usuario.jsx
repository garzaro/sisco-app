"use client"
import * as React from "react";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Button} from "@/components/ui/button.jsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {SchemaValidacao} from "@/components/usuario/validacao.jsx";


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
 * [] Campo **Senha**
 * [] Campo **Confirmar senha**
 * [] Campo **Perfil / Tipo de usuário** (ex: select: “Administrador”, “Usuário comum”)
 * [] Campo **Ativo / Inativo** (checkbox ou switch)
 * [] (Opcional) Campo de **foto de perfil / upload de imagem**
 *
 * 3. Validações**
 * [x] Validar campos obrigatórios antes do envio
 * [x] Validar formato de e-mail
 * [] Validar tamanho mínimo da senha
 * [] Validar se senha e confirmação coincidem
 * [] Validar se email e confirmação coincidem
 * [x] Exibir mensagens de erro próximas aos campos
 * [] Impedir envio enquanto houver erros
 * [x] (Opcional) Validação em tempo real (onChange ou onBlur)
 *
 * 4. Funcionalidades Principais**
 * [x] Controlar os valores de cada campo via estado
 * [x] Permitir limpar todos os campos (botão “Limpar”)
 * [] Enviar os dados via `POST` para a API (ao clicar “Salvar”)
 * [] Exibir carregamento (spinner ou desabilitar botão) durante o envio
 * [] Mostrar mensagem de sucesso ao salvar
 * [] Mostrar mensagem de erro em caso de falha
 * [] Limpar o formulário após cadastro bem-sucedido
 * [] (Opcional) Redirecionar o usuário após salvar
 *
 * 5. Botões e Ações**
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
 * [] (Opcional) Usar placeholders e tooltips informativos
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
 * [] Adicionar máscaras automáticas (ex: CPF, telefone)
 * [] Implementar autocomplete (ex: nomes já usados)
 * [] Usar biblioteca de validação (`yup`, `zod`, `validator.js`)
 * [] Integrar com `react-hook-form` para simplificar controle
 * [] Adicionar animações sutis ao salvar ou exibir mensagens
 * [] Implementar salvamento automático (auto-save em rascunho)
 * [] Adicionar confirmação antes de limpar/cancelar
 *
 * **/

const schema = SchemaValidacao();

function UsuarioCreate() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: '',
      cpf: '',
      usuario: '',
      email: '',
      email_confirm: '',
    },
    // mode: "onBlur"
  });

  const usuarioSave = (data) => {

    console.log(data);
  }

  // h-screen bg-zinc-950 flex items-center justify-center - form w-full
  return (
    <main className="h-screen bg-zinc-900 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(usuarioSave)}
        className="flex flex-col gap-4 w-full max-w-sx"> {/**high order functon**/}

        <div className="flex flex-col gap-1">
          <Label htmlFor="label-nome-completo">
            Nome
            <span className="text-red-400 font-bold text-sm">*</span>
          </Label>
          <Input
            type="text"
            {...register("nome", {required: true})}
            id="label-nome-completo"
            placeholder="Digite o nome completo"
            className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded-full w-96 h-10 text-zinc-200"
          />
          {errors.nome && <span className=" text-sm text-red-300 ">{errors.nome.message}</span>}
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
            className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded w-96 h-10 text-zinc-200"
          />
          {errors.cpf && <span className=" text-sm text-red-300 ">{errors.cpf.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="label-usuario">
            Usuário
            <span className="text-red-400 font-bold text-sm">*</span>
          </Label>
          <Input
            type="text"
            {...register("usuario", {required: true})}
            id="label-usuario"
            placeholder="Digite o usuário"
            className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded w-96 h-10 text-zinc-200"
          />
          {errors.usuario && <span className=" text-sm text-red-300 ">{errors.usuario.message}</span>}
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
            className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded w-96 h-10 text-zinc-200"
          />
          {errors.email && <span className=" text-sm text-red-300 ">{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="label-email-confirm">
            Confirme o e-mail
            <span className="text-red-400 font-bold text-sm">*</span>
          </Label>
          <Input
            type="text"
            {...register("email_confirm", {required: true})}
            id="label-email-confirm"
            placeholder="Confirme o e-mail"
            className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded w-96 h-10 text-zinc-200"
          />
          {errors.email_confirm && <span className=" text-sm text-red-300 ">{errors.email_confirm.message}</span>}
        </div>

        <div className="flex gap-6 py-4">
          <Button
            type="submit"
            className="
            w-28
            bg-emerald-500
            hover:bg-emerald-600
            text-zinc-100
            font-bold h-10
            rounded-full border-l-2 border-zinc-100 hover:border-l-orange-400 shadow-sm"
          >
            SALVAR
          </Button>

          <Button
            type="button"
            className="
            w-28
            bg-zinc-900
            hover:bg-red-300 border
            in-hover:text-red-900
            border-zinc-700 h-10
            text-zinc-200 font-bold
            py-2 px-4
            rounded-full"
          >
            CANCELAR
          </Button>

          <Button
            type="button"
            onClick={() => reset()}
            className="
            w-28
            bg-zinc-900
            hover:bg-red-300 border
            in-hover:text-orange-900
            border-zinc-700 h-10
            text-zinc-200 font-bold
            py-2 px-4
            rounded-full"
          >
            LIMPAR
          </Button>
        </div>
      </form>
    </main>
  )
}
export default UsuarioCreate;





