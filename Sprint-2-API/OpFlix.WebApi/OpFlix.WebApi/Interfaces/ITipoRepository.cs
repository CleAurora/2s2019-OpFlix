﻿using OpFlix.WebApi.Domains;
using System.Collections.Generic;

namespace OpFlix.WebApi.Interfaces
{
    public interface ITipoRepository
    {
        List<Tipos> Listar();

        void Cadastrar(Tipos tipo);

        Tipos BuscarPorId(int id);

        void Atualizar(Tipos tipo);

    }
}
