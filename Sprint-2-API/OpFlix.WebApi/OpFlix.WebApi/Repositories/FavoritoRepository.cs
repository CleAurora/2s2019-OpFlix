using Microsoft.EntityFrameworkCore;
using OpFlix.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpFlix.WebApi.Repositories
{
    public class FavoritoRepository
    {
        /// <summary>
        /// Método para listar Favoritos
        /// </summary>
        /// <returns>Lista de Favoritos</returns>
        public List<Favoritos> Listar()
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                return ctx.Favoritos.Include(x => x.Lancamento).Include(x => x.Usuario).ToList();
            }
        }
    }
}
