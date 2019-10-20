import React, { Component } from 'react';

//imagem
import telaFundo from '../../assets/img/Swisscom_12_17.jpg';

import Axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class Administrador extends Component {
  render() {
    return (
      <div>
        <Header />
        <main class="conteudoPrincipal">
          <section class="conteudoPrincipalAdministrador">
            <div class="containerAdmin" >
              <select id="option__acessolivre">
                <option value="Selecione">Selecione</option>
                <option value="Usuários">Usuários</option>
                <option value="Perfil">Perfil</option>
                <option value="Tipo">Tipo</option>
                <option value="Categoria">Categoria</option>
                <option value="Veículo">Veículo</option>
                <option value="Filmes">Filmes</option>
              </select>
              <button class="conteudoPrincipal-btn">Cadastrar</button>
              <button class="conteudoPrincipal-btn">Listar</button>
            </div>
          </section>
          <img src={telaFundo} alt="Família vendo tv" class="telaFundo" />
          <form action=""></form>
        </main>
        <Footer />
      </div>
    );
  };
}

export default Administrador;