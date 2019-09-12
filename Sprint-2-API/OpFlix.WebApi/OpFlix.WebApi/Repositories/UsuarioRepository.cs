using Microsoft.EntityFrameworkCore;
using OpFlix.WebApi.Domains;
using OpFlix.WebApi.Interfaces;
using OpFlix.WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpFlix.WebApi.Repositories
{
    public class UsuarioRepository: IUsuarioRepository
    {
        public void Atualizar(Usuarios usuario)
        {
            throw new NotImplementedException();
        }

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

        public Usuarios BuscarPorId(int id)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Cadastra novo Usuário
        /// </summary>
        /// <param name="usuario">usuario</param>
        /// <returns>Id do Usuário Cadastrado</returns>
        public int Cadastrar(Usuarios usuario)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                ctx.Usuarios.Add(usuario);
                ctx.SaveChanges();

                return usuario.IdUsuario;
            }
        }

        public void Deletar(int id)
        {
            throw new NotImplementedException();
        }

        public List<Usuarios> Listar()
        {
            throw new NotImplementedException();
        }

        void IUsuarioRepository.Cadastrar(Usuarios usuario)
        {
            throw new NotImplementedException();
        }
    }
}
