import React from "react";
import logo from "../../assets/img/RoloFilme.jpg"

function Header() {
  return (
    <header>
      <nav class="navbar">
        <ul>
          <div>
            <img src={logo} width="50px" />
          </div></ul>
        <ul>Cadastro</ul>
        <ul>Login</ul>
      </nav>
    </header>
  );
}

export default Header;