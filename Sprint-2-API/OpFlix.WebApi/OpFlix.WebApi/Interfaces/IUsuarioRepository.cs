using OpFlix.WebApi.Domains;
using OpFlix.WebApi.ViewModels;
using System.Collections.Generic;

namespace OpFlix.WebApi.Interfaces
{
    public interface IUsuarioRepository
    {
        List<Usuarios> Listar();

        Usuarios Cadastrar(Usuarios usuario);

        Usuarios BuscarPorId(int id);

        Usuarios BuscarPorEmailESenha(LoginViewModel login);

        void Atualizar(Usuarios usuario);

        void Deletar(int id);
    }
}
