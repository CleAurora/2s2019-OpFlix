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
    };
  }

  // Funções para listar
  listaCategoria = (event) =>{
    Axios.get('http://localhost:5000/api/categorias')
    .then(data => {
      this.setState({lista: data.nome})
    })
    .catch(erro =>{
      console.log(erro);
    });
  }

  listaLancamentos = (event) =>{
    Axios.get('http://localhost:5000/api/lancamentos')
    .then(data => {
      this.setState({lista: data.nome})
    })
    .catch(erro =>{
      console.log(erro);
    });
  }

  listaTipo = (event) =>{
    Axios.get('http://localhost:5000/api/tipos')
    .then(data => {
      this.setState({lista: data.nome})
    })
    .catch(erro =>{
      console.log(erro);
    });
  }

  listaUsuarios = (event) =>{
    Axios.get('http://localhost:5000/api/usuarios')
    .then(data => {
      this.setState({lista: data.nome})
    })
    .catch(erro =>{
      console.log(erro);
    });
  }

  listaVeiculo = (event) =>{
    Axios.get('http://localhost:5000/api/veiculos')
    .then(data => {
      this.setState({lista: data.nome})
    })
    .catch(erro =>{
      console.log(erro);
    });
  }

  //Funções para cadastrar

  //Categoria
  atualizaNome = (event) => {
    this.setState({ nome: event.target.value });
  }

  //Lançamento
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

  //Tipo
  //Usuario
  //Veículo

  //Função para sair (no header)
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


          

        </main>
        <Footer />
      </div>
    );
  };
}

export default Administrador;