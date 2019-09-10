using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OpFlix.WebApi.Domains;
using OpFlix.WebApi.Interfaces;
using OpFlix.WebApi.Repositories;

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
        }

        /// <summary>
        /// Chama método que lista Lançcamentos
        /// </summary>
        /// <returns></returns>
        [HttpGet]
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

        
    }
}