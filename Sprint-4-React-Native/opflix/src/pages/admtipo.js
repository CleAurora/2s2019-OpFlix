import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

class Tipos extends Component {

  static navigationOptions = {
    tabBarIcon: () =>(
      <Image 
        source={require('../assets/img/tipo.png')}
        style={styles.tabNavigatorIcon}
      />
    ),
  };

  constructor(){
    super();
    this.state={
      tipos: [],
    };
  }

  componentDidMount(){
    this._carregarTipos();
  }

  _carregarTipos = async () =>{
    await fetch('http://192.168.3.192:5000/api/tipos')
    .then(response => response.json())
    .then(data => this.setState({tipos: data}))
    .catch(erro => console.warn(erro));
  };

  render(){
    return(
      <FlatList 
        data={this.state.tipos}
        keyExtractor={item => item.idTipos}
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

export default Tipos;