import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import type { Categoria } from "../../models/Categoria"
import { listarCategorias } from "../../services/Service"

function ListaCategoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([])

  useEffect(() => {
    listarCategorias().then(dados => setCategorias(dados))
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Categorias</h1>

      <Link to="/categorias/cadastrar">
        <button>Cadastrar Categoria</button>
      </Link>

      <hr />

      {categorias.map(categoria => (
        <div key={categoria.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <h3>{categoria.nome}</h3>
          <p>{categoria.descricao}</p>

          <Link to={`/categorias/editar/${categoria.id}`}>
            <button>Editar</button>
          </Link>

          <Link to={`/categorias/deletar/${categoria.id}`}>
            <button>Deletar</button>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ListaCategoria
