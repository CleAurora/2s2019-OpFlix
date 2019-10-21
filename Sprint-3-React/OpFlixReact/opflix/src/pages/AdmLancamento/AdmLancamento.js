import React, { Component } from 'react';

//imagem
import telaFundo from '../../assets/img/Swisscom_12_17.jpg';

import Axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class Administrador extends Component {
  constructor() {
    super();
    this.state = {
      lista: [],
      nome: '',
      sinopse:'',
      duracao: '',
      dataLancamento: '',
      idCategoria: '',
      idClassificacao: '',
      idTipo: '',
      idVeiculo: ''
    };
  }

  logout = (event) =>{
    localStorage.removeItem("usuario-opflix");
    localStorage.removeItem("isAdmin-opflix");
    this.props.history.push('/');
  }

  

  listaCategoria = (event) =>{
    
  }

  listaLancamentos = (event) =>{
    Axios.get('http://localhost:5000/api/categorias')
    .then(data => {
      this.setState({lista: data.nome})
    })
    .catch(erro =>{
      console.log(erro);
    });
  }

  listaTipo = (event) =>{
    this.props.history.push('/admTipo');
  }

  listaUsuarios = (event) =>{
    this.props.history.push('/admUsuario');
  }

  listaVeiculo = (event) =>{
    this.props.history.push('/admVeiculo');
  }

  cadastraInformacoes = (event) =>{
    event.preventDefault();
    console.log.(this.state.nome);
    Axios.post('http://localhost:5000/api/lancamentos', {
      nome: this.state.nome,
    })
    .then(this.listaAtualizada())
    .catch(error => console.log(error)) 
  }

  componentDidMount() {
    Axios.get('http://localhost:5000/api/lancamentos')
      .then(data => {
        this.setState({ lista: data.data });
      })
      .catch(erro => {
        console.log(erro);
      });
  }

  render() {
    return (
      <div>
        <Header funcao={this.logout}/>
        <main className="conteudoPrincipal">
          <section className="conteudoPrincipalAdministrador">
            <div className="containerAdmin" >
              <select id="option__acessolivre">
                <option value="Selecione">Selecione</option>
                <option value="Usuários" onClick={this.listaUsuarios} >Usuários</option>
                <option value="Tipo" onClick={this.listaTipo}>Tipo</option>
                <option value="Categoria" onClick={this.listaCategoria} >Categoria</option>
                <option value="Veículo" onClick={this.listaVeiculo}>Veículo</option>
                <option value="Lancamentos" onClick={this.listaLancamentos}>Lançamentos</option>
              </select>
              <button className="conteudoPrincipal-btn">Cadastrar</button>
              <button className="conteudoPrincipal-btn">Listar</button>
            </div>
          </section>
          <img src={telaFundo} alt="Família vendo tv" className="telaFundo" />
          <form action=""></form>


          {/* tabela Usuario*/}
          <table id="tabela-lista">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Senha</th>
                <th>Celular</th>
                <th>Endereço</th>
                <th>Perfil</th>
              </tr>
            </thead>
            <tbody id="tabela-lista-corpo">
              {
                this.state.lista.map(element => {
                  return (
                    <tr>
                      <td>{element.idUsuario}</td>
                      <td>{element.nome}</td>
                      <td>{element.email}</td>
                      <td>{element.senha}</td>
                      <td>{element.celular}</td>
                      <td>{element.endereco}</td>
                      <td>{element.idPerfilNavigation.nome}</td>

                    </tr>
                  )
                })
              }
            </tbody>
          </table>

         

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
                      <td>{element.datalancamento}</td>
                      <td>{element.idVeiculoNavigation.nome}</td>
                      <td>{element.idCategoriaNavigation.nome}</td>
                      <td>{element.idClassificacaoNavigation.nome}</td>
                      <td>{element.idTipoNavigation.nome}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          {/* Formulário para cadastrar Lançamento */}
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

          <select id="option" onChange={this.atualizaidVeiculoNavigation}>
            <option value="0" disabled >Veículo do Lançamento</option>
            {this.state.lista.map(element => {
              return (<option value={element.idVeiculo} key={element.idVeiculo} > {element.idVeiculoNavigation.nome} </option>)
            })}
          </select>

          <select id="option" onChange={this.atualizaidCategoriaNavigation}>
            <option value="0" disabled >Categoria do Lançamento</option>
            {this.state.lista.map(element => {
              return (<option value={element.idCategoria} key={element.idCategoria} > {element.idCategoriaNavigation.nome} </option>)
            })}
          </select>

          <select id="option" onChange={this.atualizaidClassificacaoNavigation}>
            <option value="0" disabled >Classificação do Lançamento</option>
            {this.state.lista.map(element => {
              return (<option value={element.idClassificacao} key={element.idClassificacao} > {element.idClassificacaoNavigation.nome} </option>)
            })}
          </select>

          <select id="option" onChange={this.atualizaidTipoNavigation}>
            <option value="0" disabled >Tipo do Lançamento</option>
            {this.state.lista.map(element => {
              return (<option value={element.idTipo} key={element.idTipo} > {element.idTipoNavigation.nome} </option>)
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

        </main>
        <Footer />
      </div>
    );
  };
}

export default Administrador;