import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, FlatList, AsyncStorage, ImageBackground } from 'react-native';
import planoDeFundo from '../assets/img/familia-vendo-tv1.jpg'
import menu from '../assets/img/menuhamburger.png'


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
    };
  }

  componentDidMount() {
    this._carregarVeiculos();
  }

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

  render() {
    return (
      <View>
        <ImageBackground
          source={planoDeFundo}
          style={{width: "100%", height: "100%"}}
        >
          <View style={styles.headerArea}>
            <Image
              source={menu}
              style={{ width: "5%", height: "16%", tintColor: "#fff" }}></Image>
            <Text style={styles.textTittle}>OPFLIX</Text>
          </View>

          <Text style={styles.tittleText}>Lista de Veículos de Comunicação</Text>
          <FlatList
            data={this.state.veiculos}
            keyExtractor={item => item.idVeiculo}
            renderItem={({ item }) => (
              <View style={styles.body}>
                <Text style={styles.text}>{item.nome}</Text>
              </View>
            )}
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

export default Veiculos;