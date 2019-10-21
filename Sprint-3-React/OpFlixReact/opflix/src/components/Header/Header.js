import React, { Component } from 'react';
import logo from '../../assets/img/RoloFilme.jpg';
// possibilidade de linkar
import { Link } from 'react-router-dom';


class Header extends Component {
  constructor(){
    super();

    this.state = { 
      isAdmin: localStorage.getItem("isAdmin-opflix") === true,
      isLogged: localStorage.getItem("usuario-opflix") !== null
    };
    console.log(this.state)
  }

  
  logout = (event) =>{
    localStorage.removeItem("usuario-opflix");
    localStorage.removeItem("isAdmin-opflix");
    this.props.history.push('/');
  }

  render(){
    return (
      <header>
        <nav className="navbar">
          <ul>
            <Link to="/"><img src={logo} width="50px" /></Link>
          </ul>
          <ul hidden={!this.state.isAdmin}><Link className="itemMenu" to="/administrador">Administrador</Link></ul>
          <ul hidden={this.state.isLogged}><Link className="itemMenu" to="/cadastroUsuario">Cadastro</Link></ul>
          <ul hidden={this.state.isLogged}><Link className="itemMenu" to="/login">Login</Link></ul>
          <ul hidden={!this.state.isLogged} onClick={this.props.funcao}><a>Sair</a></ul>
        </nav>
      </header>
    );
  }
}

export default Header;