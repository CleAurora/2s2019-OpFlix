import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

class Categorias extends Component {
  //apresenta lista de categorias

  static navigationOptions = {
    tabBarIcon: () =>(
      <Image 
        source={require('../assets/img/categoria.png')}
        style={styles.tabNavigatorIcon}
      />
    ),
  };

  constructor(){
    super();
    this.state={
      categorias: [],
    };
  }

  componentDidMount(){
    this._carregarCategorias();
  }

  _carregarCategorias = async () =>{
    await fetch('http://192.168.3.192:5000/api/categorias')
    .then(response => response.json())
    .then(data => this.setState({categorias: data}))
    .catch(erro => console.warn(erro));
  };

  render(){
    return(
      <FlatList 
        data={this.state.categorias}
        keyExtractor={item => item.idCategoria}
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

export default Categorias;