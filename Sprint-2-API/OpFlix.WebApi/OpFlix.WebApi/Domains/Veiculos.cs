using System;
using System.Collections.Generic;

namespace OpFlix.WebApi.Domains
{
    public partial class Veiculos
    {
        public Veiculos()
        {
            Lancamentos = new HashSet<Lancamentos>();
        }

        public int IdVeiculo { get; set; }
        public string Nome { get; set; }

        public ICollection<Lancamentos> Lancamentos { get; set; }
    }
}
