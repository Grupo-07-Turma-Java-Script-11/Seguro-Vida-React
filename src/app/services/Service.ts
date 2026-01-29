import axios from "axios";

const api = axios.create({
    // Se o erro no 'env' persistir no VS Code mesmo com o arquivo .d.ts, 
    // você pode usar: baseURL: (import.meta as any).env.VITE_API_URL
    baseURL: import.meta.env.VITE_API_URL 
});

export const buscar = async (url: string, setDados: Function) => {
    const resposta = await api.get(url);
    setDados(resposta.data);
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

// Se você tiver uma tela de login futuramente:
export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
};