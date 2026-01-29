import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type Usuario from "../../../models/Usuario";
import { buscar, deletar } from "../../../services/Service";
import CardUsuario from "../cardUsuario/CardUsuario";
import { ClipLoader } from "react-spinners";
import { LinhaUsuario } from "../LinhaUsuario/LinhaUsuario";

function ListarUsuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Função para buscar a lista de usuários da API
  async function buscarUsuarios() {
    setIsLoading(true);
    try {
      // Certifique-se de que o Service.ts foi atualizado para não exigir o parâmetro 'header'
      await buscar("/usuario", setUsuarios);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Função de exclusão que será passada para o componente CardUsuario
  async function deletarUsuario(id: number) {
    try {
      if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
        await deletar(`/usuario/${id}`);
        alert("Usuário removido com sucesso!");
        // Atualiza a lista após a exclusão
        buscarUsuarios();
      }
    } catch (error) {
      alert("Erro ao excluir usuário.");
    }
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);

return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-4xl text-center my-10 font-bold text-[#002366] uppercase tracking-tighter">
        Painel de Controle de Usuários
      </h1>

      <div className="flex justify-between items-center mb-10">
         <p className="text-gray-500 font-medium">Total: {usuarios.length} usuários</p>
        <Link
          to="/cadastrarUsuario"
          className="bg-[#4169E1] hover:bg-[#002366] text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all"
        >
          + NOVO USUÁRIO
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <ClipLoader color="#4169E1" size={50} />
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#002366] text-white">
              <tr>
                <th className="px-6 py-4 uppercase text-sm font-bold">ID</th>
                <th className="px-6 py-4 uppercase text-sm font-bold">Nome</th>
                <th className="px-6 py-4 uppercase text-sm font-bold">E-mail</th>
                <th className="px-6 py-4 uppercase text-sm font-bold">Nascimento</th>
                <th className="px-6 py-4 uppercase text-sm font-bold text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 ? (
                usuarios.map((usuario) => (
                  <LinhaUsuario 
                    key={usuario.id} 
                    usuario={usuario} 
                    onDelete={deletarUsuario} 
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-20 text-gray-400 italic">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ListarUsuario;