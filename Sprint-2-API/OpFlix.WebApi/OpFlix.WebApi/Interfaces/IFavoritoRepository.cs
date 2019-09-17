using OpFlix.WebApi.Domains;
using System.Collections.Generic;

namespace OpFlix.WebApi.Interfaces
{
    interface IFavoritoRepository
    {
        List<Favoritos> Listar();

        Favoritos Cadastrar(Favoritos favorito);

        void Deletar(int id);
    }
}
