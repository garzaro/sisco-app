import {LocalStorageService} from "@/app/service/LocalStorageService.js";


/**
 * Unica responsabilidade ler/escrever/remover dados de autenticação
 * **/

const storageLocal = LocalStorageService();

/**
 * TOKEN_KEY chave usada para salvar o JWT
 * **/
const TOKEN_KEY = import.meta.env.VITE_API_AUTH_TOKEN_KEY;
const LOGGED_USER_KEY = '_usuario_logado'

/**
 * Serviço
 * **/
export const AuthService = () => {
  
  return {
    isAuthenticated: () => {
      const token = storageLocal.obterItem( TOKEN_KEY );
      return !!token;
    },

    /**
     * @param {string} token - salvar o token JWT no armazenamento local
     * **/
    login: ( token ) => {
      storageLocal.salvarItem( TOKEN_KEY, token );
    },

    /**
     * Remove o token e o usuário do armazenamento local
     * **/
    logout: () => {
      storageLocal.removerItem( TOKEN_KEY );
      storageLocal.removerItem( LOGGED_USER_KEY );
    },

    /**
     * @returns {string|null} o token JWT
     * **/
    getToken: () => storageLocal.obterItem( TOKEN_KEY ),

    /**
     * @returns {object|null} o usuario logado
     * **/
    getLoggedUser: () => storageLocal.obterItem( LOGGED_USER_KEY ),

    /**
     * @param {object} user - salva o usuario logado no localStorage
     * **/
    saveLoggedUser: ( user ) => storageLocal.salvarItem( LOGGED_USER_KEY, user ),

    /**
     * Remove apenas o usuário logado
     * **/
    removeAuthenticatedUser: () => {
      storageLocal.removerItem( LOGGED_USER_KEY);
    }
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