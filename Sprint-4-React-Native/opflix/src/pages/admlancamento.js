import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, FlatList, AsyncStorage, ImageBackground, TouchableOpacity, TextInput, Picker, ScrollView } from 'react-native';
import planoDeFundo from '../assets/img/familia-vendo-tv1.jpg';
import menu from '../assets/img/menuhamburger.png';
import Axios from 'axios';


class Lancamentos extends Component {

  static navigationOptions = {
    tabBarIcon: () => (
      <Image
        source={require('../assets/img/lancamento.png')}
        style={styles.tabNavigatorIcon}
      />
    ),
  };

  constructor() {
    super();
    this.state = {
      lancamentos: [],
      listaLancamentosSelect: [],
      nome: '',
      nomeASerAlterado: '',
      lancamentoSelecionado: '',
      categorias: [],
      categoriaASerBuscada: '',
      lancamentosPorCategoria: [],
    };
  }

  componentDidMount() {
    this._carregarLancamentos();
    this._carregarCategorias();
  }

  //Verbos Http
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

  _carregarLancamentos = async () => {
    await fetch('http://192.168.3.192:5000/api/lancamentos', {
      headers: {
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ lancamentos: data }))
      .catch(erro => console.warn(erro));
  };

  _cadastraLancamentos = async () => {
    await Axios.post('http://192.168.3.192:5000/api/lancamentos', {
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
            lancamentos: [],
            nome: ''
          });
          this._carregarLancamentos();
        } else {
          this.setState({ erro: 'Oops!' })
        }
      })
      .catch(error => this.setState({ erro: 'Falha ao tentar cadastrar lançamento!' }))
  }

  _atualizaLancamento = async () => {
    await Axios.put('http://192.168.3.192:5000/api/lancamentos/' + this.state.lancamentoSelecionado,
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
          this._carregarLancamentos();
        } else {
          this.setState({ erro: 'Oops!' })
        }
      })
      .catch(error => this.setState({ erro: 'Falha ao tentar atualizar lançamento!' }))
  }

  _deletaLancamento = async () => {
    await Axios.delete('http://192.168.3.192:5000/api/lancamentos/' + this.state.lancamentoSelecionado,
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
        }
      })
      .then(response => {
        if (response.status === 204) {
          this.setState({
            lancamentoSelecionado: this.state.lancamentos[0].idLancamento,
            nomeASerAlterado: '',
            erro: ''
          });
          this._carregarLancamentos();
        } else {
          this.setState({ erro: 'Falha ao tentar deletar lançamento!' })
        }
      })
      .catch(error => this.setState({ erro: 'Não é possível deletar esse Lançamento!' }))
  }

  //Busca por categoria
  _BuscarLancamentosPorCategoria = async () => {
    await fetch('http://192.168.3.192:5000/api/lancamentos/buscaporcategoria' + this.state.categoriaASerBuscada, {
      headers: {
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ lancamentos: data }))
      .catch(erro => console.warn(erro));
  };



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
              <Text style={styles.tittleText1}>Lista de Lançamentos</Text>
              <FlatList
                data={this.state.lancamentos}
                keyExtractor={item => item.idLancamento}
                renderItem={({ item }) => (
                  <ScrollView style={styles.body}>
                    <Text style={styles.text}>{item.nome}</Text>
                    <Text style={styles.text}>{item.idVeiculo} - {item.idCategoria} - {item.idClassificacao} -{item.idTipo}
                    </Text>
                    <Text style={styles.text}>{item.duracao} minutos</Text>
                    <Text style={styles.text}>{item.dataLancamento}</Text>
                    <Text style={styles.text}>{item.sinopse}</Text>

                    <Text></Text>
                  </ScrollView>
                )}
              />
            </View>


            <View style={styles.caixaBranca}>
              <View>
                <Text style={styles.tittleText}>Filtrar por categoria</Text>
              </View>
              <Picker
                style={styles.picker}
                selectedValue={this.state.categoriaSelecionada}
                onValueChange={(value, index) => {
                  console.warn(this.state.categorias[index])
                  this.setState({ categoriaSelecionada: value });
                  this.setState({ categoriaASerBuscada: this.state.categorias[index].idCategoria })
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
              <Text style={styles.feedback}>Você selecionou a categoria {this.state.categoriaASerBuscada}</Text>
              <Text></Text>

              <View style={styles.formularioArea}>


                <TouchableOpacity
                  onPress={this._BuscarLancamentosPorCategoria}
                  style={styles.btn}
                >
                  <Text style={styles.textTittlebtn}>Buscar Lançamento por Categoria</Text>
                </TouchableOpacity>
                <Text></Text>

              </View>
            </View>

            <ScrollView>
              <Text></Text>
              <Text></Text>
              <View style={styles.caixaBranca1}>
                <Text style={styles.tittleText1}>Lançamentos por Categoria</Text>
                <FlatList
                  data={this.state.lancamentos}
                  keyExtractor={item => item.idLancamento}
                  renderItem={({ item }) => (
                    <ScrollView style={styles.body}>
                      <Text style={styles.text}>{item.nome}</Text>
                      <Text style={styles.text}>{item.idVeiculo} - {item.idCategoria} - {item.idClassificacao} -{item.idTipo}
                      </Text>
                      <Text style={styles.text}>{item.duracao} minutos</Text>
                      <Text style={styles.text}>{item.dataLancamento}</Text>
                      <Text style={styles.text}>{item.sinopse}</Text>

                      <Text></Text>
                    </ScrollView>
                  )}
                />
              </View>
            </ScrollView>
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

export default Lancamentos;