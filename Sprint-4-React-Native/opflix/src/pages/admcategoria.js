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
      <FlatList
        data={this.state.categorias}
        keyExtractor={item => item.idCategoria}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nome}</Text>
          </View>
        )}
      />
    );
  }

}

const styles = StyleSheet.create({
  tabNavigatorIcon: { width: 35, height: 35 }
});

export default Categorias;