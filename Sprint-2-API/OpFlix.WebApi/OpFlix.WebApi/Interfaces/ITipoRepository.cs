using OpFlix.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpFlix.WebApi.Interfaces
{
    public interface ITipoRepository
    {
        List<Tipos> Listar();

        void Cadastrar(Tipos tipo);

        Tipos BuscarPorId(int id);

        void Atualizar(Tipos tipo);

    }
}
