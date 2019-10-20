import React, { Component } from 'react';

//imagem 
import telaFundo from '../../assets/img/Swisscom_12_17.jpg';

import Axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class CadastroUsuario extends Component {
  render() {
    return (
      <div>
        <Header />
        <main class="conteudoPrincipal">
          <div class="cadastroPrincipal">

            <img src={telaFundo} alt="Família vendo tv" class="imgFamiliaFundo" />
            <section class="conteudoPrincipalCadastroUsuarioComum">
              <div class="container">
                <input type="text" placeholder="Digite seu nome" /> 
                <input type="text" placeholder="Digite seu e-mail" /> 
                <input type="text" placeholder="Digite sua senha" /> 
                <input type="text" placeholder="Digite seu celular" /> 
                <input type="text" placeholder="Digite seu endereço" /> 

                <button class="conteudoPrincipal-btn">Cadastrar</button>
                <button class="conteudoPrincipal-btn">Já sou cadastrado</button>
              </div>
            </section>
            <form action=""></form>
          </div>
        </main>
        <Footer />
      </div>
    );
  };
}

export default CadastroUsuario;