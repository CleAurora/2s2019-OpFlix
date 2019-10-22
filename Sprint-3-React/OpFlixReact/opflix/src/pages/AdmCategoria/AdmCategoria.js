import React, { Component } from 'react';

//imagem
import telaFundo from '../../assets/img/Swisscom_12_17.jpg';

import Axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class AdmCategoria extends Component {
  constructor() {
    super();
    this.state = {
      lista: [],
      listaCategoriasSelect: [],
      nome: ''
    };
  }

  componentDidMount() {
    this.listaCategoriasSelect()
  }

  atualizaNome = (event) => {
    this.setState({ nome: event.target.value });
  }

  atualizaNomeBuscar = (event) => {
    this.setState({ nome: event.target.value });
  }

  atualizaNomeAlterar = (event) => {
    this.setState({ nome: event.target.value });
  }

  atualizaNomeDeletar = (event) => {
    this.setState({ nome: event.target.value });
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
  listaCategoriasSelect() {
    Axios.get('http://localhost:5000/api/categorias', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }
    })
      .then(response => {
        if (response.status === 200) {
          this.setState({ listaCategoriasSelect: response.data });
        }
      });
  }

  listaCategoria = (event) => {
    event.preventDefault();
    Axios.get('http://localhost:5000/api/categorias', {
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
          this.setState({ erro: "Oops! Tem erro.." })
        }
      })
      .catch(erro => {
        this.setState({ erro: "Oops! Tem erro.." })
      });
  }

  listaCategoriaPorId = (event) => {
    event.preventDefault();

    Axios.get('http://localhost:5000/api/categorias/{this.state.id}', {
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
          this.setState({ erro: "Oops! Tem erro.." })
        }
      })
      .catch(erro => {
        this.setState({ erro: "Oops! Tem erro.." })
      });
  }

  cadastraInformacoes = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:5000/api/categorias', {
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
            lista: [],
            nome: ''
          });
        } else {
          this.setState({ erro: 'Oops!' })
        }
      })
      .catch(error => this.setState({ erro: 'Falha ao tentar cadastrar categoria!' }))
  }

  AlteraInformacoes = (event) => {
    event.preventDefault();
    const categoriaASerAlterada = {
      nome: this.state.nome
    }

    Axios.put('http://localhost:5000/api/categorias/' + this.state.id,
      {
        nome: this.state.nome
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
            lista: [],
            nome: ''
          });
        } else {
          this.setState({ erro: 'Oops!' })
        }
      })
      .catch(error => this.setState({ erro: 'Falha ao tentar atualizar categoria!' }))
  }
  //   update(e) {
  //     e.preventDefault();
  //     const employee = {
  //         name: this.state.name,
  //         age: this.state.age,
  //         salary: this.state.salary,
  //     }
  //     axios.put('http://dummy.restapiexample.com/api/v1/update/{this.state.id}', employee)
  //     .then(res => console.log(res.data));
  // }

  DeletaCategoria = (event) => {
    event.preventDefault();
    const categoriaASerDeletada = {
      nome: this.state.nome
    }
    Axios.delete('http://localhost:5000/api/categorias/{this.state.id}', categoriaASerDeletada,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
        }
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            lista: [],
            nome: ''
          });
        } else {
          this.setState({ erro: 'Oops!' })
        }
      })
      .catch(error => this.setState({ erro: 'Falha ao tentar atualizar categoria!' }))
  }
  // delete(e) {
  //   e.preventDefault();
  //   axios.delete('http://dummy.restapiexample.com/api/v1/delete/{this.state.id}')
  //   .then(res => console.log(res.data));
  // }



  render() {
    return (
      <div>
        <Header funcao={this.logout} />
        <main className="conteudoPrincipal">
          <section className="conteudoPrincipalAdministrador">
            <h2>Categorias</h2>
            <div className="containerAdmin">
              <button className="conteudoPrincipal-btn" onClick={this.listaCategoria}>Listar</button>
              <button className="conteudoPrincipal-btn" onClick={this.mudaParaTelaAdministrador}>Voltar</button>
            </div>
          </section>

          {/* tabela Categoria*/}
          <table id="tabela-lista">
            <thead>
              <tr>
                <th>#</th>
                <th>Categoria</th>
              </tr>
            </thead>
            <tbody id="tabela-lista-corpo">
              {
                this.state.lista.map(element => {
                  return (
                    <tr key={element.idCategoria}>
                      <td>{element.idCategoria}</td>
                      <td>{element.nome}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          <div className="container">
            <input type="text"
              placeholder="Digite a Categoria"
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

            <select id="option" onChange={this.atualizaidCategoriaNavigation} value={this.state.idCategoria}>
              <option value="0" disabled >Categoria do Lançamento</option>
              {this.state.listaCategoriasSelect.map(element => {
                return (
                  <option
                    value={element.idCategoria}
                    key={element.idCategoria} > {element.nome} </option>
                )
              })}
            </select>
            
            <input type="text"
              placeholder="Digite a Categoria a ser alterada"
              onChange={this.atualizaNome}
            />
            <button className="conteudoPrincipal-btn" onClick={this.AlteraInformacoes}>Alterar Informações</button>
            <button className="conteudoPrincipal-btn" onClick={this.DeletaCategoria}>Deleta Categoria</button>
          </div>

          <img src={telaFundo} alt="Família vendo tv" className="telaFundo" />


        </main>
        <Footer />
      </div>
    );
  };
}

export default AdmCategoria;