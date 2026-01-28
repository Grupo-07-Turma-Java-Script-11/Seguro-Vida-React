import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { buscarCategoriaPorId, deletarCategoria } from "../../services/Service"
import type { Categoria } from "../../models/Categoria"

function DeletarCategoria() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

  useEffect(() => {
    if (id) buscarCategoriaPorId(Number(id)).then(dados => setCategoria(dados))
  }, [id])

  async function confirmarDelete() {
    await deletarCategoria(Number(id))
    alert("Categoria deletada com sucesso!")
    navigate("/categorias")
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Deletar Categoria</h1>
      <p>Tem certeza que deseja deletar a categoria:</p>
      <strong>{categoria.nome}</strong>

      <div>
        <button onClick={confirmarDelete}>Sim</button>
        <button onClick={() => navigate("/categorias")}>Não</button>
      </div>
    </div>
  )
}

export default DeletarCategoria
