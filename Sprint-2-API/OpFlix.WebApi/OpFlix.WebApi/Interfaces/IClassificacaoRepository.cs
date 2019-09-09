using OpFlix.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpFlix.WebApi.Interfaces
{
    public interface IClassificacaoRepository
    {
        List<Classificacoes> Listar();

        void Cadastrar(Classificacoes classificacao);

        Classificacoes BuscarPorId(int id);

        void Atualizar(Classificacoes classificacao);

        void Deletar(int id);
    }
}
