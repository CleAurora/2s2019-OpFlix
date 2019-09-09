using OpFlix.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpFlix.WebApi.Interfaces
{
    public interface ILancamentoRepository
    {
        List<Lancamentos> Listar();

        void Cadastrar(Lancamentos lancamento);

        Lancamentos BuscarPorId(int id);

        void Atualizar(Lancamentos lancamento);

        void Deletar(int id);
    }
}
