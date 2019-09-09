﻿using OpFlix.WebApi.Domains;
using OpFlix.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpFlix.WebApi.Repositories
{
    public class TipoRepository : ITipoRepository
    {
        /// <summary>
        /// Atualiza o Tipo de Mídia
        /// </summary>
        /// <param name="tipo">tipo</param>
        public void Atualizar(Tipos tipo)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                Tipos TipoBuscado = ctx.Tipos.FirstOrDefault(item => item.IdTipo == tipo.IdTipo);

                TipoBuscado.Nome = tipo.Nome;

                ctx.Tipos.Update(TipoBuscado);
                ctx.SaveChanges();
            }
        }

        /// <summary>
        /// Busca Tipo de mídia por Id
        /// </summary>
        /// <param name="id">IdTipo</param>
        /// <returns>Tipo de Mídia Buscado</returns>
        public Tipos BuscarPorId(int id)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                return ctx.Tipos.FirstOrDefault(item => item.IdTipo == id);
            }
        }


        /// <summary>
        /// Cadastra Novo Tipo de Mídia
        /// </summary>
        /// <param name="tipo">tipo</param>
        public void Cadastrar(Tipos tipo)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                ctx.Tipos.Add(tipo);
                ctx.SaveChanges();
            }
        }


        /// <summary>
        /// Lista Mídias Cadastradas
        /// </summary>
        /// <returns>Lista de Mídias</returns>
        public List<Tipos> Listar()
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                return ctx.Tipos.ToList();
            }
        }
    }
}
