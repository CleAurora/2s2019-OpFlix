using OpFlix.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpFlix.WebApi.Interfaces
{
    public interface IPerfilRepository
    {
        List<Perfis> Listar();

        void Cadastrar(Perfis perfil);

        Perfis BuscarPorId(int id);

        void Atualizar(Perfis perfil);

        void Deletar(int id);
    }
}
