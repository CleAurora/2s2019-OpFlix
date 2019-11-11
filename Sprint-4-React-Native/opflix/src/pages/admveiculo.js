import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

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
    await fetch('http://192.168.3.192:5000/api/veiculos')
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
            <Text>{item.Nome}</Text>
          </View>
        )}
      />
    );
  }

}

const styles = StyleSheet.create({
  tabNavigatorIcon: { width: 25, height: 25, tintColor: 'black' }
});

export default Veiculos;