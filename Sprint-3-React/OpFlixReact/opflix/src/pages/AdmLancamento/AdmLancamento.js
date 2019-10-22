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
      listaVeiculos: [],
      listaCategorias: [],
      listaClassificacoes: [],
      listaTipos: [],
      nome: '',
      sinopse:'',
      duracao: '',
      dataLancamento: '',
      idCategoria: 0,
      idClassificacao: 0,
      idTipo: 0,
      idVeiculo: 0,
      mostraCadastro: false,
      mostraLista: false
    };
  }

  componentDidMount() {
    this.listaVeiculos();
  }

  atualizaNome = (event) => {
    this.setState({nome: event.target.value });
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

  atualizaidVeiculoNavigation = (event) =>{
    this.setState({idVeiculo: event.target.value});
  }

  abreCadastro = (event) => {
    this.setState({
      mostraCadastro: true,
      mostraLista: false
    });
  }

  listaVeiculos() {
    Axios.get('http://localhost:5000/api/veiculos', {
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }})
    .then(response => {
      if(response.status === 200){ 
        this.setState({ listaVeiculos: response.data });
      }
    });
  }

  listaLancamentos = (event) =>{
    event.preventDefault();
    Axios.get('http://localhost:5000/api/lancamentos', {
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }})
    .then(resposta => {
      if(resposta.status === 200){ 
        let response = resposta.data;
        this.setState({
          lista: response,
          mostraCadastro: false,
          mostraLista: true
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

    Axios.post('http://localhost:5000/api/lancamentos', {
      nome: this.state.nome,
    })
    .then(this.listaAtualizada())
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
            <h2>Lançamento</h2>
            <div className="containerAdmin" >
              <button className="conteudoPrincipal-btn" onClick={this.abreCadastro}>Cadastrar</button>
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
                    <tr>
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
              return (<option value={element.idCategoria} key={element.idCategoria} > {element.idCategoria} </option>)
            })}
          </select>

          <select id="option" onChange={this.atualizaidClassificacaoNavigation} value={this.state.idClassificacao}>
            <option value="0" disabled >Classificação do Lançamento</option>
            {this.state.listaClassificacoes.map(element => {
              return (<option value={element.idClassificacao} key={element.idClassificacao} > {element.idClassificacao} </option>)
            })}
          </select>

          <select id="option" onChange={this.atualizaidTipoNavigation} value={this.state.idTipo}>
            <option value="0" disabled >Tipo do Lançamento</option>
            {this.state.listaTipos.map(element => {
              return (<option value={element.idTipo} key={element.idTipo} > {element.idTipo} </option>)
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
          </div>

          <img src={telaFundo} alt="Família vendo tv" className="telaFundo" />

        </main>
        <Footer />
      </div>
    );
  };
}

export default AdmLancamento;