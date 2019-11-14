using OpFlix.WebApi.Domains;
using System;
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

        List<Lancamentos> BuscarPorData(DateTime data);

        List<Lancamentos> BuscarPorCategoria(int idCategoria);

        List<Lancamentos> BuscarPorVeiculo(int idVeiculo);

        List<Lancamentos> BuscarPorTipo(int idTipo);

        List<Lancamentos> BuscarPorClassificacao(int idClassificacao);



    }
}
