using System;
using System.Collections.Generic;

namespace OpFlix.WebApi.Domains
{
    public partial class Lancamentos
    {
        public int IdLancamento { get; set; }
        public string Nome { get; set; }
        public string Sinopse { get; set; }
        public int? Duracao { get; set; }
        public DateTime DataLancamento { get; set; }
        public int? IdVeiculo { get; set; }
        public int? IdCategoria { get; set; }
        public int? IdClassificacao { get; set; }
        public int? IdTipo { get; set; }

        public Categorias IdCategoriaNavigation { get; set; }
        public Classificacoes IdClassificacaoNavigation { get; set; }
        public Tipos IdTipoNavigation { get; set; }
        public Veiculos IdVeiculoNavigation { get; set; }
    }
}
