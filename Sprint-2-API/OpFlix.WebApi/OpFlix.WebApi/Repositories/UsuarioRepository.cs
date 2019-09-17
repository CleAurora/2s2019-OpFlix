using Microsoft.EntityFrameworkCore;
using OpFlix.WebApi.Domains;
using OpFlix.WebApi.Interfaces;
using OpFlix.WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace OpFlix.WebApi.Repositories
{
    public class UsuarioRepository: IUsuarioRepository
    {
       

        /// <summary>
        /// Método que busca Usuário por e-mail e senha
        /// </summary>
        /// <param name="login">login</param>
        /// <returns>Usuário Buscado</returns>
        public Usuarios BuscarPorEmailESenha(LoginViewModel login)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                Usuarios UsuarioBuscado = ctx.Usuarios.Include(x => x.IdPerfilNavigation).FirstOrDefault(item => item.Email == login.Email && item.Senha == login.Senha);

                if (UsuarioBuscado == null)
                {
                    return null;
                }
                return UsuarioBuscado;
            }
        }

        /// <summary>
        /// Método que busca usuário por id
        /// </summary>
        /// <param name="id">IdUsuario</param>
        /// <returns>UsuárioBuscado</returns>
        public Usuarios BuscarPorId(int id)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                return ctx.Usuarios.FirstOrDefault(item => item.IdUsuario == id);
            }
        }

        /// <summary>
        /// Atualiza novo Usuário
        /// </summary>
        /// <param name="usuario">Usuário
        /// </param>
        public void Atualizar(Usuarios usuario)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                Usuarios UsuarioBuscado = ctx.Usuarios.FirstOrDefault(item => item.IdUsuario == usuario.IdUsuario);

                UsuarioBuscado.Nome = usuario.Nome;
                UsuarioBuscado.Email = usuario.Email;
                UsuarioBuscado.Senha = usuario.Senha;
                UsuarioBuscado.Celular = usuario.Celular;
                UsuarioBuscado.Endereco = usuario.Endereco;
                UsuarioBuscado.IdPerfil = usuario.IdPerfil;

                ctx.Usuarios.Update(UsuarioBuscado);
                ctx.SaveChanges();
            }
        }

        /// <summary>
        /// Cadastra Novo Usuário
        /// </summary>
        /// <param name="usuario"></param>
        public Usuarios Cadastrar(Usuarios usuario)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                ctx.Usuarios.Add(usuario);
                ctx.SaveChanges();
                return usuario;
            }
        }


        /// <summary>
        /// Deleta o usuário já cadastrado
        /// </summary>
        /// <param name="id">IdUsuario</param>
        public void Deletar(int id)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                Usuarios UsuarioBuscado = ctx.Usuarios.FirstOrDefault(item => item.IdUsuario == id);
                ctx.Usuarios.Remove(UsuarioBuscado);
                ctx.SaveChanges();
            }
        }


        /// <summary>
        /// Lista Usuários Cadastrados
        /// </summary>
        /// <returns>Lista de Usuários</returns>
        public List<Usuarios> Listar()
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                return ctx.Usuarios.ToList();
            }
        }

        /// <summary>
        /// Para hashear a senha
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string HashValue(string value)
        {
            UnicodeEncoding encoding = new UnicodeEncoding();
            byte[] hashBytes;
            using (HashAlgorithm hash = SHA1.Create())
                hashBytes = hash.ComputeHash(encoding.GetBytes(value));

            StringBuilder hashValue = new StringBuilder(hashBytes.Length * 2);
            foreach (byte b in hashBytes)
            {
                hashValue.AppendFormat(CultureInfo.InvariantCulture, "{0:X2}", b);
            }

            return hashValue.ToString();
        }



    }
}
