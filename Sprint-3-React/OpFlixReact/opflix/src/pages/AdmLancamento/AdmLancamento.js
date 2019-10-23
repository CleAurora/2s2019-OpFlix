import React, { Component } from 'react';

//imagem
import telaFundo from '../../assets/img/Swisscom_12_17.jpg';

import Axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class AdmLancamento extends Component {
  constructor() {
    super();

    this.state = {
      lista: [],
      listaLancamentos: [],
      listaLancamentosSelect:[],
      listaVeiculos: [],
      listaCategorias: [],
      listaTipos: [],
      nome: '',
      sinopse: '',
      duracao: 0,
      dataLancamento: '',
      idCategoria: 0,
      idClassificacao: 0,
      idTipo: 0,
      idVeiculo: 0,
      editaNome: '',
      editaSinopse: '',
      editaDuracao: 0,
      editaDataLancamento: '',
      editaIdCategoria: 0,
      editaIdClassificacao: 0,
      editaIdTipo: 0,
      editaIdVeiculo: 0,
      idLancamento: 0
    };
  }

  componentDidMount() {
    this.listaLancamentosSelect();
    this.listaVeiculos();
    this.listaCategorias();
    this.listaTipos();
  }

  atualizaNome = (event) => {
    this.setState({ nome: event.target.value });
  }

  atualizaSinopse = (event) => {
    this.setState({ sinopse: event.target.value });
  }

  atualizaDuracao = (event) => {
    this.setState({ duracao: event.target.value });
  }

  atualizaDataLancamento = (event) => {
    this.setState({ dataLancamento: event.target.value });
  }

  atualizaidCategoriaNavigation = (event) => {
    this.setState({ idCategoria: event.target.value });
  }

  atualizaidClassificacaoNavigation = (event) => {
    this.setState({ idClassificacao: event.target.value });
  }

  atualizaidTipoNavigation = (event) => {
    this.setState({ idTipo: event.target.value });
  }

  atualizaidVeiculoNavigation = (event) => {
    this.setState({ idVeiculo: event.target.value });
  }

  editarNome = (event) => {
    this.setState({ editanome: event.target.value })
  }

  editarSinopse = (event) => {
    this.setState({ editaSinopse: event.target.value })
  }

  editarDuracao = (event) => {
    this.setState({ editaDuracao: event.target.value })
  }

  editarDataLancamento = (event) => {
    this.setState({ editaDataLancamento: event.target.value })
  }

  editarIdVeiculo = (event) => {
    this.setState({ editaIdVeiculo: event.target.value })
  }

  editarIdCategoria = (event) => {
    this.setState({ editaIdCategoria: event.target.value })
  }

  editarIdClassificacao = (event) => {
    this.setState({ editaIdClassificacao: event.target.value })
  }

  editarIdTipo = (event) => {
    this.setState({ editaIdTipo: event.target.value })
  }

  editarIdLancamento = (event) => {
    console.log(this.state.idLancamento);
    console.log("vai ser besta", event.target.value);
    this.setState({ idLancamento: event.target.value });
    console.log(this.state.idLancamento);
    this.buscaDetalheLancamento(event.target.value);
  }

  EditarIdLancamento = (event) => {
    this.setState({ idLancamento: event.target.value });
  }

  mudaParaTelaAdministrador = (event) => {
    this.props.history.push('/administrador');
  }

  logout = (event) => {
    localStorage.removeItem("usuario-opflix");
    localStorage.removeItem("isAdmin-opflix");
    this.props.history.push('/');
  }

  //Verbos http
  listaVeiculos() {
    Axios.get('http://localhost:5000/api/veiculos', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }
    })
      .then(response => {
        if (response.status === 200) {
          this.setState({ listaVeiculos: response.data });
        }
      });
  }

  listaCategorias() {
    Axios.get('http://localhost:5000/api/categorias', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }
    })
      .then(response => {
        if (response.status === 200) {
          this.setState({ listaCategorias: response.data });
        }
      });
  }

  listaTipos() {
    Axios.get('http://localhost:5000/api/tipos', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }
    })
      .then(response => {
        if (response.status === 200) {
          this.setState({ listaTipos: response.data });
        }
      });
  }

  listaLancamentos = (event) => {
    event.preventDefault();
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
          this.setState({ erro: "Oops! Tem erro.." })
        }
      })
      .catch(erro => {
        this.setState({ erro: "Oops! Tem erro.." })
      });
  }

  listaLancamentosSelect() {
    Axios.get('http://localhost:5000/api/lancamentos', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }
    })
      .then(response => {
        if (response.status === 200) {
          this.setState({listaLancamentosSelect: response.data});
        } 
      });
  }

  buscaDetalheLancamento = (idLancamento) => {
    Axios.get('http://localhost:5000/api/lancamentos/' + idLancamento, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }
    })
      .then(resposta => {
        if (resposta.status === 200) {
          let response = resposta.data;

          console.log(response);
          this.setState({
            editaNome: response.nome,
            editaSinopse: response.sinopse,
            editaDuracao: response.duracao,
            editaDataLancamento: response.dataLancamento.slice(0,10),
            editaIdVeiculo: response.idVeiculo,
            editaIdCategoria: response.idCategoria,
            editaIdClassificacao: response.idClassificacao,
            editaIdTipo: response.idTipo
          });
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
    Axios.post('http://localhost:5000/api/lancamentos', {
      nome: this.state.nome,
      sinopse: this.state.sinopse,
      duracao: this.state.duracao,
      dataLancamento: this.state.dataLancamento,
      idCategoria: this.state.idCategoria,
      idClassificacao: this.state.idClassificacao,
      idTipo: this.state.idTipo,
      idVeiculo: this.state.idVeiculo
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
            nome: '',
            sinopse: '',
            duracao: 0,
            DataLancamento: '',
            idCategoria: 0,
            idClassificacao: 0,
            idTipo: 0,
            idVeiculo: 0
          });
        } else {
          this.setState({ erro: 'Oops!' })
        }
      })
      .catch(error => this.setState({ erro: "Oops! Tem erro.." }))
  }

  alteraInformacoes = (event) => {
    event.preventDefault();

    Axios.put('http://localhost:5000/api/lancamentos/' + this.state.idLancamento,
      {
        nome: this.state.editaNome,
        sinopse: this.state.editaSinopse,
        duracao: this.state.editaDuracao,
        dataLancamento: this.state.editaDataLancamento,
        idCategoria: this.state.editaIdCategoria,
        idClassificacao: this.state.editaIdClassificacao,
        idTipo: this.state.editaIdTipo,
        idVeiculo: this.state.editaIdVeiculo

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
            editaIdLancamento: '0',
            editaSinopse: '',
            editaDuracao: '',
            editaDataLancamento: '',
            editaIdCategoria: '',
            editaIdClassificacao: '',
            editaIdTipo: '',
            editaIdVeiculo: '',
            idLancamento: 0
          });
          this.listaLancamentosSelect();
        } else {
          this.setState({ erro: 'Oops!' })
        }
      })
      .catch(error => this.setState({ erro: 'Falha ao tentar atualizar lancamento!' }))
  }

  deletaLancamento = (event) => {
    event.preventDefault();

    Axios.delete('http://localhost:5000/api/lancamentos/' + this.state.idLancamento,
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
            editaIdLancamento: '0',
            editaSinopse: '',
            editaDuracao: '',
            editaDataLancamento: '',
            editaIdCategoria: '',
            editaIdClassificacao: '',
            editaIdTipo: '',
            editaIdVeiculo: '',
            idLancamento: 0
          });
          this.listaLancamentosSelect();
        } else {
          this.setState({ erro: 'Oops!' })
        }
      })
      .catch(error => this.setState({ erro: 'Falha ao tentar deletar lançamento!' }))
  }


  render() {
    return (
      <div>
        <Header funcao={this.logout} />
        <main className="conteudoPrincipal">
          <section className="conteudoPrincipalAdministrador">
            <h2>Lançamento</h2>
            <div className="containerAdmin" >
              <button className="conteudoPrincipal-btn" onClick={this.listaLancamentos}>Listar</button>
              <button className="conteudoPrincipal-btn" onClick={this.mudaParaTelaAdministrador}>Voltar</button>
            </div>
          </section>

          {/* tabela Lancamento*/}
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

          {/* Formulário para Cadastrar */}

          <h3>Formulário para Cadastrar</h3>
          <div className="container">
            <input type="text"
              placeholder="Digite o nome do Lançamento"
              onChange={this.atualizaNome}
              value={this.state.nome}
            />
            <textarea
              placeholder="Digite a sinopse do lançamento"
              onChange={this.atualizaSinopse}
              value={this.state.sinopse}
            />
            <input type="number"
              placeholder="Digite a duração em minutos"
              onChange={this.atualizaDuracao}
              value={this.state.duracao}
            />
            <input type="date"
              placeholder="Digite a Data de Lançamento"
              onChange={this.atualizaDataLancamento}
              value={this.state.datalancamento}
            />

            <select id="option" onChange={this.atualizaidVeiculoNavigation} value={this.state.idVeiculo}>
              <option value="0" disabled >Veículo do Lançamento</option>
              {this.state.listaVeiculos.map(element => {
                return (<option key={element.idVeiculo} value={element.idVeiculo}> {element.nome} </option>)
              })}
            </select>

            <select id="option" onChange={this.atualizaidCategoriaNavigation} value={this.state.idCategoria}>
              <option value="0" disabled >Categoria do Lançamento</option>
              {this.state.listaCategorias.map(element => {
                return (<option value={element.idCategoria} key={element.idCategoria} > {element.nome} </option>)
              })}
            </select>

            <select id="option" onChange={this.atualizaidClassificacaoNavigation} value={this.state.idClassificacao}>
              <option value="Selecione">Classificação do Lançamento</option>
              <option value="1">Livre</option>
              <option value="2">Maior de 16 anos</option>
              <option value="3">Maior de 18 anos</option>
            </select>


            <select id="option" onChange={this.atualizaidTipoNavigation} value={this.state.idTipo}>
              <option value="0" disabled >Tipo do Lançamento</option>
              {this.state.listaTipos.map(element => {
                return (<option value={element.idTipo} key={element.idTipo} > {element.nome} </option>)
              })}
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

            <h3>Para Deletar e Alterar selecione a opção</h3>

            <select id="option" onChange={this.editarIdLancamento} value={this.state.idLancamento}>
              <option value="0" disabled>Selecione o Lancamento a ser alterado ou deletado</option>
              {this.state.listaLancamentosSelect.map(element => {
                return (
                  <option
                    value={element.idLancamento}
                    key={element.idLancamento} > {element.nome} </option>
                )
              })}
            </select>

            <h3>Formulário para Alterar</h3>

            <input type="text"
              placeholder="Altera o nome do Lançamento"
              value={this.state.editaNome}
              onChange={this.editarNome}
            />

            <textarea
              placeholder="Altera a sinopse do lançamento"
              value={this.state.editaSinopse}
              onChange={this.editarSinopse}
            />

            <input type="number"
              placeholder="Altera a duração em minutos"
              value={this.state.editaDuracao}
              onChange={this.editarDuracao}
            />

            <input type="date"
              placeholder="Digite a Data de Lançamento"
              value={this.state.editaDataLancamento}
              onChange={this.editarDataLancamento}
            />

            <select id="option" onChange={this.editarIdVeiculo} value={this.state.editaIdVeiculo}>
              <option value="0" disabled >Veículo do Lançamento</option>
              {this.state.listaVeiculos.map(element => {
                return (<option key={element.idVeiculo} value={element.idVeiculo}> {element.nome} </option>)
              })}
            </select>

            <select id="option" onChange={this.editarIdCategoria} value={this.state.editaIdCategoria}>
              <option value="0" disabled >Categoria do Lançamento</option>
              {this.state.listaCategorias.map(element => {
                return (<option value={element.idCategoria} key={element.idCategoria} > {element.nome} </option>)
              })}
            </select>

            <select id="option" onChange={this.editarIdClassificacao} value={this.state.editaIdClassificacao}>
              <option value="Selecione">Classificação do Lançamento</option>
              <option value="1">Livre</option>
              <option value="2">Maior de 16 anos</option>
              <option value="3">Maior de 18 anos</option>
            </select>

            <select id="option" onChange={this.editarIdTipo} value={this.state.editaIdTipo}>
              <option value="0" disabled >Tipo do Lançamento</option>
              {this.state.listaTipos.map(element => {
                return (<option value={element.idTipo} key={element.idTipo} > {element.nome} </option>)
              })}
            </select> {/* aqui */}

            <button className="conteudoPrincipal-btn" onClick={this.alteraInformacoes}>Alterar Informações</button>
            <button className="conteudoPrincipal-btn" onClick={this.deletaLancamento}>Deletar Lançamento</button>

          </div>

          <img src={telaFundo} alt="Família vendo tv" className="telaFundo" />

        </main>
        <Footer />
      </div>
    );
  };
}

export default AdmLancamento;