import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, FlatList, AsyncStorage } from 'react-native';

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
    };
  }

  componentDidMount() {
    this._carregarCategorias();
  }

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

  render() {
    return (
      <View>
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
    padding:10,
  },

  tittleText: {
    fontFamily: 'Cohin',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#484445',
    padding: 16,
    alignItems: 'center',
  },

  text: {color: 'white', fontSize: 15},
  body: {backgroundColor: '#484445'}

});

export default Categorias;