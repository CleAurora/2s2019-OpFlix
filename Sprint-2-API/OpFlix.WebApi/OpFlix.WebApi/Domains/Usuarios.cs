using System;
using System.Collections.Generic;

namespace OpFlix.WebApi.Domains
{
    public partial class Usuarios
    {
        public int IdUsuario { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Celular { get; set; }
        public string Endereco { get; set; }
        public int? IdPerfil { get; set; }

        public Perfis IdPerfilNavigation { get; set; }
    }
}
