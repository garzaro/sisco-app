import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import SpinnerWithText from "@/components/spectrumui/Spinner-with-text.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Eye, EyeOff} from "lucide-react";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as messages from "@/components/toastr/toastr.js"
import UsuarioService from "@/app/service/usuarioService.js";
import {SchemaLogin} from "@/components/zod/schemaUsuario.js";
import {InputClearable, InputClearablePassword} from "@/components/input/inputClearable.jsx";
import {Tooltip} from "@mui/material";
import {useAuth} from "@/auth/useAuth.jsx";

/**
 * TODO-LIST
 * criar tela de login de alto nível, equilibrar segurança, usabilidade (UX) e acessibilidade.
 * O objetivo é tornar o acesso o mais fluido possível para o usuário legítimo e o mais difícil possível para atacantes.
 * Lista dividida entre o que é essencial e o que agrega valor à experiência:
 *
 *[x] Campos Claros: Utilizar <label> vinculados aos inputs para acessibilidade e placeholder para contexto visual.
 *[x] Input de Senha Protegido: Usar o atributo type="password".
 *[x] Feedback de Erro Genérico: Nunca dizer "E-mail inválido" ou "Senha incorreta". Use: "E-mail ou senha incorretos". Isso evita a enumeração de usuários por atacantes.
 *[x] Botão de Ação Destacado: O botão "Entrar" deve ser o elemento visualmente mais forte da tela.
 *[] Estado de Carregamento (Loading): Desabilitar o botão e mostrar um spinner após o clique para evitar múltiplos envios (Double Submit).
 *[] Localstorage
 *[] Delay de 2,5s com feedback visual de "Redirecionando..."
 *
 * 2. Segurança no Frontend
 *[] Uso de HTTPS: Garantir que a aplicação rode apenas sob protocolo seguro para criptografar os dados em trânsito.
 *[x] Validação de Formato: Validar se o e-mail tem um formato válido antes de enviar para o servidor (reduz requisições inúteis).
 *[] Sanitização Básica: Impedir espaços em branco desnecessários no início ou fim do e-mail.
 * **/

/**
 * ✨ Ações Opcionais (Boas Práticas de Diferenciação)
 *
 * 1. Funcionalidades de Conveniência
 *[x] Exibir/Ocultar Senha: Adicionar um ícone de "olho" para que o usuário verifique o que digitou, reduzindo erros de digitação.
 *[] Esqueci minha senha: Link direto e visível para o fluxo de recuperação.
 *[] Lembrar de mim (Remember Me): Implementar via cookies seguros (HttpOnly e Secure) para manter a sessão ativa conforme a política de segurança.
 *[] Login Social (OAuth2): Botões para "Entrar com Google/Github" agilizam o processo e aumentam a conversão.
 *[] Seria útil implementar um reset() ou um Maps(-1) para voltar à página anterior - botao Voltar ou Cancelar.
 *
 * 2. Segurança Avançada e Prevenção
 *[] CAPTCHA Invisível: Implementar (como o reCAPTCHA v3) para bloquear bots sem atrapalhar o usuário humano.
 *[] MFA (Autenticação de Dois Fatores): Se a senha estiver correta, redirecionar para uma segunda tela de código (OTP).
 *[] Limite de Tentativas Visual: Após X erros, exibir uma mensagem informando que a conta será bloqueada temporariamente.
 *
 * **/

const schema = SchemaLogin();

