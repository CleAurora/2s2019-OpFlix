using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OpFlix.WebApi.Domains;
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
        UsuarioRepository UsuarioRepository = new UsuarioRepository();

        [HttpPost]
        public IActionResult Login (LoginViewModel login)
        {
            try
            {


                Usuarios Usuario = UsuarioRepository.BuscarPorEmailESenha(login);
                if (Usuario == null)
                    return NotFound(new { mensagem = "Oops! O E-mail oua senha estão errados! Dá uma chacada aí!" });
                var claims = new[]
                {
                new Claim(JwtRegisteredClaimNames.Email, Usuario.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Usuario.IdUsuario.ToString())
                };

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