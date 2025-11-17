




const UsuarioServices = () => {
  const autenticar = async (credentials) => {
    try {
      return await usuarioApi.post('/autenticar', credentials);
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      throw error; // ou tratar de outra forma
    }
  };

  const salvar = async (usuario) => {
    try {
      return await usuarioApi.post('', usuario);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      throw error;
    }
  };

  const atualizar = async (usuario) => {
    try {
      return await usuarioApi.put(`/usuarios/${usuario.id}`, usuario);
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      throw error;
    }
  };

  const deletar = async (id) => {
    try {
      return await usuarioApi.delete(`/usuarios/${id}`);
    } catch (error) {
      console.error("Erro ao deletar:", error);
      throw error;
    }
  };

  return { autenticar, salvar, atualizar, deletar };
};
