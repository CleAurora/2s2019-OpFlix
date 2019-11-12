import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, FlatList, AsyncStorage } from 'react-native';

class Lancamentos extends Component {

  static navigationOptions = {
    tabBarIcon: () =>(
      <Image 
        source={require('../assets/img/lancamento.png')}
        style={styles.tabNavigatorIcon}
      />
    ),
  };

  constructor(){
    super();
    this.state={
      lancamentos: [],
    };
  }

  componentDidMount(){
    this._carregarLancamentos();
  }

  _carregarLancamentos = async () =>{
    await fetch('http://192.168.3.192:5000/api/lancamentos', {
      headers:{
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
      }
    })
    .then(response => response.json())
    .then(data => this.setState({lancamentos: data}))
    .catch(erro => console.warn(erro));
  };

  render(){
    return(
      <FlatList 
        data={this.state.lancamentos}
        keyExtractor={item => item.idLancamento}
        renderItem={({item}) => (
          <View>
            <Text>{item.nome}</Text>
            <Text>{item.sinopse}</Text>
            <Text>{item.duracao}</Text>
            <Text>{item.dataLancamento}</Text>
            <Text>{item.idVeiculo}</Text>
            <Text>{item.idCategoria}</Text>
            <Text>{item.idClassificacao}</Text>
            <Text>{item.idTipo}</Text>
          </View>
        )}
      />
    );
  }

}

const styles = StyleSheet.create({
  tabNavigatorIcon: { width: 35, height: 35}
});

export default Lancamentos;