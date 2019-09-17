using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
    public class UsuariosController : ControllerBase
    {

        public IUsuarioRepository UsuarioRepository { get; set; }
        
        public UsuariosController()
        {
            UsuarioRepository = new UsuarioRepository();
        }


        /// <summary>
        /// Chama método para listar Usuário
        /// </summary>
        /// <returns>Lista de Usuários</returns>
        [Authorize(Roles = "Administrador")]
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(UsuarioRepository.Listar());
        }


        /// <summary>
        /// Chama método para buscar Usuário por Id
        /// </summary>
        /// <param name="id">IdUsuário</param>
        /// <returns>Lista de Usuários</returns>
        [HttpGet("{id}")]
        [Authorize(Roles = "Administrador")]
        public IActionResult BuscarPorId (int id)
        {
            try
            {
                Usuarios usuario = UsuarioRepository.BuscarPorId(id);
                if (usuario == null)
                    return NotFound();
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem erro aqui! " + ex.Message });
            }
        }

        /// <summary>
        /// Chama método para Cadastrar Usuário a ser cadastrado como comum, livre!
        /// </summary>
        /// <param name="id">IdUsuário</param>
        /// <returns>Usuário Cadastrado</returns>
        [HttpPost("CadastrarCliente")]
        public IActionResult CadastrarCliente(Usuarios usuario)
        {
            try
            {
                usuario.IdPerfil = 2;
                UsuarioRepository.Cadastrar(usuario);
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem erro aqui! " + ex.Message });
            }
        }

        /// <summary>
        /// Chama método para Cadastrar Usuário a ser cadastrado!
        /// </summary>
        /// <param name="id">IdUsuário</param>
        /// <returns>Usuário Cadastrado</returns>
        [HttpPost]
        [Authorize(Roles = "Administrador")]
        public IActionResult Cadastrar(Usuarios usuario)
        {
            try
            {
                UsuarioRepository.Cadastrar(usuario);
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem erro aqui! " + ex.Message });
            }
        }

        /// <summary>
        /// Atualiza Usuário Cadastrado
        /// </summary>
        /// <param name="id">IdUsuario</param>
        [HttpPut("{id}")]
        [Authorize(Roles = "Administrador")]
        public IActionResult Atualizar(int id, Usuarios usuario)
        {
            try
            {
                Usuarios UsuarioBuscado = UsuarioRepository.BuscarPorId(id);
                if (UsuarioBuscado == null)
                    return NotFound();

                usuario.IdUsuario = UsuarioBuscado.IdUsuario;
                UsuarioRepository.Atualizar(usuario);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem erro aqui! " + ex.Message });
            }
        }


        /// <summary>
        /// Deleta Usuário cadastrado
        /// </summary>
        /// <param name="id">IdUsuário</param>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrador")]
        public IActionResult Deletar(int id)
        {
            try
            {
                UsuarioRepository.Deletar(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem erro aqui! " + ex.Message });
            }
        }

        //usuarioDS.USUARIO[0].DESSEN = Util.HashValue(this.txtSenha.Text.Trim());


    }
}