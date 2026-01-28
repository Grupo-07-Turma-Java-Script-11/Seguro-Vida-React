
import axios from "axios"
import type { Categoria } from "../models/Categoria"


const api = axios.create({
  baseURL: "https://seguro-vida-90mn.onrender.com"
})

export const listarCategorias = async (): Promise<Categoria[]> => {
  const response = await api.get("/categorias")
  return response.data
}

export const buscarCategoriaPorId = async (id: number): Promise<Categoria> => {
  const response = await api.get(`/categorias/${id}`)
  return response.data
}

export const cadastrarCategoria = async (categoria: Categoria): Promise<Categoria> => {
  const response = await api.post("/categorias", categoria)
  return response.data
}

export const atualizarCategoria = async (categoria: Categoria): Promise<Categoria> => {
  const response = await api.put("/categorias", categoria)
  return response.data
}

export const deletarCategoria = async (id: number) => {
  await api.delete(`/categorias/${id}`)
}

export const buscar = async (url: string, setDados: Function) => {
    const resposta = await api.get(url)
    setDados(resposta.data)
}

export const cadastrar = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const atualizar = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.put(url, dados)
    setDados(resposta.data)
}

export const deletar = async (url: string) => {
    await api.delete(url)
}

