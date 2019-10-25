import React, { Component } from 'react';

//imagem
import telaFundo from '../../assets/img/Swisscom_12_17.jpg';

import Axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class AdmUsuario extends Component {

  constructor() {
    super();
    this.state = {
      lista: [],
      listaUsuarios: [],
      listaUsuariosSelect: [],
      nome: '',
      email: '',
      senha: '',
      celular: '',
      endereco: '',
      idPerfil: '',
      erro: '',
      editaNome: '',
      editaEmail: '',
      editaSenha: '',
      editaCelular: '',
      editaEndereco: '',
      editaIdPerfil: '',
      idUsuario: '',
    };
  }

  componentDidMount() {
    this.listaUsuariosSelect();
  }



  atualizaNome = (event) => {
    this.setState({ nome: event.target.value });
  }

  atualizaEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  atualizaSenha = (event) => {
    this.setState({ senha: event.target.value });
  }

  atualizaCelular = (event) => {
    this.setState({ celular: event.target.value });
  }

  atualizaEndereco = (event) => {
    this.setState({ endereco: event.target.value });
  }

  atualizaPerfil = (event) => {
    this.setState({ idPerfil: event.target.value });
  }

  editarNome = (event) => {
    this.setState({ editaNome: event.target.value });
  }

  editarEmail = (event) => {
    this.setState({ editaEmail: event.target.value });
  }

  editarSenha = (event) => {
    this.setState({ editaSenha: event.target.value });
  }

  editarCelular = (event) => {
    this.setState({ editaCelular: event.target.value });
  }

  editarEndereco = (event) => {
    this.setState({ editaEndereco: event.target.value });
  }

  editarIdPerfil = (event) => {
    this.setState({ editaIdPerfil: event.target.value });
  }

  editarIdUsuario = (event) =>{
    this.setState({idUsuario: event.target.value});
    this.buscaDetalheUsuario(event.target.value);
  }

  mudaParaTelaAdministrador = (event) => {
    this.props.history.push('/administrador');
  }

  logout = (event) => {
    localStorage.removeItem("usuario-opflix");
    localStorage.removeItem("isAdmin-opflix");
    this.props.history.push('/');
  }


  //verbos http
  listaUsuarios = (event) => {
    event.preventDefault();
    Axios.get('http://localhost:5000/api/usuarios', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }
    })
      .then(resposta => {
        if (resposta.status === 200) {
          let response = resposta.data;
          this.setState({
            lista: response,
            erro: ''
          });
        } else {
          this.setState({ erro: "Oops! Tem erro.." })
        }
      })
      .catch(erro => {
        this.setState({ erro: "Oops! Tem erro.." })
        console.log(erro);
      });
  }

  listaUsuariosSelect() {
    Axios.get('http://localhost:5000/api/usuarios', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }
    })
      .then(response => {
        if (response.status === 200) {
          this.setState({ listaUsuariosSelect: response.data });
        }
      });
  }

  buscaDetalheUsuario = (idUsuario) => {
    Axios.get('http://localhost:5000/api/usuarios/' + idUsuario, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }
    })
      .then(resposta => {
        if (resposta.status === 200) {
          let response = resposta.data;

          console.log(response);
          this.setState({
            editaNome: response.nome,
            editaEmail: response.email,
            editaSenha: response.senha,
            editaCelular: response.celular,
            editaEndereco: response.endereco,
            editaIdPerfil: response.idPerfil,
            erro: ''
          });
        } else {
          this.setState({ erro: "Oops! Tem erro.." })
        }
      })
      .catch(erro => {
        this.setState({ erro: "Oops! Tem erro.." })
      });
  }

  cadastraInformacoes = (event) => {
    event.preventDefault();

    Axios.post('http://localhost:5000/api/usuarios', {
      nome: this.state.nome,
      email: this.state.email,
      senha: this.state.senha,
      celular: this.state.celular,
      endereco: this.state.endereco,
      idPerfil: this.state.idPerfil
    },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
        }
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            lista: [],
            nome: '',
            email: '',
            senha: '',
            celular: '',
            endereco: '',
            idPerfil: '',
            erro: ''
          });
        } else {
          this.setState({ erro: "Oops! Algo está errado... " });
        }
      })
      .catch(erro => {
        this.setState({ erro: "Todos os campos são obrigatórios! " });
      });
  }

  alteraInformacoes = (event) => {
    event.preventDefault();

    Axios.put('http://localhost:5000/api/usuarios/' + this.state.idUsuario,
      {
        nome: this.state.editaNome,
        email: this.state.editaEmail,
        senha: this.state.editaSenha,
        celular: this.state.editaCelular,
        endereco: this.state.editaEndereco,
        idPerfil: this.state.editaIdPerfil
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
        }
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            editaNome: '',
            editaEmail: '',
            editaSenha: '',
            editaCelular: '',
            editaEndereco: '',
            editaIdPerfil: '',
            idUsuario: 0,
            erro: ''
          });
          this.listaUsuariosSelect();
        } else {
          this.setState({ erro: 'Oops!' })
        }
      })
      .catch(error => this.setState({ erro: 'Falha ao tentar atualizar usuario!' }))
  }

  deletaUsuario = (event) => {
    event.preventDefault();

    Axios.delete('http://localhost:5000/api/usuarios/' + this.state.idUsuario,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
        }
      })
      .then(response => {
        if (response.status === 204) {
          this.setState({
            editaNome: '',
            editaEmail: '',
            editaSenha: '',
            editaCelular: '',
            editaEndereco: '',
            editaIdPerfil: '',
            idUsuario: '',
            erro: ''
          });
          this.listaUsuariosSelect();
        } else {
          this.setState({ erro: 'Oops!' })
        }
      })
      .catch(error => this.setState({ erro: 'Falha ao tentar deletar usuario!' }))
  }

  render() {
    return (
      <div>
        <Header funcao={this.logout} />
        <main className="conteudoPrincipal">
          <section className="conteudoPrincipalAdministrador">
            <h2>Usuários</h2>
            <div className="containerAdmin">
              <button className="conteudoPrincipal-btn" onClick={this.listaUsuarios}>Listar</button>
              <button className="conteudoPrincipal-btn" onClick={this.mudaParaTelaAdministrador}>Voltar</button>
            </div>
          </section>


          {/* tabela Usuario*/}
          <table id="tabela-lista">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Senha</th>
                <th>Celular</th>
                <th>Endereço</th>
                <th>Perfil</th>
              </tr>
            </thead>
            <tbody id="tabela-lista-corpo">
              {
                this.state.lista.map(element => {
                  return (
                    <tr key={element.idUsuario}>
                      <td>{element.idUsuario}</td>
                      <td>{element.nome}</td>
                      <td>{element.email}</td>
                      <td>{element.senha}</td>
                      <td>{element.celular}</td>
                      <td>{element.endereco}</td>
                      <td>{element.idPerfil}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          <div className="container">
            <input type="text"
              placeholder="Digite o nome"
              onChange={this.atualizaNome}
              value={this.state.nome}
            />
            <input type="text"
              placeholder="Digite o e-mail"
              onChange={this.atualizaEmail}
              value={this.state.email}
            />
            <input type="password"
              placeholder="Digite a senha"
              onChange={this.atualizaSenha}
              value={this.state.senha}
            />
            <input type="text"
              placeholder="Digite o celular"
              onChange={this.atualizaCelular}
              value={this.state.celular}
            />
            <input type="text"
              placeholder="Digite o endereço"
              onChange={this.atualizaEndereco}
              value={this.state.endereco}
            />
            <select id="option__acessolivre" onChange={this.atualizaPerfil} value={this.state.idPerfil}>
              <option value="Selecione">Selecione</option>
              <option value="1">Administrador</option>
              <option value="2">Usuário</option>
            </select>

            <p hidden={this.state.erro === ''}
              style={{ color: "red", textAlign: "center" }}
            >
              {this.state.erro}
            </p>

            <button
              className="conteudoPrincipal-btn"
              onClick={this.cadastraInformacoes}
            >
              Cadastrar
          </button>

            <h3>Para Deletar e Alterar selecione a opção</h3>

            <select id="option" onChange={this.editarIdUsuario} value={this.state.idUsuario}>
              <option value="0" disabled>Selecione o Usuario a ser alterado ou deletado</option>
              {this.state.listaUsuariosSelect.map(element => {
                return (
                  <option
                    value={element.idUsuario}
                    key={element.idUsuario} > {element.nome} </option>
                )
              })}
            </select>

            <h3>Formulário para Alterar o Usuário selecionado</h3>

            <input type="text"
              placeholder="Altera o nome do Usuario"
              value={this.state.editaNome}
              onChange={this.editarNome}
            />
            <input type="text"
              placeholder="Digite o e-mail"
              value={this.state.editaEmail}
              onChange={this.editarEmail}
            />
            <input type="password"
              placeholder="Digite a senha"
              value={this.state.editaSenha}
              onChange={this.editarSenha}
            />
            <input type="text"
              placeholder="Digite o celular"
              value={this.state.editaCelular}
              onChange={this.editarCelular}
            />
            <input type="text"
              placeholder="Digite o endereço"
              value={this.state.editaEndereco}
              onChange={this.editarEndereco}
            />
            <select id="option__acessolivre" onChange={this.editarPerfil} value={this.state.editaIdPerfil}>
              <option value="Selecione">Selecione</option>
              <option value="1">Administrador</option>
              <option value="2">Usuário</option>
            </select>

            <button className="conteudoPrincipal-btn" onClick={this.alteraInformacoes}>Alterar Informações</button>
            <button className="conteudoPrincipal-btn" onClick={this.deletaUsuario}>Deletar Usuário</button>


          </div>

          <img src={telaFundo} alt="Família vendo tv" className="telaFundo" />

        </main>
        <Footer />
      </div>
    );
  };
}

export default AdmUsuario;