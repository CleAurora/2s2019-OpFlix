using OpFlix.WebApi.Domains;
using System.Collections.Generic;

namespace OpFlix.WebApi.Interfaces
{
    public interface ILocalizacaoRepository
    {
        void Cadastrar(Localizacoes localizacao);

        List<Localizacoes> Listar();


    }
}
