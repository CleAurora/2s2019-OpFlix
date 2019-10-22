import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

//importar imagem
import imagem from "../../assets/img/familia-vendo-tv.jpg"

//import estilos
import "../../assets/css/style.css";

class App extends Component {
  logout = (event) =>{
    localStorage.removeItem("usuario-opflix");
    localStorage.removeItem("isAdmin-opflix");
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <Header funcao={this.logout}/>
        <main>
          <img className="imagemFundo" src={imagem} width="100%" alt="" />
          <h1>OPFLIX</h1>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
