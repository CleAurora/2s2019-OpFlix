import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, FlatList, AsyncStorage } from 'react-native';

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
    };
  }

  componentDidMount() {
    this._carregarLancamentos();
  }

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

  render() {
    return (
      <View>
        <Text style={styles.tittleText}>Lista de Lançamentos</Text>
        <FlatList
          data={this.state.lancamentos}
          keyExtractor={item => item.idLancamento}
          renderItem={({ item }) => (
            <View style={styles.body}>
              <Text style={styles.text}>{item.nome}</Text>
              <Text style={styles.text}>{item.sinopse}</Text>
              <Text style={styles.text}>{item.duracao}</Text>
              <Text style={styles.text}>{item.dataLancamento}</Text>
              <Text style={styles.text}>{item.idVeiculo}</Text>
              <Text style={styles.text}>{item.idCategoria}</Text>
              <Text style={styles.text}>{item.idClassificacao}</Text>
              <Text style={styles.text}>{item.idTipo}</Text>
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

export default Lancamentos;