using OpFlix.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpFlix.WebApi.Interfaces
{
    public interface IUsuarioRepository
    {
        List<Usuarios> Listar();

        void Cadastrar(Usuarios usuario);

        Usuarios BuscarPorId(int id);

        void Atualizar(Usuarios usuario);

        void Deletar(int id);
    }
}
