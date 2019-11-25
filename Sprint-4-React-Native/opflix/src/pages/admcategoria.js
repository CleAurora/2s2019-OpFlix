import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, FlatList, AsyncStorage, ImageBackground, TouchableOpacity, TextInput, Picker, ScrollView } from 'react-native';
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
      idCategoria: '0',
      categoriaSelecionada: ''
    };
  }

  componentDidMount() {
    this._carregarCategorias();
  }



  //Verbos http
  _carregarCategorias = async () => {
    await fetch('http://192.168.3.192:5000/api/categorias', {
      headers: {
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
      }
    })
      .then(response => response.json())
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

  _atualizaCategoria = async () => {
    await Axios.put('http://192.168.3.192:5000/api/categorias/' + this.state.categoriaSelecionada,
      {
        nome: this.state.nomeASerAlterado
      },
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
        },
      })
      .then(response => {
        if (response.status === 200) {
          this._carregarCategorias();
        } else {
          this.setState({ erro: 'Oops!' })
        }
      })
      .catch(error => this.setState({ erro: 'Falha ao tentar atualizar categoria!' }))
  }

  _deletaCategoria = async () => {
    console.warn(this.state.nome);
    console.warn(await AsyncStorage.getItem('@opflix:token'))
    await Axios.delete('http://192.168.3.192:5000/api/categorias/' + this.state.categoriaSelecionada,
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
        }
      })
      .then(response => {
        if (response.status === 204) {
          this.setState({
            nomeASerAlterado: '',
            idCategoria: "0",
            erro: ''
          });
          this._carregarCategorias();
        } else {
          this.setState({ erro: 'Falha ao tentar deletar categoria!' })
        }
      })
      .catch(error => this.setState({ erro: 'Não é possível deletar uma categoria que possui lançamento associado!' }))
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
              style={{ width: 40, height: 40, resizeMode: "stretch", marginBottom: "-7%", marginTop: "1%", marginLeft: "0.5%", tintColor: '#ffffff' }}></Image>
            <Text style={styles.textTittle}>OPFLIX</Text>
          </View>

          <ScrollView>
            <Text></Text>
            <Text></Text>
            <View style={styles.caixaBranca1}>
              <Text style={styles.tittleText1}>Lista de Categorias</Text>
              <FlatList
                data={this.state.categorias}
                keyExtractor={item => item.idCategoria}
                renderItem={({ item }) => (
                  <View>
                    <Text style={styles.text}>{item.nome}</Text>
                  </View>
                )}
              />
            </View>

            <View style={styles.caixaBranca}>
              <Text style={styles.tittleText}>Cadastra Categorias</Text>
              <View style={styles.formularioArea}>
                <TextInput
                  style={styles.inputArea}
                  placeholder="Categoria"
                  onChangeText={nome => this.setState({ nome })}
                  value={this.state.nome}
                />
                <Text></Text>
                <TouchableOpacity
                  onPress={this._cadastraCategorias}
                  style={styles.btn}
                >
                  <Text style={styles.textTittlebtn}>Cadastrar</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.caixaBranca}>
              <View>
                <Text style={styles.tittleText}>Atualiza e Deleta Categorias</Text>
              </View>
              <Picker
                style={styles.picker}
                selectedValue={this.state.categoriaSelecionada}
                onValueChange={(value, index) => {
                  console.warn(this.state.categorias[index])
                  this.setState({ categoriaSelecionada: value });
                  this.setState({ nomeASerAlterado: this.state.categorias[index].nome })
                }}
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
              <Text style={styles.feedback}>Você selecionou a categoria {this.state.nomeASerAlterado}</Text>
              <Text></Text>

              <View style={styles.formularioArea}>

                <TextInput
                  style={styles.inputArea}
                  placeholder="Digite a nova categoria"
                  onChangeText={nomeASerAlterado => this.setState({ nomeASerAlterado })}
                  value={this.state.nomeASerAlterado}
                />
                <Text></Text>
                <TouchableOpacity
                  onPress={this._atualizaCategoria}
                  style={styles.btn}
                >
                  <Text style={styles.textTittlebtn}>Atualizar Categoria</Text>
                </TouchableOpacity>
                <Text></Text>
                <TouchableOpacity
                  onPress={this._deletaCategoria}
                  style={styles.btn}
                >
                  <Text style={styles.textTittlebtn}>Deletar Categoria</Text>
                </TouchableOpacity>
                <Text></Text>

              </View>
            </View>

          </ScrollView>
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

  areaTittle: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
    marginHorizontal: '10%',

  },

  btn: {
    backgroundColor: '#484445',
    height: 25
  },

  picker: {
    backgroundColor: "#FFF",
    margin: "10%"
  },

  tittleText: {
    fontFamily: 'Cohin',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#484445',
    padding: 16,
    alignItems: 'center',
  },

  tittleText1: {
    fontFamily: 'Cohin',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#484445',
    padding: 16,
    alignItems: 'center',
  },

  text: {
    color: 'black', fontSize: 15, textAlign: "center"
  },

  body: { backgroundColor: 'rgba(72, 68, 69, 0.8)' },

  headerArea: {
    backgroundColor: '#484445',
  },

  feedback: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10
  },

  textTittle: {
    fontFamily: 'Cohin',
    fontSize: 30,
    marginTop: "-3%",
    marginBottom: "1%",
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },

  textTittlebtn: {
    fontFamily: 'Cohin',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: -50,
  },
  caixaBranca: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingBottom: "6%",
    marginHorizontal: "10%",
    marginVertical: "5%",
    borderRadius: 15
  },
  caixaBranca1: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: "10%",
    borderRadius: 15,
  },

});

export default Categorias;