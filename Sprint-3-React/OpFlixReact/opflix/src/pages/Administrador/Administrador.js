import React, { Component } from 'react';

//imagem
import telaFundo from '../../assets/img/Swisscom_12_17.jpg';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class Administrador extends Component {

  constructor() {
    super()

    this.state = {
      pagina: ''
    }
  }

  //Função para sair (no header)
  logout = (event) =>{
    localStorage.removeItem("usuario-opflix");
    localStorage.removeItem("isAdmin-opflix");
    this.props.history.push('/');
  }

  mudaEstadoPagina = (event) => {
    this.setState({ pagina: event.target.value });
  }

  mudaParaTela = (event) => {
    this.props.history.push(this.state.pagina);
  }

  render() {
    return (
      <div>
        <Header funcao={this.logout}/>
        <main className="conteudoPrincipal">
          <section className="conteudoPrincipalAdministrador">
            <div className="containerAdmin" >
              <select id="option__acessolivre" value={this.state.pagina} onChange={this.mudaEstadoPagina}> 
                <option value="Selecione">Selecione a tela desejada</option>
                <option value="/admUsuario">Usuários</option>
                <option value="/admTipo">Tipo</option>
                <option value="/admCategoria">Categoria</option>
                <option value="/admVeiculo">Veículo</option>
                <option value="/admLancamento">Lançamentos</option>
              </select>
              <button className="conteudoPrincipal-btn" onClick={this.mudaParaTela}>Ir Para Tela</button>
            </div>
          </section>
          <img src={telaFundo} alt="Família vendo tv" className="telaFundo" />
        </main>
        <Footer />
      </div>
    );
  };
}

export default Administrador;