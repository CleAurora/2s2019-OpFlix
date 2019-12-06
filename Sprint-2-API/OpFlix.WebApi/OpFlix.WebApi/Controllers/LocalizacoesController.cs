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
    public class LocalizacoesController : ControllerBase
    {
        public ILocalizacaoRepository LocalizacaoRepository { get; set; }
        public LocalizacoesController()
        {
            LocalizacaoRepository = new LocalizacaoRepository();
        }

        [HttpGet]
        public IActionResult ListarTodos()
        {
            try
            {
                return Ok(LocalizacaoRepository.Listar());
            }
            catch (Exception e)
            {
                return BadRequest(new { mensagem = "Oops! Tem erro aqui..." + e.Message });
            }
        }

        [HttpPost]
        public IActionResult Cadastrar(Localizacoes localizacao)
        {
            try
            {
                LocalizacaoRepository.Cadastrar(localizacao);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest( new { mensagem = "Oops! Tem erro aqui..." + e.Message});
            }
        }
    }
}