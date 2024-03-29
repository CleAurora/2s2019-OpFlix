﻿using OpFlix.WebApi.Domains;
using OpFlix.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OpFlix.WebApi.Repositories
{
    public class LancamentoRepository : ILancamentoRepository
    {
        /// <summary>
        /// Atualiza Lancamento
        /// </summary>
        /// <param name="lancamento">Lancamento</param>
        public void Atualizar(Lancamentos lancamento)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                Lancamentos LancamentoBuscado = ctx.Lancamentos.FirstOrDefault(item => item.IdLancamento == lancamento.IdLancamento);
                LancamentoBuscado.Nome = lancamento.Nome;
                LancamentoBuscado.Sinopse = lancamento.Sinopse;
                LancamentoBuscado.Duracao = lancamento.Duracao;
                LancamentoBuscado.DataLancamento = lancamento.DataLancamento;
                LancamentoBuscado.IdVeiculo = lancamento.IdVeiculo;
                LancamentoBuscado.IdCategoria = lancamento.IdCategoria;
                LancamentoBuscado.IdClassificacao = lancamento.IdClassificacao;
                LancamentoBuscado.IdTipo = lancamento.IdTipo;

                ctx.Lancamentos.Update(LancamentoBuscado);
                ctx.SaveChanges();
            }
        }


        /// <summary>
        /// Busca Lancamento por Id
        /// </summary>
        /// <param name="id">IdLancamento</param>
        /// <returns>Lancamento Buscado</returns>
        public Lancamentos BuscarPorId(int id)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                return ctx.Lancamentos.FirstOrDefault(item => item.IdLancamento == id);
            }
        }


        /// <summary>
        /// Cadastra Novo Lancamento
        /// </summary>
        /// <param name="lancamento">Lancamento</param>
        public Lancamentos Cadastrar(Lancamentos lancamento)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                ctx.Lancamentos.Add(lancamento);
                ctx.SaveChanges();
                return lancamento;
            }
        }


        /// <summary>
        /// Deleta Lancamento
        /// </summary>
        /// <param name="id">IdLancamento</param>
        public void Deletar(int id)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                Lancamentos LancamentoBuscado = ctx.Lancamentos.FirstOrDefault(item => item.IdLancamento == id);

                ctx.Lancamentos.Remove(LancamentoBuscado);
                ctx.SaveChanges();
            }
        }


        /// <summary>
        /// Lista Lancamentos Cadastrados
        /// </summary>
        /// <returns>Lista de Lancamento</returns>
        public List<Lancamentos> Listar()
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                return ctx.Lancamentos.ToList();
            }
        }

        /// <summary>
        /// Busca Lancamento por Veículo
        /// </summary>
        /// <param name="id">IdVeículo</param>
        /// <returns>Lancamentos Buscados</returns>
        public List<Lancamentos> BuscarPorIdVeiculo(int id)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                return ctx.Lancamentos.Where(item => item.IdVeiculo == id).ToList();
            }
        }

        /// <summary>
        /// Busca Lançamento por Data de Lançamento
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public List<Lancamentos> BuscarPorData(DateTime data)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                return ctx.Lancamentos.Where(item => item.DataLancamento == data).ToList();
            }
        }

        /// <summary>
        /// Filtro que busca Lançamento por Categoria
        /// </summary>
        /// <param name="idCategoria"></param>
        /// <returns></returns>
        List<Lancamentos> ILancamentoRepository.BuscarPorCategoria(int idCategoria)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                return ctx.Lancamentos.Where(item => item.IdCategoria == idCategoria).ToList();
            }
        }

        /// <summary>
        /// Filtro que busca Lançamento por Veículo
        /// </summary>
        /// <param name="idVeiculo"></param>
        /// <returns></returns>
        public List<Lancamentos> BuscarPorVeiculo(int idVeiculo)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                return ctx.Lancamentos.Where(item => item.IdVeiculo == idVeiculo).ToList();
            }
        }

        /// <summary>
        /// Filtro que busca Lançamento por Tipo de Mídia
        /// </summary>
        /// <param name="idTipo"></param>
        /// <returns></returns>
        public List<Lancamentos> BuscarPorTipo(int idTipo)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                return ctx.Lancamentos.Where(item => item.IdTipo == idTipo).ToList();
            }
        }

        /// <summary>
        /// Filtro que busca Lançamento por Classificação
        /// </summary>
        /// <param name="idClassificacao"></param>
        /// <returns></returns>
        public List<Lancamentos> BuscarPorClassificacao(int idClassificacao)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                return ctx.Lancamentos.Where(item => item.IdClassificacao == idClassificacao).ToList();
            }

        }

        //veiculação, mídia e plataforma, categoria



    }
}
