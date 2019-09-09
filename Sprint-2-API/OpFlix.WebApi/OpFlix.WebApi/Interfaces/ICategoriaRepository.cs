using OpFlix.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpFlix.WebApi.Interfaces
{
    public interface ICategoriaRepository
    {
        List<Categorias> Listar();

        Categorias BuscarPorId(int id);

        void Cadastrar(Categorias categoria);

        void Atualizar(Categorias categoria);


    }
}
