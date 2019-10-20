import React, { Component } from 'react';

//imagem
import telaFundo from '../../assets/img/Swisscom_12_17.jpg';

import Axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class TelaDetalhesFilmes extends Component {
  render() {
    return (
      <div>
        <Header />
        <main class="conteudoPrincipal">
          <img src={telaFundo} alt="Família vendo tv" class="telaFundo" />
          <section class="conteudoPrincipalTelaInicial">
            <table id="tabela-lista">

              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Sinopse</th>
                  <th>Duração</th>
                  <th>Lançamento</th>
                  <th>Veículo</th>
                  <th>Categoria</th>
                  <th>Favorito</th>
                </tr>
              </thead>

              <tbody id="tabela-lista-corpo"></tbody>
            </table>
          </section>
          <form action=""></form>
        </main>
        <Footer />
      </div>
    );
  };
}

export default TelaDetalhesFilmes;