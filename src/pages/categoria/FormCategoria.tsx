import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { Categoria } from "../../models/Categoria"
import { atualizarCategoria, buscarCategoriaPorId, cadastrarCategoria } from "../../services/Service"

function FormCategoria() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: "",
    descricao: ""
  })

  useEffect(() => {
    if (id) {
      buscarCategoriaPorId(Number(id)).then(dados => setCategoria(dados))
    }
  }, [id])

  function atualizarEstado(e: React.ChangeEvent<HTMLInputElement>) {
    setCategoria({ ...categoria, [e.target.name]: e.target.value })
  }

  async function salvarCategoria(e: React.FormEvent) {
    e.preventDefault()
    if (id) {
      await atualizarCategoria(categoria)
      alert("Categoria atualizada com sucesso!")
    } else {
      await cadastrarCategoria(categoria)
      alert("Categoria cadastrada com sucesso!")
    }
    navigate("/categorias")
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{id ? "Editar Categoria" : "Cadastrar Categoria"}</h1>

      <form onSubmit={salvarCategoria}>
        <div>
          <label>Nome</label><br />
          <input name="nome" value={categoria.nome} onChange={atualizarEstado} required />
        </div>

        <div>
          <label>Descrição</label><br />
          <input name="descricao" value={categoria.descricao} onChange={atualizarEstado} required />
        </div>

        <button type="submit">Salvar</button>
      </form>
    </div>
  )
}

export default FormCategoria
