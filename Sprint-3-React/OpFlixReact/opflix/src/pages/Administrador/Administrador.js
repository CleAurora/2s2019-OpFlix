import React, { Component } from 'react';

//imagem
import telaFundo from '../../assets/img/Swisscom_12_17.jpg';

import Axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class Administrador extends Component {
  constructor() {
    super();
    this.state = {
      lista: [],
    };
  }

  componentDidMount() {
    Axios.get('http://192.168.1.36:5000/api/usuarios')
      .then(data => {
        this.setState({ lista: data.data });
      })
      .catch(erro => {
        console.log(erro);
      });
  }

  render() {
    return (
      <div>
        <Header />
        <main className="conteudoPrincipal">
          <section className="conteudoPrincipalAdministrador">
            <div className="containerAdmin" >
              <select id="option__acessolivre">
                <option value="Selecione">Selecione</option>
                <option value="Usuários">Usuários</option>
                <option value="Tipo">Tipo</option>
                <option value="Categoria">Categoria</option>
                <option value="Veículo">Veículo</option>
                <option value="Filmes">Filmes</option>
              </select>
              <button className="conteudoPrincipal-btn">Cadastrar</button>
              <button className="conteudoPrincipal-btn">Listar</button>
            </div>
          </section>
          <img src={telaFundo} alt="Família vendo tv" className="telaFundo" />
          <form action=""></form>


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
                    <tr>
                      <td>{element.idUsuario}</td>
                      <td>{element.nome}</td>
                      <td>{element.email}</td>
                      <td>{element.senha}</td>
                      <td>{element.celular}</td>
                      <td>{element.endereco}</td>
                      <td>{element.idPerfilNavigation.nome}</td>

                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          {/* Formulário para cadastrar Usuário */}
          <input type="text"
            placeholder="Digite seu nome"
            onChange={this.atualizaNome}
            value={this.state.nome}
          />
          <input type="text"
            placeholder="Digite seu e-mail"
            onChange={this.atualizaEmail}
            value={this.state.email}
          />
          <input type="password"
            placeholder="Digite sua senha"
            onChange={this.atualizaSenha}
            value={this.state.senha}
          />
          <input type="text"
            placeholder="Digite seu celular"
            onChange={this.atualizaCelular}
            value={this.state.celular}
          />
          <input type="text"
            placeholder="Digite seu endereço"
            onChange={this.atualizaEndereco}
            value={this.state.endereco}
          />
          <select id="option__acessolivre">
            <option value="Selecione">Selecione</option>
            <option value="Administrador">Administrador</option>
            <option value="Usuário">Usuário</option>
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



          {/* tabela Tipo*/}
          <table id="tabela-lista">
            <thead>
              <tr>
                <th>#</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody id="tabela-lista-corpo">
              {
                this.state.lista.map(element => {
                  return (
                    <tr>
                      <td>{element.idTipo}</td>
                      <td>{element.nome}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          {/* Formulário para cadastrar Tipo */}
          <input type="text"
            placeholder="Digite o tipo"
            onChange={this.atualizaNome}
            value={this.state.nome}
          />

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



          {/* tabela Categoria*/}
          <table id="tabela-lista">
            <thead>
              <tr>
                <th>#</th>
                <th>Categoria</th>
              </tr>
            </thead>
            <tbody id="tabela-lista-corpo">
              {
                this.state.lista.map(element => {
                  return (
                    <tr>
                      <td>{element.idCategoria}</td>
                      <td>{element.nome}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          {/* Formulário para cadastrar Categoria */}
          <input type="text"
            placeholder="Digite a Categoria"
            onChange={this.atualizaNome}
            value={this.state.nome}
          />

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



          {/* tabela Veiculo*/}
          <table id="tabela-lista">
            <thead>
              <tr>
                <th>#</th>
                <th>Veículo</th>
              </tr>
            </thead>
            <tbody id="tabela-lista-corpo">
              {
                this.state.lista.map(element => {
                  return (
                    <tr>
                      <td>{element.idVeiculo}</td>
                      <td>{element.nome}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          {/* Formulário para cadastrar Veículo */}
          <input type="text"
            placeholder="Digite o Veículo"
            onChange={this.atualizaNome}
            value={this.state.nome}
          />

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

          {/* tabela Lancamento*/}
          <table id="tabela-lista">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Sinopse</th>
                <th>Duração</th>
                <th>Data Lançamento</th>
                <th>Veículo</th>
                <th>Categoria</th>
                <th>Classificação</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody id="tabela-lista-corpo">
              {
                this.state.lista.map(element => {
                  return (
                    <tr>
                      <td>{element.idLancamento}</td>
                      <td>{element.nome}</td>
                      <td>{element.sinopse}</td>
                      <td>{element.duracao}</td>
                      <td>{element.datalancamento}</td>
                      <td>{element.idVeiculoNavigation.nome}</td>
                      <td>{element.idCategoriaNavigation.nome}</td>
                      <td>{element.idClassificacaoNavigation.nome}</td>
                      <td>{element.idTipoNavigation.nome}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          {/* Formulário para cadastrar Lançamento */}
          <input type="text"
            placeholder="Digite o nome do Lançamento"
            onChange={this.atualizaNome}
            value={this.state.nome}
          />
          <textarea
            placeholder="Digite a sinopse do lançamento"
            onChange={this.atualizaSinopse}
            value={this.state.sinopse}
          />
          <input type="number"
            placeholder="Digite a duração em minutos"
            onChange={this.atualizaDuracao}
            value={this.state.duracao}
          />
          <input type="date"
            placeholder="Digite a Data de Lançamento"
            onChange={this.atualizaDataLancamento}
            value={this.state.datalancamento}
          />

          <select id="option" onChange={this.atualizaidVeiculoNavigation}>
            <option value="0" disabled >Veículo do Lançamento</option>
            {this.state.lista.map(element => {
              return (<option value={element.idVeiculo} key={element.idVeiculo} > {element.idVeiculoNavigation.nome} </option>)
            })}
          </select>

          <select id="option" onChange={this.atualizaidCategoriaNavigation}>
            <option value="0" disabled >Categoria do Lançamento</option>
            {this.state.lista.map(element => {
              return (<option value={element.idCategoria} key={element.idCategoria} > {element.idCategoriaNavigation.nome} </option>)
            })}
          </select>

          <select id="option" onChange={this.atualizaidClassificacaoNavigation}>
            <option value="0" disabled >Classificação do Lançamento</option>
            {this.state.lista.map(element => {
              return (<option value={element.idClassificacao} key={element.idClassificacao} > {element.idClassificacaoNavigation.nome} </option>)
            })}
          </select>

          <select id="option" onChange={this.atualizaidTipoNavigation}>
            <option value="0" disabled >Tipo do Lançamento</option>
            {this.state.lista.map(element => {
              return (<option value={element.idTipo} key={element.idTipo} > {element.idTipoNavigation.nome} </option>)
            })}
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

        </main>
        <Footer />
      </div>
    );
  };
}

export default Administrador;