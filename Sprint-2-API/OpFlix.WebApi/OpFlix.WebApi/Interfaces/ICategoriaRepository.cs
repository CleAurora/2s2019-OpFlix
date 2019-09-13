using OpFlix.WebApi.Domains;
using System.Collections.Generic;

namespace OpFlix.WebApi.Interfaces
{
    public interface ICategoriaRepository
    {
        List<Categorias> Listar();

        Categorias BuscarPorId(int id);

        Categorias Cadastrar(Categorias categoria);

        void Atualizar(Categorias categoria);


    }
}
