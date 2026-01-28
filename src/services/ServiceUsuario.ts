import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const buscar = async (url: string, setDados: Function) => {
  try {
    const resposta = await api.get(url);
    // Verificamos se o dado que chegou é um Array antes de enviar para o componente
    if (Array.isArray(resposta.data)) {
      setDados(resposta.data);
    } else {
      console.warn("A API não retornou uma lista. Ajustando para lista vazia.");
      setDados([]); 
    }
  } catch (error) {
    console.error("Erro na requisição buscar:", error);
    setDados([]); // Em caso de erro (404, 500, CORS), garante que o .map não quebre
  }
};

export const cadastrar = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const atualizar = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.put(url, dados);
  setDados(resposta.data);
};

export const deletar = async (url: string) => {
  await api.delete(url);
};