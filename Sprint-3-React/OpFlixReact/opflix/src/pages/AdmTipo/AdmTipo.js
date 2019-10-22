import React, { Component } from 'react';

//imagem
import telaFundo from '../../assets/img/Swisscom_12_17.jpg';

import Axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class AdmTipo extends Component {
  constructor() {
    super();
    this.state = {
      lista: [],
      nome: ''
    };
  }

  atualizaNome = (event) => {
    this.setState({ nome: event.target.value });
  }

  listaTipo = (event) =>{
    event.preventDefault();
    Axios.get('http://localhost:5000/api/tipos', {
      headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }
    })
    .then(resposta => {
      if(resposta.status === 200){
        let response = resposta.data;
        this.setState({
          lista: response
        })
      }else{
        this.setState({erro: "Oops!"})
      }
    })
    .catch(erro =>{
      this.setState({erro: "Oops!"})
    });
  }

  mudaParaTelaAdministrador = (event) =>{
    this.props.history.push('/administrador');
  }

  cadastraInformacoes = (event) =>{
    event.preventDefault();
    Axios.post('http://localhost:5000/api/tipos', {
      nome: this.state.nome,
    }, 
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }
    })
    .then(response => {
      if (response.status === 200) {
        this.setState({ nome: '' });
      } else {
        this.setState({erro: "Oops!"})
      }
    })
    .catch(error => this.setState({erro: "Oops!"})) 
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
            <h2>Tipo</h2>
            <div className="containerAdmin" >
              <button className="conteudoPrincipal-btn" onClick={this.listaTipo}>Listar</button>
              <button className="conteudoPrincipal-btn" onClick={this.mudaParaTelaAdministrador}>Voltar</button>
            </div>
          </section>

          {/* tabela Tipo*/}
          <table id="tabela-lista">
            <thead>
              <tr>
                <th>#</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody id="tabela-lista-corpo">
              {
                this.state.lista.map(element => {
                  return (
                    <tr key={element.idTipo}>
                      <td>{element.idTipo}</td>
                      <td>{element.nome}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          <div className="container">
          <input type="text"
            placeholder="Digite o tipo"
            onChange={this.atualizaNome}
            value={this.state.nome}
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
          </div>

          <img src={telaFundo} alt="Família vendo tv" className="telaFundo" />
        </main>
        <Footer />
      </div>
    );
  };
}

export default AdmTipo;