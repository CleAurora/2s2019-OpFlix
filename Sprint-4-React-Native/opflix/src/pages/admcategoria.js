import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, FlatList, AsyncStorage, ImageBackground, TouchableOpacity, TextInput, Picker } from 'react-native';
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

  // atualizaNome = (event) => {
  //   this.setState({ nome: event.target.value });
  // }

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

  _cadastraCategorias = async () => {

    await Axios.post('http://192.168.3.192:5000/api/categorias', {
      "nome": this.state.nome,
    },
      {
        headers: {
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
        }
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            categorias: [],
            nome: ''
          });
          this._carregarCategorias();
        } else {
          this.setState({ erro: 'Oops!' })
        }
      })
      .catch(error => this.setState({ erro: 'Falha ao tentar cadastrar categoria!' }))

  }

  // rever atualizar - parei aqui
  _atualizaCategoria = async () => {
    console.warn(this.state.idCategoria);
    console.warn(await AsyncStorage.getItem('@opflix:token'))

    await Axios.put('http://192.168.3.192:5000/api/categorias', {
      "idCategoria": this.state.idCategoria,
    },
      {
        headers: {
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
        }
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

          <View>
            <Text style={styles.tittleText}>Cadastra Categorias</Text>
          </View>
          <View style={styles.formularioArea}>
            <TextInput
              style={styles.inputArea}
              placeholder="categoria"
              onChangeText={nome => this.setState({ nome })}
              value={this.state.nome}
            />
            <TouchableOpacity
              onPress={this._cadastraCategorias}
              style={styles.btn}
            >
              <Text style={styles.textTittle}>Cadastrar</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Picker
              style={styles.tittleText}
              onChangeText={this.atualizaIdCategoria}
              value={this.state.idCategoria}

            >
              {this.state.categorias.map(element => {
                return (
                  <Picker.Item
                    value={element.idCategoria}
                    label={element.nome}
                  />
                )
              })}

            </Picker>
          </View>

          <View style={styles.formularioArea}>
            <TextInput
              style={styles.inputArea}
              placeholder="Categoria a ser alterada"
              value={this.state.nomeASerAlterado}
              onChangeText={this.atualizaNomeASerAlterado}
            />
            <TouchableOpacity
              onPress={this._atualizaCategoria}
              style={styles.btn}
            >
              <Text style={styles.textTittle}>Atualizar Categoria</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this._deletaCategoria}
              style={styles.btn}
            >
              <Text style={styles.textTittle}>Deletar Categoria</Text>
            </TouchableOpacity>

          </View>




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

  textTittle: {
    fontFamily: 'Cohin',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },


  baseText: {
    fontFamily: 'Cohin',
    padding: 10,
    fontSize: 20,
  },

  inputArea: {
    backgroundColor: '#ffffff',
    textAlign: 'center'
  },

  formularioArea: {
    backgroundColor: 'rgba(72, 68, 69, 0.5)',
    marginHorizontal: '10%',

  },

  btn: {
    backgroundColor: '#484445',
    height: 30
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