import React, { Component } from 'react';

//imagem
import telaFundo from '../../assets/img/Swisscom_12_17.jpg';

import Axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class Administrador extends Component {
  constructor() {
    super();
    this.state = {
      lista: [],
    };
  }

  componentDidMount() {
    Axios.get('http://localhost:5000/api/usuario')
      .then(data => {
        this.setState({ lista: data.data });
      })
      .catch(erro => {
        console.log(erro);
      });
  }

  logout = (event) =>{
    localStorage.removeItem("usuario-opflix");
    localStorage.removeItem("isAdmin-opflix");
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <Header funcao={this.logout}/>
        <main className="conteudoPrincipal">
          <section className="conteudoPrincipalAdministrador">
            <div className="containerAdmin" >
              <select id="option__acessolivre">
                <option value="Selecione">Selecione</option>
                <option value="Usuários" onClick={this.listaUsuarios} >Usuários</option>
                <option value="Tipo" onClick={this.listaTipo}>Tipo</option>
                <option value="Categoria" onClick={this.listaCategoria} >Categoria</option>
                <option value="Veículo" onClick={this.listaVeiculo}>Veículo</option>
                <option value="Lancamentos" onClick={this.listaLancamentos}>Lançamentos</option>
              </select>
              <button className="conteudoPrincipal-btn">Cadastrar</button>
              <button className="conteudoPrincipal-btn">Listar</button>
            </div>
          </section>
          <img src={telaFundo} alt="Família vendo tv" className="telaFundo" />
          <form action=""></form>


          {/* tabela Usuario*/}
          <table id="tabela-lista">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Senha</th>
                <th>Celular</th>
                <th>Endereço</th>
                <th>Perfil</th>
              </tr>
            </thead>
            <tbody id="tabela-lista-corpo">
              {
                this.state.lista.map(element => {
                  return (
                    <tr>
                      <td>{element.idUsuario}</td>
                      <td>{element.nome}</td>
                      <td>{element.email}</td>
                      <td>{element.senha}</td>
                      <td>{element.celular}</td>
                      <td>{element.endereco}</td>
                      <td>{element.idPerfilNavigation.nome}</td>

                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          {/* Formulário para cadastrar Usuário */}
          <input type="text"
            placeholder="Digite seu nome"
            onChange={this.atualizaNome}
            value={this.state.nome}
          />
          <input type="text"
            placeholder="Digite seu e-mail"
            onChange={this.atualizaEmail}
            value={this.state.email}
          />
          <input type="password"
            placeholder="Digite sua senha"
            onChange={this.atualizaSenha}
            value={this.state.senha}
          />
          <input type="text"
            placeholder="Digite seu celular"
            onChange={this.atualizaCelular}
            value={this.state.celular}
          />
          <input type="text"
            placeholder="Digite seu endereço"
            onChange={this.atualizaEndereco}
            value={this.state.endereco}
          />
          <select id="option__acessolivre">
            <option value="Selecione">Selecione</option>
            <option value="Administrador">Administrador</option>
            <option value="Usuário">Usuário</option>
          </select>

          <p hidden={this.state.erro === ''}
            style={{ color: "red", textAlign: "center" }}
          >
            {this.state.erro}
          </p>

          <button
            className="conteudoPrincipal-btn"
            onClick={this.cadastraInformacoes}
          >
            Cadastrar
          </button>

        </main>
        <Footer />
      </div>
    );
  };
}

export default Administrador;