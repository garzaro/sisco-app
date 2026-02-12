import ApiServiceClient from "@/app/api/apiClient.js";

const apiEscolaService = ApiServiceClient('/api/escola');

function EscolaService() {
  return {

    salvar: async (escola) => {
      try{
        return await apiEscolaService.post('', escola);
      }catch(error){
        throw new Error("Não foi possível salvar os dados da escola!!", error);
      }
    },

    atualizar: async (escola) => {
      try {
        return await apiEscolaService.put(`/escola/${escola.id}`, escola);
      } catch (error) {
        console.error("Erro ao atualizar:", error);
        throw new Error("Não foi possivel atualizar escola");
      }
    },
    deletar: async (id) => {
      try {
        return await apiEscolaService.delete(`/escola/${id}`);
      } catch (error) {
        console.error("Erro ao deletar:", error);
        throw new Error("Não foi possivel salvar usuário");
      }
    },
  }
}
export default EscolaService;