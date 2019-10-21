import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

//importar imagem
import imagem from "../../assets/img/familia-vendo-tv.jpg"

//import estilos
import "../../assets/css/style.css";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <main>
          <img class="imagemFundo" src={imagem} width="100%" />
          <h1>OPFLIX</h1>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
