using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OpFlix.WebApi.Domains;
using OpFlix.WebApi.Interfaces;
using OpFlix.WebApi.Repositories;
using OpFlix.WebApi.ViewModels;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace OpFlix.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public IUsuarioRepository UsuarioRepository { get; set; }

        public LoginController()
        {
            UsuarioRepository = new UsuarioRepository();
        }


        /// <summary>
        /// Método para realizar o login e gerar o token
        /// </summary>
        /// <param name="login">login</param>
        [HttpPost]
        public IActionResult Login (LoginViewModel login)
        {
            try
            {


                Usuarios UsuarioBuscado = UsuarioRepository.BuscarPorEmailESenha(login);
                if (UsuarioBuscado == null)
                    return NotFound(new { mensagem = "Oops! O E-mail oua senha estão errados! Dá uma checada aí!" });

                //Pego informações referente ao usuário
                var claims = new[]
                {
                new Claim(JwtRegisteredClaimNames.Email, UsuarioBuscado.Email),
                new Claim(JwtRegisteredClaimNames.Jti, UsuarioBuscado.IdUsuario.ToString()),
                new Claim(ClaimTypes.Role, UsuarioBuscado.IdPerfilNavigation.Nome.ToString())
                };

                //Gera segurança e token
                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("opflix-chave-autenticacao"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "OpFlix.WebApi",
                    audience: "OpFlix.WebApi",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(50),
                    signingCredentials: creds);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { mensagem = "Oops! Tem algo errado aqui..." + ex.Message });
            }
        }
    }
}