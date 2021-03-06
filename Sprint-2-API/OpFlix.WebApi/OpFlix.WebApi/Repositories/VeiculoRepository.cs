﻿using OpFlix.WebApi.Domains;
using OpFlix.WebApi.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace OpFlix.WebApi.Repositories
{
    public class VeiculoRepository : IVeiculoRepository
    {
        /// <summary>
        /// Atualiza o veículo de comunicação (plataforma ou meio)
        /// </summary>
        /// <param name="veiculo">veiculo</param>
        public void Atualizar(Veiculos veiculo)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                Veiculos veiculoBuscado = ctx.Veiculos.FirstOrDefault(item => item.IdVeiculo == veiculo.IdVeiculo);

                veiculoBuscado.Nome = veiculo.Nome;

                ctx.Veiculos.Update(veiculoBuscado);
                ctx.SaveChanges();
            }
        }

        /// <summary>
        /// Busca Veículo de comunicação pelo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Veículo Buscado pelo Id</returns>
        public Veiculos BuscarPorId(int id)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                return ctx.Veiculos.FirstOrDefault(item => item.IdVeiculo == id);
            }
        }

        /// <summary>
        /// Cadastra novo veículo de comunicação 
        /// </summary>
        /// <param name="veiculo">veículo</param>
        public Veiculos Cadastrar(Veiculos veiculo)
        {
            using (OpFlixContext ctx =  new OpFlixContext())
            {
                ctx.Veiculos.Add(veiculo);
                ctx.SaveChanges();
                return veiculo;
            }
        }

        /// <summary>
        /// Lista veículos de comunicação cadastrados
        /// </summary>
        /// <returns>Lista de veículos</returns>
        public List<Veiculos> Listar()
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                return ctx.Veiculos.ToList();
            }
        }

        /// <summary>
        /// Deleta Veículo
        /// </summary>
        /// <param name="id">IdVeiculo</param>
        public void Deletar(int id)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                Veiculos VeiculoBuscado = ctx.Veiculos.FirstOrDefault(item => item.IdVeiculo == id);

                ctx.Veiculos.Remove(VeiculoBuscado);
                ctx.SaveChanges();
            }
        }


    }
}
