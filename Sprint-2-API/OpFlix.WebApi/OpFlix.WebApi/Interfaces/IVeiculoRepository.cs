using OpFlix.WebApi.Domains;
using System.Collections.Generic;

namespace OpFlix.WebApi.Interfaces
{
    public interface IVeiculoRepository
    {
        List<Veiculos> Listar();

        Veiculos Cadastrar(Veiculos veiculo);

        Veiculos BuscarPorId(int id);

        void Atualizar(Veiculos veiculo);

        void Deletar(int veiculo);

    }
}
