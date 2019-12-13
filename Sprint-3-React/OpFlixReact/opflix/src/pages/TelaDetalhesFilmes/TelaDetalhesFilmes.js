import React, { Component } from 'react';

//imagem
import telaFundo from '../../assets/img/Swisscom_12_17.jpg';
import mundo from '../../assets/img/mundo.png';

import Axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';


class TelaDetalhesFilmes extends Component {
  constructor() {
    super();

    this.state = {
      lista: [],
      nome: '',
      sinopse: '',
      duracao: '',
      dataLancamento: '',
      idCategoria: '',
      idClassificacao: '',
      idTipo: '',
      idVeiculo: ''
    };
  }

  componentDidMount() {
    this.listaLancamentos()
  }

  listaLancamentos() {
    Axios.get('http://localhost:5000/api/lancamentos', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }
    })
      .then(resposta => {
        if (resposta.status === 200) {
          let response = resposta.data;
          this.setState({
            lista: response
          })
        } else {
          this.setState({ erro: "Oops! Tem erro.." });
        }
      })
      .catch(erro => {
        this.setState({ erro: "Oops! Tem erro..." })
      });
  }


  logout = (event) => {
    localStorage.removeItem("usuario-opflix");
    localStorage.removeItem("isAdmin-opflix");
    this.props.history.push('/');
  }

  render() {

    return (
      <div>
        <Header funcao={this.logout} />
        <main className="conteudoPrincipal">
          <section className="conteudoPrincipalTelaInicial">
            <table id="tabela-lista">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Sinopse</th>
                  <th>Duração</th>
                  <th>Data Lançamento</th>
                  <th>Veículo</th>
                  <th>Categoria</th>
                  <th>Classificação</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody id="tabela-lista-corpo">
                {
                  this.state.lista.map(element => {
                    return (
                      <tr key={element.idLancamento}>
                        <td>{element.idLancamento}</td>
                        <td>{element.nome}</td>
                        <td>{element.sinopse}</td>
                        <td>{element.duracao}</td>
                        <td>{element.dataLancamento}</td>
                        <td>{element.idVeiculo}</td>
                        <td>{element.idCategoria}</td>
                        <td>{element.idClassificacao}</td>
                        <td>{element.idTipo}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </section>
        </main>
        <div>
          <button className="conteudoPrincipal-btn1">
            <Link to="/Mapa"><img src={mundo} width="50px" alt="Mundo" /></Link>
          </button>
        </div>
        <img src={telaFundo} alt="Família vendo tv" className="telaFundo" />
        <Footer />
      </div>
    );
  };
}

export default TelaDetalhesFilmes;