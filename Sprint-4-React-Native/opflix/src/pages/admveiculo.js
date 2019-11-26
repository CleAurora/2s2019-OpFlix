import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, FlatList, AsyncStorage, ImageBackground, TouchableOpacity, TextInput, Picker, ScrollView } from 'react-native';
import planoDeFundo from '../assets/img/familia-vendo-tv1.jpg';
import menu from '../assets/img/menuhamburger.png';
import Axios from 'axios';


class Veiculos extends Component {

  static navigationOptions = {
    tabBarIcon: () => (
      <Image
        source={require('../assets/img/veiculo.png')}
        style={styles.tabNavigatorIcon}
      />
    ),
  };

  constructor() {
    super();
    this.state = {
      veiculos: [],
      listaVeiculosSelect: [],
      nome: '',
      nomeASerAlterado: '',
      veiculoSelecionado: ''
    };
  }

  componentDidMount() {
    this._carregarVeiculos();
  }

  //Verbos Http
  _carregarVeiculos = async () => {
    await fetch('http://192.168.3.192:5000/api/veiculos', {
      headers: {
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ veiculos: data }))
      .catch(erro => console.warn(erro));
  };

  _cadastraVeiculos = async () => {

    await Axios.post('http://192.168.3.192:5000/api/veiculos', {
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
            veiculos: [],
            nome: ''
          });
          this._carregarVeiculos();
        } else {
          this.setState({ erro: 'Oops!' })
        }
      })
      .catch(error => this.setState({ erro: 'Falha ao tentar cadastrar veiculo!' }))
  }

  _atualizaVeiculo = async () => {
    await Axios.put('http://192.168.3.192:5000/api/veiculos/' + this.state.veiculoSelecionado,
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
          this._carregarVeiculos();
        } else {
          this.setState({ erro: 'Oops!' })
        }
      })
      .catch(error => this.setState({ erro: 'Falha ao tentar atualizar veículo!' }))
  }

  _deletaVeiculo = async () => {
    await Axios.delete('http://192.168.3.192:5000/api/veiculos/' + this.state.veiculoSelecionado,
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
        }
      })
      .then(response => {
        if (response.status === 204) {
          this.setState({
            veiculoSelecionado: this.state.veiculos[0].idVeiculo,
            nomeASerAlterado: '',
            erro: ''
          });
          this._carregarVeiculos();
        } else {
          this.setState({ erro: 'Falha ao tentar deletar veiculo!' })
        }
      })
      .catch(error => this.setState({ erro: 'Não é possível deletar um veículo de comunicação que possui lançamento associado!' }))
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
              <Text style={styles.tittleText1}>Lista de Veículos de Comunicação</Text>
              <FlatList
                data={this.state.veiculos}
                keyExtractor={item => item.idVeiculo}
                renderItem={({ item }) => (
                  <View>
                    <Text style={styles.text}>{item.nome}</Text>
                  </View>
                )}
              />
            </View>

            <View style={styles.caixaBranca}>
              <Text style={styles.tittleText}>Cadastra Veículos de Comunicação</Text>
              <View style={styles.formularioArea}>
                <TextInput
                  style={styles.inputArea}
                  placeholder="Veículo de Comunicação"
                  onChangeText={nome => this.setState({ nome })}
                  value={this.state.nome}
                />
                <Text></Text>
                <TouchableOpacity
                  onPress={this._cadastraVeiculos}
                  style={styles.btn}
                >
                  <Text style={styles.textTittlebtn}>Cadastrar</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.caixaBranca}>
              <View>
                <Text style={styles.tittleText}>Atualiza e Deleta Veículos de Comunicação</Text>
              </View>
              <Picker
                style={styles.picker}
                selectedValue={this.state.veiculoSelecionado}
                onValueChange={(value, index) => {
                  console.warn(this.state.veiculos[index])
                  this.setState({ veiculoSelecionado: value });
                  this.setState({ nomeASerAlterado: this.state.veiculos[index].nome })
                }}
              >
                {this.state.veiculos.map(element => {
                  return (
                    <Picker.Item
                      value={element.idVeiculo}
                      label={element.nome}
                    />
                  )
                })}
              </Picker>
              <Text style={styles.feedback}>Você selecionou o veículo de comunicação {this.state.nomeASerAlterado}</Text>
              <Text></Text>

              <View style={styles.formularioArea}>

                <TextInput
                  style={styles.inputArea}
                  placeholder="Digite o novo veiculo de comunicação"
                  onChangeText={nomeASerAlterado => this.setState({ nomeASerAlterado })}
                  value={this.state.nomeASerAlterado}
                />
                <Text></Text>
                <TouchableOpacity
                  onPress={this._atualizaVeiculo}
                  style={styles.btn}
                >
                  <Text style={styles.textTittlebtn}>Atualizar  Veículo de Comunicação</Text>
                </TouchableOpacity>
                <Text></Text>
                <TouchableOpacity
                  onPress={this._deletaVeiculo}
                  style={styles.btn}
                >
                  <Text style={styles.textTittlebtn}>Deletar Veículo de Comunicação</Text>
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

export default Veiculos;