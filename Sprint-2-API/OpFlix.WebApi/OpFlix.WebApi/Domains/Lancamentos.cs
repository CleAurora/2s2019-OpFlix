using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OpFlix.WebApi.Domains
{
    public partial class Lancamentos
    {
        public int IdLancamento { get; set; }
        public string Nome { get; set; }
        public string Sinopse { get; set; }
        public int? Duracao { get; set; }
        [Required]       
        public DateTime DataLancamento { get; set; }
        public int? IdVeiculo { get; set; }
        [Required]
        public int? IdCategoria { get; set; }
        public int? IdClassificacao { get; set; }
        public int? IdTipo { get; set; }

        public Categorias IdCategoriaNavigation { get; set; }
        public Classificacoes IdClassificacaoNavigation { get; set; }
        public Tipos IdTipoNavigation { get; set; }
        public Veiculos IdVeiculoNavigation { get; set; }
        public List<Favoritos> Favoritos { get; set; }
    }
}
