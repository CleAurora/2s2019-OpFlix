using System;
using System.Collections.Generic;

namespace OpFlix.WebApi.Domains
{
    public partial class Classificacoes
    {
        public Classificacoes()
        {
            Lancamentos = new HashSet<Lancamentos>();
        }

        public int IdClassificacao { get; set; }
        public string Nome { get; set; }

        public ICollection<Lancamentos> Lancamentos { get; set; }
    }
}
