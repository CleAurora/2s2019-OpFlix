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
      listaVeiculosSelect: [];
      nome: '',
      editaNome: '',
      idTipo: 0
    };
  }

  componentDidMount() {
    this.listaTiposSelect()
  }

  atualizaNome = (event) => {
    this.setState({ nome: event.target.value });
  }

  editarNome = (event) => {
    this.setState({ editaNome: event.target.value });
  }

  editaIdTipo = (event) => {
    this.setState({ idTipo: event.target.value })
  }

  mudaParaTelaAdministrador = (event) => {
    this.props.history.push('/administrador');
  }

  logout = (event) => {
    localStorage.removeItem("usuario-opflix");
    localStorage.removeItem("isAdmin-opflix");
    this.props.history.push('/');
  }


  //verbos http
  listaVeiculosSelect() {
    Axios.get('http://localhost:5000/api/veiculos', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }
    })
      .then(response => {
        if (response.status === 200) {
          this.setState({ listaTiposSelect: response.data, lista: response.data });
        }
      });
  }

  listaveiculo = (event) => {
    event.preventDefault();
    Axios.get('http://localhost:5000/api/veiculos', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }
    })
      .then(resposta => {
        if (resposta.status === 200) {
          let response = resposta.data;
          this.setState({
            lista: response,
            listaTiposSelect: response
          })
        } else {
          this.setState({ erro: "Oops! Tem erro.." })
        }
      })
      .catch(erro => {
        this.setState({ erro: "Oops! Tem erro.." })
      });
  }



  cadastraInformacoes = (event) => {
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
            nome: '',
            erro: '',
            lista: []
          });
        } else {
          this.setState({ erro: 'Oops!' })
        }
      })
      .catch(error => this.setState({ erro: "Oops! Tem erro.." }))
  }

  alteraInformacoes = (event) => {
    event.preventDefault();

    Axios.put('http://localhost:5000/api/veiculos/' + this.state.idTipo,
      {
        nome: this.state.editaNome
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
            editaNome: '',
            idVeiculo: '0'
          });
          this.listaTiposSelect();
        } else {
          this.setState({ erro: 'Oops!' })
        }
      })
      .catch(error => this.setState({ erro: 'Falha ao tentar atualizar tipo!' }))
  }

  deletaTipo = (event) => {
    event.preventDefault();

    Axios.delete('http://localhost:5000/api/veiculos/' + this.state.idTipo,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
        }
      })
      .then(response => {
        if (response.status === 204) {
          this.setState({
            editaNome: '',
            idVeiculo: "0",
            erro: ''
          });
          this.listaVeiculosSelect();
        } else {
          this.setState({ erro: 'Oops!' })
        }
      })
      .catch(error => this.setState({ erro: 'Falha ao tentar deletar tipo!' }))
  }


  render() {
    return (
      <div>
        <Header funcao={this.logout} />
        <main className="conteudoPrincipal">
          <section className="conteudoPrincipalAdministrador">
            <h2>Veículo</h2>
            <div className="containerAdmin" >
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

            <h3>Para Deletar e Alterar selecione a opção</h3>

            <select id="option" onChange={this.editaIdTipo} value={this.state.idTipo}>
              <option value="0" disabled >Selecione o veículo a ser alterado ou deletado</option>
              {this.state.listaVeiculosSelect.map(element => {
                return (
                  <option
                    value={element.idVeiculo}
                    key={element.idVeiculo}
                  >
                    {element.nome}
                  </option>
                )
              })}
            </select>

            <input type="text"
              placeholder="Digite o veiculo a ser alterado"
              value={this.state.editaNome}
              onChange={this.editarNome}
            />
            <button className="conteudoPrincipal-btn" onClick={this.alteraInformacoes}>Alterar Informações</button>
            <button className="conteudoPrincipal-btn" onClick={this.deletaVeiculo}>Deletar Veiculo</button>

            <p hidden={this.state.erro === ''}
              style={{ color: "red", textAlign: "center" }}
            >
              {this.state.erro}
            </p>


          </div>

          <img src={telaFundo} alt="Família vendo tv" className="telaFundo" />
        </main>
        <Footer />
      </div>
    );
  };
}

export default AdmVeiculo;