using OpFlix.WebApi.Domains;
using OpFlix.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpFlix.WebApi.Repositories
{
    public class CategoriaRepository : ICategoriaRepository
    {
        /// <summary>
        /// Atualiza Categoria
        /// </summary>
        /// <param name="categoria"></param>
        public void Atualizar(Categorias categoria)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                Categorias CategoriaBuscada = ctx.Categorias.FirstOrDefault(item => item.IdCategoria == categoria.IdCategoria);
                CategoriaBuscada.Nome = categoria.Nome;

                ctx.Categorias.Update(CategoriaBuscada);
                ctx.SaveChanges();
            }
        }

        /// <summary>
        /// Busca Categoria por Id
        /// </summary>
        /// <param name="id">IdCategoria</param>
        /// <returns>categoria</returns>
        public Categorias BuscarPorId(int id)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                return ctx.Categorias.FirstOrDefault(item => item.IdCategoria == id);
            }
            
        }

        /// <summary>
        /// Cadastra Categoria
        /// </summary>
        /// <param name="categoria">categoria</param>
        public Categorias Cadastrar(Categorias categoria)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                ctx.Categorias.Add(categoria);
                ctx.SaveChanges();
                return categoria;
            }
        }

        /// <summary>
        /// Deleta Categoria
        /// </summary>
        /// <param name="id">IdCategoria</param>
        public void Deletar(int id)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                Categorias CategoriaBuscada = ctx.Categorias.FirstOrDefault(item => item.IdCategoria == id);

                ctx.Categorias.Remove(CategoriaBuscada);
                ctx.SaveChanges();
            }
        }


        /// <summary>
        /// Lista Categorias
        /// </summary>
        /// <returns>Lista de Catrgorias</returns>
        public List<Categorias> Listar()
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                return ctx.Categorias.ToList();
            }
        }
    }
}
