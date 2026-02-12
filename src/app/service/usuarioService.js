import ApiClient from "@/app/api/apiClient.js";
import ApiServiceClient from "@/app/api/apiClient.js";

const usuarioApi = ApiServiceClient('/api/usuario');

function UsuarioService()  {
  return {
    autenticar: async (credentials) => {
      try {
        return await usuarioApi.post('/autenticar', credentials);
      } catch (error) {
        console.error("Erro ao autenticar:", error);
        throw new Error("Não foi possivel autenticar.");
      }
    },

    salvar: (usuario) => {
      return usuarioApi.post('', usuario);
    },

    atualizar: async (usuario) => {
      try {
        return await usuarioApi.put(`/usuario/${usuario.id}`, usuario);
      } catch (error) {
        console.error("Erro ao atualizar:", error);
        throw new Error("Não foi possivel salvar usuário");
      }
    },

    deletar: async (id) => {
      try {
        return await usuarioApi.delete(`/usuario/${id}`);
      } catch (error) {
        console.error("Erro ao deletar:", error);
        throw new Error("Não foi possivel salvar usuário");
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