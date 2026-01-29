import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Usuario from "../../../models/Usuario";
import { buscar, cadastrar, atualizar } from "../../../services/Service";

function FormUsuario() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    data_nascimento: "",
  });

  async function buscarPorId(id: string) {
    try {
      await buscar(`/usuario/${id}`, setUsuario);
    } catch (error) {
      alert("Erro ao buscar o usuário.");
      retornar();
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/usuario");
  }



  async function cadastrarUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id !== undefined) {
        // CORREÇÃO: Adicione o ID na URL para o método PUT
        await atualizar(`/usuario/${id}`, usuario, setUsuario);
        alert("Usuário atualizado com sucesso!");
      } else {
        await cadastrar("/usuario", usuario, setUsuario);
        alert("Usuário cadastrado com sucesso!");
      }
      retornar();
    } catch (error) {
      alert("Erro ao salvar o usuário.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-md shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-blue-600 p-8 text-center">
          <h1 className="text-3xl font-bold text-white uppercase tracking-wider">
            {id === undefined ? "Novo Registro" : "Editar Registro"}
          </h1>
          <p className="text-blue-200 mt-2">Preencha as informações abaixo</p>
        </div>

        <form className="p-8 flex flex-col gap-5" onSubmit={cadastrarUsuario}>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="nome"
              className="text-sm font-bold text-gray-600 ml-1"
            >
              Nome Completo
            </label>
            <input
              type="text"
              name="nome"
              placeholder="Ex: João da Silva"
              className="w-full px-4 py-3 rounded-md border-2 border-gray-100 bg-gray-50 focus:border-[#4169E1] focus:bg-white outline-none transition-all text-gray-700"
              value={usuario.nome}
              onChange={atualizarEstado}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="usuario"
              className="text-sm font-bold text-gray-600 ml-1"
            >
              E-mail
            </label>
            <input
              type="email"
              name="usuario"
              placeholder="exemplo@email.com"
              className="w-full px-4 py-3 rounded-md border-2 border-gray-100 bg-gray-50 focus:border-[#4169E1] focus:bg-white outline-none transition-all text-gray-700"
              value={usuario.usuario}
              onChange={atualizarEstado}
              required
            />
          </div>

          {id === undefined && (
            <div className="flex flex-col gap-1">
              <label
                htmlFor="senha"
                className="text-sm font-bold text-gray-600 ml-1"
              >
                Defina uma Senha
              </label>
              <input
                type="password"
                name="senha"
                placeholder="********"
                className="w-full px-4 py-3 rounded-md border-2 border-gray-100 bg-gray-50 focus:border-[#4169E1] focus:bg-white outline-none transition-all text-gray-700"
                value={usuario.senha}
                onChange={atualizarEstado}
                required
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label
              htmlFor="data_nascimento"
              className="text-sm font-bold text-gray-600 ml-1"
            >
              Data de Nascimento
            </label>
            <input
              type="date"
              name="data_nascimento"
              className="w-full px-4 py-3 rounded-md border-2 border-gray-100 bg-gray-50 focus:border-[#4169E1] focus:bg-white outline-none transition-all text-gray-700"
              value={usuario.data_nascimento}
              onChange={atualizarEstado}
              required
            />
          </div>

          <button
            type="submit"
            className=" cursor-pointer w-full mt-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 rounded-md shadow-lg hover:shadow-blue-200 transition-all duration-300 transform hover:-translate-y-1 flex justify-center items-center disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : id === undefined ? (
              "FINALIZAR CADASTRO"
            ) : (
              "SALVAR ALTERAÇÕES"
            )}
          </button>

          <button
            type="button"
            onClick={retornar}
            className=" cursor-pointer text-gray-400 font-semibold text-sm hover:text-gray-600 transition-colors uppercase"
          >
            Cancelar e Voltar
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormUsuario;
