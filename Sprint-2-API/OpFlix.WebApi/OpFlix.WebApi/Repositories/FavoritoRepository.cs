using Microsoft.EntityFrameworkCore;
using OpFlix.WebApi.Domains;
using OpFlix.WebApi.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace OpFlix.WebApi.Repositories
{
    public class FavoritoRepository: IFavoritoRepository
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

        public Favoritos Cadastrar(Favoritos favorito)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                ctx.Favoritos.Add(favorito);
                ctx.SaveChanges();
                return (favorito);
            }
        }

        /// <summary>
        /// Deleta Favorito
        /// </summary>
        /// <param name="id"></param>
        public void Deletar(int id)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                Favoritos FavoritoBuscado = ctx.Favoritos.FirstOrDefault(item => item.IdLancamento == id);
                ctx.Favoritos.Remove(FavoritoBuscado);
                ctx.SaveChanges();
            }
        } 
    }
}
