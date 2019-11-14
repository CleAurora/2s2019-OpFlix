using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpFlix.WebApi.Domains;
using OpFlix.WebApi.Interfaces;
using OpFlix.WebApi.Repositories;
using System;

namespace OpFlix.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class LancamentosController : ControllerBase
    {
        private ILancamentoRepository LancamentoRepository { get; set; }
        private IUsuarioRepository UsuarioRepository { get; set; }

        public LancamentosController()
        {
            LancamentoRepository = new LancamentoRepository();
            //UsuarioRepository = new UsuarioRepository();
        }

        /// <summary>
        /// Chama método que lista Lançamentos
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize]
        public IActionResult Listar()
        {
            return Ok(LancamentoRepository.Listar());
        }

        /// <summary>
        /// Chama Método de Buscar Lançamento por Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [Authorize]
        public IActionResult BuscaPorId(int id)
        {
            try
            {
                Lancamentos lancamento = LancamentoRepository.BuscarPorId(id);
                if (lancamento == null)
                    return NotFound();
                return Ok(lancamento);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem erro aqui... " + ex.Message });
            }
        }


        /// <summary>
        /// Chama método que cadastra Novo Lançamento
        /// </summary>
        /// <param name="lancamento">Lançamento</param>
        /// <returns>Lançamento Cadastrado</returns>
        [HttpPost]
        [Authorize(Roles = "Administrador")]
        public IActionResult Cadastrar(Lancamentos lancamento)
        {
            try
            {
                LancamentoRepository.Cadastrar(lancamento);
                return Ok(lancamento);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem erro aqui... " + ex.Message });
            }
        }


        /// <summary>
        /// Chama método que atualiza novo Lançamento
        /// </summary>
        /// <param name="id">IdLançamento</param>
        /// <param name="lancamento">Lançamento</param>
        [HttpPut("{id}")]
        [Authorize(Roles = "Administrador")]
        public IActionResult Atualizar(int id, Lancamentos lancamento)
        {
            try
            {
                Lancamentos LancamentoBuscado = LancamentoRepository.BuscarPorId(id);
                if (LancamentoBuscado == null)
                    return NotFound();

                lancamento.IdLancamento = LancamentoBuscado.IdLancamento;
                LancamentoRepository.Atualizar(lancamento);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem erro aqui... " + ex.Message });
            }
        }


        /// <summary>
        /// Chama método que deleta Lançamento que já estava cadastrado
        /// </summary>
        /// <param name="id">id</param>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrador")]
        public IActionResult Deletar(int id)
        {
            try
            {
                LancamentoRepository.Deletar(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem erro aqui... " + ex.Message });
            }
        }

        /// <summary>
        /// Chama Método de Buscar Lançamento por Veículo
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Veículos Buscados</returns>
        [HttpGet("BuscaPorId{id}")]
        [Authorize]
        public IActionResult BuscaPorIdVeiculo(int id)
        {
            try
            {
                return Ok(LancamentoRepository.BuscarPorIdVeiculo(id));
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem erro aqui... " + ex.Message });
            }
        }

        /// <summary>
        /// Chama método que Busca por Data
        /// </summary>
        /// <param name="data">Data de Lançamento</param>
        /// <returns>Lançamento</returns>
        [HttpGet("BuscaPorData{data}")]
        [Authorize]
        public IActionResult BuscarPorData(DateTime data)
        {
            try
            {
                return Ok(LancamentoRepository.BuscarPorData(data));
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem erro aqui... " + ex.Message });
            }
        }

        /// <summary>
        /// Chama método que filtra por categoria
        /// </summary>
        /// <param name="idCategoria"></param>
        /// <returns></returns>
        [HttpGet("BuscaPorCategoria{idcategoria}")]
        [Authorize]
        public IActionResult BuscarPorCategoria(int idCategoria)
        {
            try
            {
                return Ok(LancamentoRepository.BuscarPorCategoria(idCategoria));
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem erro aqui... " + ex.Message });
            }
        }

        /// <summary>
        /// Chama método que filtra por tipo de entretenimento
        /// </summary>
        /// <param name="idTipo"></param>
        /// <returns></returns>
        [HttpGet("BuscaPorTipo{tipo}")]
        [Authorize]
        public IActionResult BuscarPorTipo(int idTipo)
        {
            try
            {
                return Ok(LancamentoRepository.BuscarPorTipo(idTipo));
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem erro aqui... " + ex.Message });
            }
        }

        /// <summary>
        /// Chama método que filtra por veículo de comunicação
        /// </summary>
        /// <param name="idVeiculo"></param>
        /// <returns></returns>
        [HttpGet("BuscaPorVeiculo{idVeiculo}")]
        [Authorize]
        public IActionResult BuscarPorVeiculo(int idVeiculo)
        {
            try
            {
                return Ok(LancamentoRepository.BuscarPorIdVeiculo(idVeiculo));
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem erro aqui... " + ex.Message });
            }
        }

        /// <summary>
        /// Chama método que filtra por Classificação indicativa
        /// </summary>
        /// <param name="idClassificacao"></param>
        /// <returns></returns>
        [HttpGet("BuscaPorClassificacao{idClassificacao}")]
        [Authorize]
        public IActionResult BuscarPorClassificacao(int idClassificacao)
        {
            try
            {
                return Ok(LancamentoRepository.BuscarPorClassificacao(idClassificacao));
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem erro aqui... " + ex.Message });
            }
        }

    }
}