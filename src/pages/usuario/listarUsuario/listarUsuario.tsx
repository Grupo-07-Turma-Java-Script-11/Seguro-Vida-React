import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type Usuario from "../../../models/Usuario";
import { buscar, deletar } from "../../../services/ServiceUsuario";
import CardUsuario from "../cardUsuario/CardUsuario";
import { ClipLoader } from "react-spinners";

function ListarUsuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function buscarUsuarios() {
    setIsLoading(true);
    try {
      await buscar("/usuario", setUsuarios);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deletarUsuario(id: number) {
    try {
      if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
        await deletar(`/usuario/${id}`);
        alert("Usuário removido com sucesso!");
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

      <div className="flex justify-center mb-10">
        <Link
          to="/cadastrarUsuario"
          className="bg-[#4169E1] hover:bg-[#002366] text-white px-10 py-4 rounded-2xl font-bold shadow-xl transition-all transform hover:-translate-y-1"
        >
          + CADASTRAR NOVO USUÁRIO
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <ClipLoader color="#4169E1" size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <div key={usuario.id} className="relative">
                <CardUsuario usuario={usuario} />

                <div className="absolute bottom-0 right-0 w-1/2">
                  <button
                    onClick={() => deletarUsuario(usuario.id)}
                    className="w-full py-4 text-center font-bold text-red-500 hover:bg-red-50 transition-colors border-t border-l border-gray-100 rounded-br-3xl"
                  >
                    EXCLUIR
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 shadow-inner">
              <p className="text-gray-400 text-xl italic">
                Nenhum usuário encontrado na base de dados.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ListarUsuario;
