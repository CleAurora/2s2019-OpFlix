using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OpFlix.WebApi.Domains;
using OpFlix.WebApi.Interfaces;
using OpFlix.WebApi.Repositories;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace OpFlix.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class FavoritosController : ControllerBase
    {

        private IFavoritoRepository FavoritoRepository { get; set; }
        private IUsuarioRepository UsuarioRepository { get; set; }
        
        public FavoritosController()
        {
            FavoritoRepository = new FavoritoRepository();
            UsuarioRepository = new UsuarioRepository();
            
        }

        /// <summary>
        /// Chama método que Lista os Favoritos
        /// </summary>
        /// <returns>Lista de Favoritos</returns>
        [HttpGet]
        [Authorize]
        public IActionResult Listar()
        {
            return Ok(FavoritoRepository.Listar());
        }


        /// <summary>
        /// Chama método que cadastra Favorito
        /// </summary>
        /// <param name="favorito">Favorito</param>
        /// <returns>Favorito Cadastrado</returns>
        [HttpPost]
        [Authorize]
        public IActionResult Cadastrar(Favoritos favorito)
        {
            try
            {
                var usuarioId = UsuarioRepository.Cadastrar(favorito.Usuario);
                favorito.Usuario = null;
                favorito.IdUsuario = Convert.ToInt32(HttpContext.User.Claims.First(item => item.Type == JwtRegisteredClaimNames.Jti).Value);
                FavoritoRepository.Cadastrar(favorito);
                return Ok(favorito);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem coisa errada aqui..." + ex.Message });
            }
        }

        /// <summary>
        /// Chama método que deleta Favorito
        /// </summary>
        /// <param name="id">IdLancamento</param>
        /// <returns></returns>
        [HttpDelete("{(id)}")]
        [Authorize]
        public IActionResult Deletar (int id)
        {
            try
            {
                FavoritoRepository.Deletar(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem coisa errada aqui..." + ex.Message });
            }
        }
        

    }
}