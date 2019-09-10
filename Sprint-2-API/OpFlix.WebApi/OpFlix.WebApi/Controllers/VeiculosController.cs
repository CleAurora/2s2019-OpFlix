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
    public class VeiculosController : ControllerBase
    {
        /// <summary>
        /// Instancia Interface e Repositório de Veículos
        /// </summary>
        private IVeiculoRepository VeiculoRepository { get; set; }

        public VeiculosController()
        {
            VeiculoRepository = new VeiculoRepository();
        }
    

        /// <summary>
        /// Lista Veículos
        /// </summary>
        /// <returns>Lista de Veículos</returns>
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(VeiculoRepository.Listar());
        }


        /// <summary>
        /// Chama método de Buscar Veículo por Id
        /// </summary>
        /// <param name="id">IdVeículo</param>
        /// <returns>Veículo Buscado</returns>
        [HttpGet("{id}")]
        public IActionResult BuscarPorId(int id)
        {
            try
            {
                Veiculos veiculo = VeiculoRepository.BuscarPorId(id);
                if (veiculo == null)
                    return NotFound();
                return Ok();

            }
            catch(Exception ex)
            {
                return BadRequest(new { mensagem = "Oops... Tem coisa errada aqui" + ex.Message });
            }
        }


        /// <summary>
        /// Chama método de Cadastro
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Cadastrar(Veiculos veiculo)
        {
            try
            {
                //int UsuarioId = Convert.ToInt32 (HttpContext.User.Claims.First(item => item.Type == JwtRegisteredClaimNames.Jti).Value);

                VeiculoRepository.Cadastrar(veiculo);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops... Tem coisa errada aqui" + ex.Message });
            }
        }

        /// <summary>
        /// Chama método que atualiza Veículo
        /// </summary>
        /// <param name="id"></param>
        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Veiculos veiculo)
        {
            try
            {
                Veiculos VeiculoBuscado = VeiculoRepository.BuscarPorId(id);
                if (VeiculoBuscado == null)
                    return NotFound();

                veiculo.IdVeiculo = VeiculoBuscado.IdVeiculo;
                VeiculoRepository.Atualizar(veiculo);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops... Tem coisa errada aqui" + ex.Message });
            }
        }


    }
}