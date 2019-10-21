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
    };
  }

  atualizaNome = (event) => {
    this.setState({ nome: event.target.value });
  }

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
    this.props.history.push('/admLancamento');
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
    Axios.post('http://localhost:5000/api/categorias', {
      nome: this.state.nome,
    })
    .then(this.listaAtualizada())
    .catch(error => console.log(error)) 
  }

  componentDidMount() {
    Axios.get('http://localhost:5000/api/categorias')
      .then(data => {
        this.setState({ lista: data.data });
      })
      .catch(erro => {
        console.log(erro);
      });
  }

  logout = (event) =>{
    localStorage.removeItem("usuario-opflix");
    localStorage.removeItem("isAdmin-opflix");
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <Header funcao={this.logout} />
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
                    <tr>
                      <td>{element.idCategoria}</td>
                      <td>{element.nome}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          {/* Formulário para cadastrar Categoria */}
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



         

        </main>
        <Footer />
      </div>
    );
  };
}

export default Administrador;