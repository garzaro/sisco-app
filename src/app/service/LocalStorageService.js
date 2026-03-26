
export const LocalStorageService = () => {
  return{
    /**
     * salva o item no localStorage.
     * @param {string} chave - A chave de identificação.
     * @param {*} valor - O valor a ser armazenado (poder ser objeto, string, numero, etc.)
     * Obs. retorna um objeto javascript la do servidor que deve ser transformado em string
     **/
    salvarItem:(chave, valor) => {
      localStorage.setItem(chave, JSON.stringify(valor));
    },
  }
}