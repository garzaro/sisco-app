/**
 * Unica responsabilidade ler/escrever/remover dados de autenticação
 * **/
import {LocalStorageService} from "@/app/service/LocalStorageService.js";


const storageLocal = LocalStorageService();

const TOKEN_KEY = 'token_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';

export const authService = {

  login( token ){
    localStorage.setItem( TOKEN_KEY, token );
  },

  logout(){
    localStorage.removeItem( TOKEN_KEY );
  },

  isAuthenticated()CONTINUAR COM A AUTH PARA CHAVE DO USUARIO LOGADO EM APPLICATION
    return !!localStorage.getItem( TOKEN_KEY );
  },

  getToken(){
    return localStorage.getItem( TOKEN_KEY );
  }
};



/**
 * O Fluxo Completo
 * Para visualizar como isso se encaixa no mundo real, imagine o seguinte processo:
 *
 * Credenciais: O usuário digita e-mail e senha e clica em "Entrar".
 *
 * Validação: O servidor confere os dados e, se estiverem certos, responde com um token.
 *
 * Persistência (O seu código): A função login(token) é chamada. Ela pega essa chave e guarda no "armário" do
 * navegador (localStorage).
 *
 * Uso Futuro: Nas próximas vezes que o usuário acessar o site, o código buscará esse token no localStorage
 * para provar que ele já está logado, evitando que ele precise digitar a senha toda hora.
 * **/