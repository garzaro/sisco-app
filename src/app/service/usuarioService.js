import ApiServiceClient from "@/app/api/apiClient.js";
import {LocalStorageService} from "@/app/service/LocalStorageService.js";

/**
 * VER TODO-list na apgina de login
 * **/

const usuarioApi = ApiServiceClient('/api/auth');
const storageLocal = LocalStorageService();
const LOGIN_ATTEMPTS_KEY = 'sisco_login_attempts';
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_BLOCK_DURATION_MS = 15 * 60 * 1000;

const normalizeEmail = (email) => email.trim().toLowerCase();

const getAttemptState = (email) => {
  const state = storageLocal.obterItem(LOGIN_ATTEMPTS_KEY) || {};
  const attempt = state[normalizeEmail(email)];

  if (attempt?.blockedUntil && attempt.blockedUntil <= Date.now()) {
    delete state[normalizeEmail(email)];
    storageLocal.salvarItem(LOGIN_ATTEMPTS_KEY, state);
    return null;
  }

  return attempt || null;
};

const saveAttemptState = (email, attempt) => {
  const state = storageLocal.obterItem(LOGIN_ATTEMPTS_KEY) || {};
  state[normalizeEmail(email)] = attempt;
  storageLocal.salvarItem(LOGIN_ATTEMPTS_KEY, state);
};

const clearAttemptState = (email) => {
  const state = storageLocal.obterItem(LOGIN_ATTEMPTS_KEY) || {};
  delete state[normalizeEmail(email)];
  storageLocal.salvarItem(LOGIN_ATTEMPTS_KEY, state);
};

const createBlockedLoginError = (blockedUntil) => {
  const error = new Error('Muitas tentativas incorretas. Aguarde 15 minutos para tentar novamente.');
  error.code = 'LOGIN_BLOCKED';
  error.blockedUntil = blockedUntil;
  error.remainingMs = Math.max(0, blockedUntil - Date.now());
  return error;
};

function UsuarioService()  {
  return {
    autenticar: async (credentials) => {
      const attempt = getAttemptState(credentials.email);

      if (attempt?.blockedUntil > Date.now()) {
        throw createBlockedLoginError(attempt.blockedUntil);
      }

      try {
        const response = await usuarioApi.post('/autenticar', credentials);
        clearAttemptState(credentials.email);
        return response;
      } catch (error) {
        console.error("Erro ao autenticar:", error);

        if (error.response) {
          const failedAttempts = (attempt?.failedAttempts || 0) + 1;
          if (failedAttempts >= MAX_LOGIN_ATTEMPTS) {
            const blockedUntil = Date.now() + LOGIN_BLOCK_DURATION_MS;
            saveAttemptState(credentials.email, {failedAttempts, blockedUntil});
            throw createBlockedLoginError(blockedUntil);
          }

          saveAttemptState(credentials.email, {failedAttempts});
        }

        throw error;
      }
    },

    salvar: (usuario) => {
      return usuarioApi.post('/join/sign-up', usuario);
    },

    atualizar: async (usuario) => {
      try {
        return await usuarioApi.put(`/usuario/${usuario.id}`, usuario);
      } catch (error) {
        console.error("Erro ao atualizar:", error);
        throw new Error("Não foi possivel atualizar usuário");
      }
    },

    deletar: async (id) => {
      try {
        return await usuarioApi.delete(`/usuario/${id}`);
      } catch (error) {
        console.error("Erro ao deletar:", error);
        throw new Error("Não foi possivel deletar usuário");
      }
    },
  }
}
export default UsuarioService;

/**
 * import Apiservice from "../api/apiservice";
 * const usuarioApi = Apiservice('/api/usuarios');
 * const UsuarioServices = (credentials) =>{
 * return{
 * autenticar: (credentials) => {
 * return usuarioApi.post('/autenticar', credentials);
 * },
 * salvar: (usuarios) => {
 * return usuarioApi.post('', usuarios);
 * },
 * atualizar: (usuarios) => {
 * return usuarioApi.put('/atualizar', usuarios);
 * },
 * deletar: (id) => {
 * return usuarioApi.delete(/deletar/${id});
 * },
 * };
 * };
 * export default UsuarioServices;
 * **/


/**
 * import Apiservice from "../apiservice";

  const usuarioApi = Apiservice('/api/usuarios');
  *
  *
  const usuarioApi = (credentials) => {
  *
    return {
      *         autenticar: (credentials) => {
      *
        return usuarioApi.post('/autenticar', credentials);
      *
      },
      *         buscarSaldoPorUsuario: (id) => {
      *
        return usuarioApi.get(`/${id}/saldo`);
      *
      },
      *         salvar: (usuarios) => {
      *
        return usuarioApi.post('', usuarios);
      *
      }
      *
    };

  };
  *
  *
  export default usuarioApi;
 *
 * **/