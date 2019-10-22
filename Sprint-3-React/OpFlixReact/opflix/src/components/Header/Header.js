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
            <Link to="/"><img src={logo} width="50px" alt="Rolo da Camera" /></Link>
          </ul>
          <ul hidden={!this.state.isAdmin}><Link className="itemMenu" to="/administrador">Administrador</Link></ul>
          <ul hidden={this.state.isLogged}><Link className="itemMenu" to="/cadastroUsuario">Cadastro</Link></ul>
          <ul hidden={this.state.isLogged}><Link className="itemMenu" to="/login">Login</Link></ul>
          <ul hidden={!this.state.isLogged} onClick={this.props.funcao}><Link className="itemMenu" to="/">Sair</Link></ul>
        </nav>
      </header>
    );
  }
}

export default Header;