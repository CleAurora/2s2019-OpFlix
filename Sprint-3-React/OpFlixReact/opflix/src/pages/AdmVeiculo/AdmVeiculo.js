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

  componentDidMount() {
    Axios.get('http://localhost:5000/api/veiculos')
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
                    <tr>
                      <td>{element.idVeiculo}</td>
                      <td>{element.nome}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          {/* Formulário para cadastrar Veículo */}
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

          
        </main>
        <Footer />
      </div>
    );
  };
}

export default Administrador;