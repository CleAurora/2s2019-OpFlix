import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, FlatList, AsyncStorage, ScrollView, ImageBackground } from 'react-native';
import planoDeFundo from '../assets/img/familia-vendo-tv1.jpg'
import menu from '../assets/img/menuhamburger.png'

class Usuarios extends Component {

  static navigationOptions = {
    tabBarIcon: () => (
      <Image
        source={require('../assets/img/usuario.png')}
        style={styles.tabNavigatorIcon}
      />
    ),
  };

  constructor() {
    super();
    this.state = {
      usuarios: [],
    };
  }

  componentDidMount() {
    this._carregarUsuarios();
  }

  _carregarUsuarios = async () => {
    await fetch('http://192.168.3.192:5000/api/usuarios', {
      headers: {
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ usuarios: data }))
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
              <Text style={styles.tittleText1}>Lista de Usuarios</Text>
              <FlatList
                style={styles.Text}
                data={this.state.usuarios}
                keyExtractor={item => item.idUsuario}
                renderItem={({ item }) => (
                  <View>
                    <Text style={styles.text}>{item.nome}</Text>
                    <Text style={styles.text}>{item.email}</Text>
                    <Text style={styles.text}>{item.celular}</Text>
                    <Text style={styles.text}>{item.endereco}</Text>
                    <Text style={styles.text}>{item.idPerfil}</Text>
                    <Text></Text>
                  </View>
                )}
              />
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


export default Usuarios;