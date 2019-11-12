import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, FlatList, AsyncStorage } from 'react-native';

class Veiculos extends Component {

  static navigationOptions = {
    tabBarIcon: () =>(
      <Image 
        source={require('../assets/img/veiculo.png')}
        style={styles.tabNavigatorIcon}
      />
    ),
  };

  constructor(){
    super();
    this.state={
      veiculos: [],
    };
  }

  componentDidMount(){
    this._carregarVeiculos();
  }

  _carregarVeiculos = async () =>{
    await fetch('http://192.168.3.192:5000/api/veiculos', {
      headers: {
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
      }
    })
    .then(response => response.json())
    .then(data => this.setState({veiculos: data}))
    .catch(erro => console.warn(erro));
  };

  render(){
    return(
      <FlatList 
        data={this.state.veiculos}
        keyExtractor={item => item.idVeiculo}
        renderItem={({item}) => (
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

export default Veiculos;