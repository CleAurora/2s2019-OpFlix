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
    public class TiposController : ControllerBase
    {

        /// <summary>
        /// Instancia interface e Repositório dos tipos de mídia
        /// </summary>
        private ITipoRepository TipoRepository { get; set; }

        public TiposController()
        {
            TipoRepository = new TipoRepository();
        }


        /// <summary>
        /// Chama método que lista tipos de mídia
        /// </summary>
        /// <returns>Lista de Tipos de Mídia</returns>
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(TipoRepository.Listar());
        }


        /// <summary>
        /// Chama método que busca tipo de mídia por id
        /// </summary>
        /// <param name="id">id</param>
        /// <returns>Tipo de Mídia buscado</returns>
        [HttpGet("{id}")]
        public IActionResult BuscarPorId(int id)
        {
            try
            {
                Tipos tipo = TipoRepository.BuscarPorId(id);
                if (tipo == null)
                    return NotFound();
                return Ok(tipo);
            }
            catch(Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem erro aqui... " + ex.Message });
            }
        }


        /// <summary>
        /// Chama método para cadastrar novo tipo de mídia
        /// </summary>
        /// <param name="id">id</param>
        [HttpPost]
        public IActionResult Cadastrar(Tipos tipo)
        {
            try
            {
                TipoRepository.Cadastrar(tipo);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem erro aqui... " + ex.Message });
            }
        }


        /// <summary>
        /// Chama método que atualiza tipo de mídia
        /// </summary>
        /// <param name="id">id</param>
        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Tipos tipo)
        {
            try
            {
                Tipos TipoBuscado = TipoRepository.BuscarPorId(id);

                if (TipoBuscado == null)
                    return NotFound();

                TipoBuscado.IdTipo = TipoBuscado.IdTipo;
                TipoRepository.Atualizar(tipo);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem erro aqui... " + ex.Message });
            }
        }

    }
}