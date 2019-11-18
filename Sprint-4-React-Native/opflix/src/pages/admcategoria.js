import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, FlatList, AsyncStorage, ImageBackground } from 'react-native';
import planoDeFundo from '../assets/img/familia-vendo-tv1.jpg'
import menu from '../assets/img/menuhamburger.png'
import Axios from 'axios';

class Categorias extends Component {
  //apresenta lista de categorias

  static navigationOptions = {
    tabBarIcon: () => (
      <Image
        source={require('../assets/img/categoria.png')}
        style={styles.tabNavigatorIcon}
      />
    ),
  };

  constructor() {
    super();
    this.state = {
      categorias: [],
      listaCategoriasSelect: [],
      nome: '',
      nomeASerAlterado: '',
      idCategoria: '0'
    };
  }

  componentDidMount() {
    this._carregarCategorias();
  }

  atualizaNome = (event) => {
    this.setState({ nome: event.target.value });
  }

  atualizaNomeASerAlterado = (event) => {
    this.setState({ nomeASerAlterado: event.target.value });
  }

  atualizaIdCategoria = (event) => {
    this.setState({ idCategoria: event.target.value });
  }

  //Verbos http
  _carregarCategorias = async () => {
    await fetch('http://192.168.3.192:5000/api/categorias', {
      headers: {
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
      }
    })
      .then(response => response.json())
      // .then(data => console.warn(data))
      .then(data => this.setState({ categorias: data }))
      .catch(erro => console.warn(erro));
  };

  _cadastraCategorias = async (event) => {
    await Axios.post('http://192.168.3.192:5000/api/categorias', {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
      }
    })
      .then(resposta => {
        if (resposta.status === 200) {
          this.setState({ categorias: [], nome: '' });
        } else {
          this.setState({ erro: "Oops! Tem erro.." })
        }
      })
      .catch(erro => { this.setState({ erro: "Falha ao tentar cadastrar" }) });
  }

  _atualizaCategoria = async (event) => {
    await Axios.put('http://192.168.3.192:5000/api/categorias' + this.state.idCategoria, {
      nome: this.state.nomeASerAlterado
    },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + await AsyncStorage.getItem('@opflix:token')
        }
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            nomeASerAlterado: '',
            idCategoria: '0'
          });
          this.categorias();
        } else {
          this.setState({ erro: 'Oops!' })
        }
      })
      .catch(error => this.setState({ erro: 'Falha ao tentar atualizar categoria!' }))
  }

  _deletaCategoria = async (event) => {
    await Axios.delete('http://192.168.3.192:5000/api/categorias' + this.state.idCategoria,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + await AsyncStorage.getItem('@opflix:token')
        }
          .then(response => {
            if (response.status === 204) {
              this.setState({
                nomeASerAlterado: '',
                idCategoria: "0",
                erro: ''
              });
              this.categorias();
            } else {
              this.setState({ erro: 'Falha ao tentar deletar categoria!' })
            }
          })
          .catch(error => this.setState({ erro: 'Não é possível deletar uma categoria que possui lançamento associado!' }))

      })

  }

  render() {
    return (
      <View>
        <ImageBackground
          source={planoDeFundo}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={styles.headerArea}>
            <Image
              source={menu}
              style={{ width: "5%", height: "16%", tintColor: "#fff" }}></Image>
            <Text style={styles.textTittle}>OPFLIX</Text>
          </View>

          <Text style={styles.tittleText}>Lista de Categorias</Text>
          <FlatList
            data={this.state.categorias}
            keyExtractor={item => item.idCategoria}
            renderItem={({ item }) => (
              <View style={styles.body}>
                <Text style={styles.text}>{item.nome}</Text>
              </View>
            )}
          />

          <Text style={styles.tittleText}>Atualiza Categorias</Text>
          <View>
            <input
              placeholder="Digite a Categoria"
              onChange={this.atualizaNome}
              value={this.state.nome}
            />

            <button
              onClick={this._cadastraCategorias}
            >
              Cadastrar
            </button>
          </View>

         
          />

        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabNavigatorIcon: {
    width: 35,
    height: 35
  },

  baseText: {
    fontFamily: 'Cohin',
    padding: 10,
  },

  tittleText: {
    fontFamily: 'Cohin',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#484445',
    padding: 16,
    alignItems: 'center',
  },

  text: { color: 'white', fontSize: 15 },
  body: { backgroundColor: 'rgba(72, 68, 69, 0.8)' },

  headerArea: {
    backgroundColor: '#484445',
  },

  textTittle: {
    fontFamily: 'Cohin',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: -50,
  },


});

export default Categorias;