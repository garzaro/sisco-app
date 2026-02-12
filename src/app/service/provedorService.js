import ApiServiceClient from "@/app/api/apiClient.js";

const apiProvedorService = ApiServiceClient('/api/provedor');

function ProvedorService()  {
  return {

    salvar: async (provedor) => {
      try{
        return await apiProvedorService.post('', provedor);
      }catch(error) {
        console.error("Erro ao SalVar PROVEDOR", error);
        throw new Error("Erro ao SalVar PROVEDOR", error);
      }
    },
    atualizar: async (provedor) => {
      try {
        return await apiProvedorService.put(`/provedor/${provedor.id}`, provedor);
      } catch (error) {
        console.error("Erro ao atualizar:", error);
        throw new Error("Não foi possivel atualizar o provedor");
      }
    },
    deletar: async (id) => {
      try {
        return await apiProvedorService.delete(`/provedor/${id}`);
      } catch (error) {
        console.error("Erro ao deletar:", error);
        throw new Error("Não foi possivel deletar provedor");
      }
    },
    buscarProvedor: async (id) => {
      try {
        return await apiProvedorService.get(`/provedor/${id}`);
      }catch(error) {
        console.error("Erro ao buscar:", error);
        throw new Error("Nao foi possivel retornar provedor");
      }
    }
  }
}
export default ProvedorService;

