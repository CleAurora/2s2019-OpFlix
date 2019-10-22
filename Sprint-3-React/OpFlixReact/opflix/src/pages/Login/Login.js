import React, { Component } from 'react';

// imagem
import telaFundo from '../../assets/img/Swisscom_12_17.jpg';

import Axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      senha: ''
    };
  }

  // componentDidMount (){
  //   console.log(bool(localStorage.getItem("isAdmin-opflix")))
  // } 

  atualizaEmail = (event) => {
    this.setState({ email: event.target.value });
  }
  atualizaSenha = (event) => {
    this.setState({ senha: event.target.value });
  }
  mudaParaTelaCadastro = (event) => {
    this.props.history.push('/cadastroUsuario');
  }

  logaUsuario = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:5000/api/login', {
      email: this.state.email,
      senha: this.state.senha,
    })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          console.log(response.data.token);
          localStorage.setItem("usuario-opflix", response.data.token);
          localStorage.setItem("isAdmin-opflix", response.data.isAdmin);

          if (response.data.isAdmin) {
            this.props.history.push('/administrador');
          } else {
            this.props.history.push('/telaDetalhesFilmes')
          }
        } else {
          this.setState({ erro: "E-mail ou senha incorretos.." })
        }
      })
      .catch(erro => {
        console.log(erro)
        this.setState({ erro: "E-mail ou senha incorretos.." })
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
          <div className="cadastroPrincipal">

            <img src={telaFundo} alt="Família vendo tv" className="imgFamiliaFundo" />
            <section className="conteudoPrincipalCadastroUsuarioComum">
              <div className="container">
                <input type="text"
                  placeholder="Digite seu e-mail"
                  onChange={this.atualizaEmail}
                  value={this.state.nome}
                />
                <input type="password"
                  placeholder="Digite sua senha"
                  onChange={this.atualizaSenha}
                  value={this.state.senha}
                />

                <p hidden={this.state.erro === ''}
                  style={{ color: "red", textAlign: "center" }}
                >
                  {this.state.erro}
                </p>

                <button
                  className="conteudoPrincipal-btn"
                  onClick={this.logaUsuario}
                >
                  Login
                </button>
                <button
                  className="conteudoPrincipal-btn"
                  onClick={this.mudaParaTelaCadastro}
                >
                  Não tenho cadastro
                </button>
              </div>
            </section>
            <form action=""></form>
          </div>
        </main>
        <Footer />
      </div>
    );
  };
}

export default Login;