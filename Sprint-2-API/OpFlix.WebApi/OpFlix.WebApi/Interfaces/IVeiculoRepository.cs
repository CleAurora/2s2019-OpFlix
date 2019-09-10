using OpFlix.WebApi.Domains;
using System.Collections.Generic;

namespace OpFlix.WebApi.Interfaces
{
    public interface IVeiculoRepository
    {
        List<Veiculos> Listar();

        void Cadastrar(Veiculos veiculo);

        Veiculos BuscarPorId(int id);

        void Atualizar(Veiculos veiculo);

    }
}
