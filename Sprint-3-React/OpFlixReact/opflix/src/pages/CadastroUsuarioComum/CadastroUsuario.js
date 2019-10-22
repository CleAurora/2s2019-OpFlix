import React, { Component } from 'react';

//imagem 
import telaFundo from '../../assets/img/Swisscom_12_17.jpg';

import Axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class CadastroUsuario extends Component {

  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      senha: '',
      celular: '',
      endereco: '',
      erro: ''
    };
  }
  
  atualizaNome = (event) => {
    this.setState({ nome: event.target.value });
  }

  atualizaEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  atualizaSenha = (event) => {
    this.setState({ senha: event.target.value });
  }

  atualizaCelular = (event) => {
    this.setState({ celular: event.target.value });
  }

  atualizaEndereco = (event) => {
    this.setState({ endereco: event.target.value });
  }

  mudaParaTelaLogin = (event) => {
    this.props.history.push('/login');
  }


  cadastraInformacoes = (event) => {
    event.preventDefault();
    console.log('olá', this.state);
    Axios.post('http://localhost:5000/api/usuarios/CadastrarCliente', {
      nome: this.state.nome,
      email: this.state.email,
      senha: this.state.senha,
      celular: this.state.celular,
      endereco: this.state.endereco
    })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          this.props.history.push('/login')
        } else {
          this.setState({ erro: "Oops! Algo está errado... " })
        }
      })
      .catch(erro => {
        console.log(erro)
        this.setState({ erro: "Todos os campos são obrigatórios! " })
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
        <Header history={this.props.history}/>
        <main className="conteudoPrincipal">
          <div className="cadastroPrincipal">

            <img src={telaFundo} alt="Família vendo tv" className="imgFamiliaFundo" />
            <section className="conteudoPrincipalCadastroUsuarioComum">
              <div className="container">
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

                <button
                  className="conteudoPrincipal-btn"
                  onClick={this.mudaParaTelaLogin}
                >
                  Já sou cadastrado
                  </button>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  };
}

export default CadastroUsuario;