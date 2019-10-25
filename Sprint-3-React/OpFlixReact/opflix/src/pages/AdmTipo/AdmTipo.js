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
      listaTiposSelect: [],
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
    this.setState({idTipo: event.target.value})
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
  listaTiposSelect() {
    Axios.get('http://localhost:5000/api/tipos', {
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

  listaTipo = (event) => {
    event.preventDefault();
    Axios.get('http://localhost:5000/api/tipos', {
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
          this.setState({ erro: "Oops!" })
        }
      })
      .catch(erro => {
        this.setState({ erro: "Oops!" })
      });
  }

  cadastraInformacoes = (event) => {
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
          this.setState({
            nome: '',
            erro: '',
            lista: []
          });
        } else {
          this.setState({ erro: "Oops!" })
        }
      })
      .catch(error => this.setState({ erro: "Oops!" }))
  }

  alteraInformacoes = (event) => {
    event.preventDefault();

    Axios.put('http://localhost:5000/api/tipos/' + this.state.idTipo,
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
            idTipo: '0'
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

    Axios.delete('http://localhost:5000/api/tipos/' + this.state.idTipo,
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
            idTipo: "0",
            erro: ''
          });
          this.listaTiposSelect();
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
            <h2>Tipos</h2>
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

          <h3>Para Deletar e Alterar selecione a opção</h3>

            <select id="option" onChange={this.editaIdTipo} value={this.state.idTipo}>
              <option value="0" disabled >Selecione o tipo a ser alterado ou deletado</option>
              {this.state.listaTiposSelect.map(element => {
                return (
                  <option
                    value={element.idTipo}
                    key={element.idTipo} 
                  > 
                    {element.nome} 
                  </option>
                )
              })}
            </select>

            <h3>Formulário para Alterar o Tipo selecionado </h3>
            
            <input type="text"
              placeholder="Digite o tipo a ser alterado"
              value={this.state.editaNome}
              onChange={this.editarNome}
            />
            <button className="conteudoPrincipal-btn" onClick={this.alteraInformacoes}>Alterar Informações</button>
            <button className="conteudoPrincipal-btn" onClick={this.deletaTipo}>Deletar Tipo</button>

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

export default AdmTipo;