function LoginForm () {
  const { login } = useAuth();
  const  service = UsuarioService();
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: "onTouched"
  });
  const {register, handleSubmit, setValue, watch, reset, formState: {errors}} = methods;
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const destinationBack = location.state?.from?.pathname || '/home';

  /**
   * @param removerItem - limpe a chave antiga
   * @param setItem - salvar a chave - identificação
   **/
  const handleLogin = (data) => {
    setLoading( true )

    service.autenticar(
      {
        email:data.email,
        password:data.password
      }).then(response => {
        const user = response.data;
        const token = response.data.token || 'Este_token_vai_vir_do_servidor_depois'
        login( token, user );
        reset();
        setTimeout(() => navigate(destinationBack,{replace: true}), 2000);
        messages.successMessage(response.data?.message || response.data?.status );
    }).catch(err => {
      setLoading( false );
      messages.errorLoginMessage(err.response?.data?.message);
      console.error("ERRO LOGIN ==> ", err);
    });
  };

  const handleCancelar = () =>{
    setTimeout(() => navigate("/"), 500);
  }

  return (
    <FormProvider {...methods}>

      <header className="bg-zinc-900 shadow-sm border-b border-gray-600 py-4 px-6 flex
        justify-between items-center"
      >
        <div className="flex items-center gap-2">
          <div className="bg-emerald-600 p-2 rounded-full animate-pulse"></div>
          <span className="text-xl font-bold text-gray-300 tracking-tight">
            <Link to="/" className="text-decoration-none">
              Sistema de Consulta Escolar
            </Link>
          </span>
        </div>

        <nav>
          <span className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-all ">
            <Tooltip
              title="Se ainda não possui acesso, clique no botão abaixo,
              crie sua conta e obtenha acesso ao Financas Pessoais."
              placement="right-end"
            >
                Ainda não tem conta?
            </Tooltip>
          </span>
          <Link
            to="/cadastrar-usuario"
            className="text-sm min-h-screen font-semibold hover:text-emerald-700 transition-all"
          >
            <span className="underline"> Cadastre-se </span>
          </Link>
        </nav>
      </header>

      {/** feedback **/}
      { loading && <SpinnerWithText title="Redirecionando" /> }

      <main className="relative container mx-auto px-4 md:px-8 py-10 md:py-24 lg:py-2 min-h-screen overflow-hidden
      flex items-center justify-center"
      >
        <form
          onSubmit={handleSubmit(handleLogin)} /**high order functon**/
          className="w-full max-w-xl mx-auto border p-10 rounded-2xl shadow-xl bg-zinc-800"
        >
          <div className="overflow-hidden w-full relative">
            <div className="w-full shrink-0 p-4 space-y-4">
              <h2 className="text-xl text-zinc-300 justify-center items-center text-center font-semibold mb-4">
                Faça login na sua conta
              </h2>

              {/** username **/}
              <div className="flex flex-col gap-1">
                <Label htmlFor="label-email">
                  E-mail
                  <span className="text-red-400 font-bold text-sm">*</span>
                </Label>
                <Input
                  type="email"
                  {...register("email", )}
                  id="label-email"
                  placeholder="Digite o email"
                  className="border-l-2 border-zinc-600 hover:border-l-red-400 shadow-sm rounded-2xl
                  w-full h-10 text-zinc-200"
                />
                <InputClearable
                  value={watch('email')}
                  fieldName="email"
                  setValue={setValue}
                  ariaLabel="Limpar campo"
                />
                {errors.email &&
                  <span className=" text-sm text-red-300 ">{errors.email.message}</span>}
              </div>

              {/*/!** password **!/*/}
              <div className="flex flex-col gap-1">
                <Label htmlFor="label-password">
                  Senha
                  <span className="text-red-400 font-bold text-sm">*</span>
                </Label>
                <div className="relative w-full">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {required: true})}
                    id="label-password"
                    placeholder="Digite a senha"
                    className="
                      border-l-2 border-zinc-600 hover:border-l-red-400
                      shadow-sm rounded-2xl w-full h-10 text-zinc-200 pr-10"
                  />
                  {/**zolhos da senha**/}
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                  </button>
                  <InputClearablePassword
                    value={watch('password')}
                    fieldName="password"
                    setValue={setValue}
                    ariaLabel="Limpar campo"
                    className="py-1"
                  />
                </div>
                {errors.password && (
                  <span className="text-sm text-red-300">{errors.password.message}</span>
                )}

              {/** esqueceu a senha **/}
              </div>
              <div className="text-zinc-300 font-semibold text-sm">
                Esqueceu a senha?
                <Link to="/redefinir-senha" className="text-sm text-blue-200">
                  Clique aqui.
                </Link>
              </div>

              {/** botoes **/}
              <div className="flex justify-between ">
                <Button
                  type="button"
                  onClick={handleCancelar}
                  disabled={loading}
                  className="
                  w-28
                  bg-red-500/40
                  hover:bg-red-500/70
                  text-zinc-400
                  font-bold h-10
                  rounded-full border-l-2
                  border-zinc-100
                  hover:border-l-red-200
                  hover:text-zinc-100
                  shadow-sm cursor-pointer"
                >
                  CANCELAR
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="
                  w-28
                  bg-emerald-500
                  hover:bg-emerald-600
                  text-zinc-100
                  font-bold h-10
                  rounded-full border-l-2
                  border-zinc-100
                  hover:border-l-orange-400
                  shadow-sm cursor-pointer"
                >
                  ENTRAR
                </Button>
              </div>
            </div>
          </div>
        </form>
        {/*<ToastContainer position="bottom-center" autoClose={3000} />*/}
      </main>
    </FormProvider>
  )
}
export default LoginForm;