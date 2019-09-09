using OpFlix.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
