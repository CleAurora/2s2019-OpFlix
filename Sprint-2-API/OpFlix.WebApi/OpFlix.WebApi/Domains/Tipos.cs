using System;
using System.Collections.Generic;

namespace OpFlix.WebApi.Domains
{
    public partial class Tipos
    {
        public Tipos()
        {
            Lancamentos = new HashSet<Lancamentos>();
        }

        public int IdTipo { get; set; }
        public string Nome { get; set; }

        public ICollection<Lancamentos> Lancamentos { get; set; }
    }
}
