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
    public class CategoriasController : ControllerBase
    {
        /// <summary>
        /// Instancia Interface e Repositório de Categoria 
        /// </summary>
        public ICategoriaRepository CategoriaRepository { get; set; }

        public CategoriasController()
        {
            CategoriaRepository = new CategoriaRepository();
        }

        /// <summary>
        /// Chama método que lista categorias
        /// </summary>
        /// <returns>Lista de Categorias</returns>
        [Authorize]
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(CategoriaRepository.Listar());
        }


        /// <summary>
        /// Busca Categoria por Id
        /// </summary>
        /// <param name="id">id</param>
        /// <returns>Categoria Buscada</returns>
        [HttpGet("{id}")]
        [Authorize]
        public IActionResult BuscarPorId(int id)
        {
            try
            {
                Categorias categoria = CategoriaRepository.BuscarPorId(id);
                if (categoria == null)
                    return NotFound();
                return Ok(categoria);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops... Tem coisa errada aqui..." + ex.Message });
            }
        }


        /// <summary>
        /// Cadastra nova Categoria
        /// </summary>
        /// <param name="categoria"></param>
        /// <returns>Categoria Cadastrada</returns>
        [HttpPost]
        [Authorize(Roles = "Administrador")]
        public IActionResult Cadastrar(Categorias categoria)
        {
            try
            {
                CategoriaRepository.Cadastrar(categoria);
                return Ok(categoria);
            }
            catch(Exception ex)
            {
                return BadRequest(new { mensagem = "Oops... Tem coisa errada aqui..." + ex.Message });
            }
        }


        /// <summary>
        /// Atualiza Categoria cadastrada
        /// </summary>
        /// <param name="id">id</param>
        /// <param name="categoria"></param>
        [HttpPut("{id}")]
        [Authorize(Roles = "Administrador")]
        public IActionResult Atualizar(int id, Categorias categoria)
        {
            try
            {
                Categorias categoriaBuscada = CategoriaRepository.BuscarPorId(id);
                if (categoriaBuscada == null)
                    return NotFound();

                categoria.IdCategoria = categoriaBuscada.IdCategoria;
                CategoriaRepository.Atualizar(categoria);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops... Tem coisa errada aqui..." + ex.Message });
            }
        }

        /// <summary>
        /// Chama método que deleta Categoria que já estava cadastrada
        /// </summary>
        /// <param name="id">idCategoria</param>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrador")]
        public IActionResult Deletar(int id)
        {
            try
            {
                CategoriaRepository.Deletar(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem erro aqui... " + ex.Message });
            }
        }

    }
}