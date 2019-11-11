import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

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
    await fetch('http://192.168.3.192:5000/api/lancamentos')
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
            <Text>{item.Nome}</Text>
            <Text>{item.Sinopse}</Text>
            <Text>{item.Duracao}</Text>
            <Text>{item.DataLancamento}</Text>
            <Text>{item.IdVeiculo}</Text>
            <Text>{item.IdCategoria}</Text>
            <Text>{item.IdClassificacao}</Text>
            <Text>{item.IdTipo}</Text>
          </View>
        )}
      />
    );
  }

}

const styles = StyleSheet.create({
  tabNavigatorIcon: { width: 25, height: 25, tintColor: 'black' }
});

export default Lancamentos;