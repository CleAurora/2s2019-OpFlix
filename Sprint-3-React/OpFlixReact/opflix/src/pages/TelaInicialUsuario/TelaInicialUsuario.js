import React, { Component } from 'react';

//imagem
import telaFundo from '../../assets/img/Swisscom_12_17.jpg';

import Axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class TelaInicialUsuario extends Component {
  logout = (event) =>{
    localStorage.removeItem("usuario-opflix");
    localStorage.removeItem("isAdmin-opflix");
    this.props.history.push('/');
  }
  
  render() {
    return (
      <div>
        <Header funcao={this.logout}/>
        <main class="conteudoPrincipal">
          <img src={telaFundo} alt="Família vendo tv" class="telaFundo" />
          <section class="conteudoPrincipalTelaInicial">
            <img src="../../assets/img/images(1).png" alt="" />
            <img src="../../assets/img/images(2).png" alt="" />
            <img src="../../assets/img/images(3).png" alt="" />
            <img src="../../assets/img/images(4).png" alt="" />
            <img src="../../assets/img/images(5).png" alt="" />
            <img src="../../assets/img/images(6).png" alt="" />
            <img src="../../assets/img/images(7).png" alt="" />
            <img src="../../assets/img/images(8).png" alt="" />
            <img src="../../assets/img/images(9).png" alt="" />
            <img src="../../assets/img/images(10).png" alt="" />
            <img src="../../assets/img/images(11).png" alt="" />
            <img src="../../assets/img/images(12).png" alt="" />

          </section>
          <form action=""></form>
        </main>
        <Footer />
      </div>
    );
  };
}

export default TelaInicialUsuario;

