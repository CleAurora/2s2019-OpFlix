import React, { Component } from 'react';

//imagem
import telaFundo from '../../assets/img/Swisscom_12_17.jpg';

import Axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class AdmVeiculo extends Component {
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

  listaveiculo = (event) =>{
    event.preventDefault();
    Axios.get('http://localhost:5000/api/veiculos', {
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }})
    .then(resposta => {
      if(resposta.status === 200){ 
        let response = resposta.data;
        this.setState({
          lista: response
        })
      }else{
        this.setState({ erro: "Oops! Tem erro.."})
      }
    })
    .catch(erro =>{
      this.setState({ erro: "Oops! Tem erro.."})
    });
  }

  mudaParaTelaAdministrador = (event) =>{
    this.props.history.push('/administrador');
  }

  cadastraInformacoes = (event) =>{
    event.preventDefault();
    Axios.post('http://localhost:5000/api/veiculos', {
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
        this.setState({
          nome: ''
        });
      } else {
        this.setState({ erro: 'Oops!' })
      }
    })
    .catch(error => this.setState({ erro: "Oops! Tem erro.."})) 
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
            <h2>Veículo</h2>
            <div className="containerAdmin" >
              <button className="conteudoPrincipal-btn" onClick={this.abreCadastro}>Cadastrar</button>
              <button className="conteudoPrincipal-btn" onClick={this.listaveiculo}>Listar</button>
              <button className="conteudoPrincipal-btn" onClick={this.mudaParaTelaAdministrador}>Voltar</button>
            </div>
          </section>

          {/* tabela Veiculo*/}
          <table id="tabela-lista">
            <thead>
              <tr>
                <th>#</th>
                <th>Veículo</th>
              </tr>
            </thead>
            <tbody id="tabela-lista-corpo">
              {
                this.state.lista.map(element => {
                  return (
                    <tr key={element.idVeiculo}>
                      <td>{element.idVeiculo}</td>
                      <td>{element.nome}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          
          <div className="container">
          <input type="text"
            placeholder="Digite o Veículo"
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

export default AdmVeiculo;