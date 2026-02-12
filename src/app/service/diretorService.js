import ApiServiceClient from "@/app/api/apiClient.js";

const apiDiretorService = ApiServiceClient('/api/diretor');

function DiretorService()  {
  return {

    salvar: async (diretor) => {
      try{
        return await apiDiretorService.post('', diretor);
      }catch(error) {
        console.error("Erro ao SalVar DIRETOR", error);
        throw new Error("Erro ao SalVar DIRETOR", error);
      }
    },
    atualizar: async (diretor) => {
      try {
        return await apiDiretorService.put(`/diretor/${diretor.id}`, diretor);
      } catch (error) {
        console.error("Erro ao atualizar:", error);
        throw new Error("Não foi possivel salvar usuário");
      }
    },
    deletar: async (id) => {
      try {
        return await apiDiretorService.delete(`/diretor/${id}`);
      } catch (error) {
        console.error("Erro ao deletar:", error);
        throw new Error("Não foi possivel salvar usuário");
      }
    },
  }
}
export default DiretorService;

