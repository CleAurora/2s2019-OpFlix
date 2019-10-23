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
      listaVeiculos: [],
      listaCategorias: [],
      listaTipos: [],
      nome: '',
      sinopse:'',
      duracao: 0,
      cadastroDataLancamento: '',
      idCategoria: 0,
      idClassificacao: 0,
      idTipo: 0,
      idVeiculo: 0,
      editaNome: '',
      editaSinopse:'',
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

  atualizaidVeiculoNavigation = (event) =>{
    this.setState({idVeiculo: event.target.value});
  }

  editarNome = (event) =>{
    this.setState({editanome: event.target.value })
  }

  editarSinopse = (event) =>{
    this.setState({editaSinopse: event.target.value })
  }

  editarDuracao = (event) =>{
    this.setState({editaDuracao: event.target.value })
  }

  editarDataLancamento = (event) =>{
    this.setState({editaDataLancamento: event.target.value })
  }

  editarIdVeiculo = (event) =>{
    this.setState({editaIdVeiculo: event.target.value })
  }

  editarIdCategoria = (event) =>{
    this.setState({editaIdCategoria: event.target.value })
  }

  editarIdClassificacao = (event) =>{
    this.setState({editaIdClassificacao: event.target.value })
  }

  editarIdTipo = (event) =>{
    this.setState({editaIdTipo: event.target.value })
  }

  editarIdLancamento = (event) => {
    console.log(this.state.idLancamento);
    console.log("vai ser besta", event.target.value);
    this.setState({ idLancamento: event.target.value });
    console.log(this.state.idLancamento);
    this.buscaDetalheLancamento(event.target.value);
  }

  mudaParaTelaAdministrador = (event) =>{
    this.props.history.push('/administrador');
  }

  logout = (event) =>{
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
      }})
    .then(response => {
      if(response.status === 200){ 
        this.setState({ listaVeiculos: response.data });
      }
    });
  }

  listaCategorias() {
    Axios.get('http://localhost:5000/api/categorias', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }})
      .then(response => {
        if (response.status === 200) {
          this.setState({listaCategorias: response.data});
        } 
      });
  }

  listaTipos() {
    Axios.get('http://localhost:5000/api/tipos', {
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }})
    .then(response => {
      if(response.status === 200){ 
        this.setState({ listaTipos: response.data });
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

  listaLancamentosSelect() {
    Axios.get('http://localhost:5000/api/lancamentos', {
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }})
    .then(resposta => {
      if(resposta.status === 200){ 
        let response = resposta.data;
        this.setState({
          listaLancamentos: response
        })
      }else{
        this.setState({ erro: "Oops! Tem erro.."})
      }
    })
    .catch(erro =>{
      this.setState({ erro: "Oops! Tem erro.."})
    });
  }

  buscaDetalheLancamento = (idLancamento) => {
    Axios.get('http://localhost:5000/api/lancamentos/' + idLancamento, {
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }})
    .then(resposta => {
      if(resposta.status === 200){ 
        let response = resposta.data;

        console.log(response);

        /**
         * 
         * {
    "idLancamento": 1,
    "nome": "O Rei Leão",
    "sinopse": "O Rei Leão, da Disney, dirigido por Jon Favreau, retrata uma jornada pela savana africana, onde nasce o futuro rei da Pedra do Reino, Simba. O pequeno leão que idolatra seu pai, o rei Mufasa, é fiel ao seu destino de assumir o reinado. Mas nem todos no reino pensam da mesma maneira. Scar, irmão de Mufasa e ex-herdeiro do trono, tem seus próprios planos. A batalha pela Pedra do Reino é repleta de traição, eventos trágicos e drama, o que acaba resultando no exílio de Simba. Com a ajuda de dois novos e inusitados amigos, Simba terá que crescer e voltar para recuperar o que é seu por direito",
    "duracao": 118,
    "dataLancamento": "2019-07-18T00:00:00",
    "idVeiculo": 4,
    "idCategoria": 9,
    "idClassificacao": 1,
    "idTipo": 3
}
         */

        this.setState({
          editaNome: response.nome
        });
      }else{
        this.setState({ erro: "Oops! Tem erro.."})
      }
    })
    .catch(erro =>{
      this.setState({ erro: "Oops! Tem erro.."})
    });
  }

  cadastraInformacoes = (event) =>{
    event.preventDefault();

    Axios.post('http://localhost:5000/api/lancamentos', {
      nome: this.state.nome,
    })
    .then(this.listaAtualizada())
    .catch(error => this.setState({ erro: "Oops! Tem erro.."})) 
  }

  alteraInformacoes = (event) => {
    event.preventDefault();

    Axios.put('http://localhost:5000/api/Lancamentos/' + this.state.idCategoria,
      {
        nome: this.state.nomeASerAlterado
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
            nomeASerAlterado: '',
            idCategoria: '0'
          });
          this.listaLancamentos();
        } else {
          this.setState({ erro: 'Oops!' })
        }
      })
      .catch(error => this.setState({ erro: 'Falha ao tentar atualizar lancamento!' }))
  }

  deletaLancamento = (event) => {
    event.preventDefault();

    Axios.delete('http://localhost:5000/api/lancamentos/' + this.state.idCategoria,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
        }
      })
      .then(response => {
        if (response.status === 204) {
          this.setState({
            nomeASerAlterado: '',
            idCategoria: "0"
          });
          this.listaLancamentos();
        } else {
          this.setState({ erro: 'Oops!' })
        }
      })
      .catch(error => this.setState({ erro: 'Falha ao tentar deletar lançamento!' }))
  }  


  render() {
    return (
      <div>
        <Header funcao={this.logout}/>
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

          <select id="option" onChange={this.editarIdLancamento} value={this.state.idLancamento}>
            <option value="0" disabled>Selecione o Lancamento a ser alterado</option>
            {this.state.listaLancamentos.map(element => {
              return (
                <option
                  value={element.idLancamento}
                  key={element.idLancamento} > {element.nome} </option>
              )
            })}
          </select>
            
          <input type="text"
            placeholder="Digite o nome do Lançamento"
            value={this.state.editaNome}
            onChange={this.editarNome}
          />
          <button className="conteudoPrincipal-btn" onClick={this.alteraInformacoes}>Alterar Informações</button>
          <button className="conteudoPrincipal-btn" onClick={this.deletaCategoria}>Deleta Categoria</button>

    


          </div>

          <img src={telaFundo} alt="Família vendo tv" className="telaFundo" />

        </main>
        <Footer />
      </div>
    );
  };
}

export default AdmLancamento;