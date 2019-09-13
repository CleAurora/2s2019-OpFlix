using OpFlix.WebApi.Domains;
using System.Collections.Generic;

namespace OpFlix.WebApi.Interfaces
{
    public interface ILancamentoRepository
    {
        List<Lancamentos> Listar();

        Lancamentos Cadastrar(Lancamentos lancamento);

        Lancamentos BuscarPorId(int id);

        void Atualizar(Lancamentos lancamento);

        void Deletar(int id);

        List<Lancamentos> BuscarPorIdVeiculo(int id);
    }
}
