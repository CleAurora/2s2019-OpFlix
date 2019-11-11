import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

class Usuarios extends Component {

  static navigationOptions = {
    tabBarIcon: () =>(
      <Image 
        source={require('../assets/img/usuario.png')}
        style={styles.tabNavigatorIcon}
      />
    ),
  };

  constructor(){
    super();
    this.state={
      usuarios: [],
    };
  }

  componentDidMount(){
    this._carregarCategorias();
  }

  _carregarCategorias = async () =>{
    await fetch('http://192.168.3.192:5000/api/categorias')
    .then(response => response.json())
    .then(data => this.setState({usuarios: data}))
    .catch(erro => console.warn(erro));
  };

  render(){
    return(
      <FlatList 
        data={this.state.usuarios}
        keyExtractor={item => item.idUsuario}
        renderItem={({item}) => (
          <View>
            <Text>{item.Nome}</Text>
            <Text>{item.Email}</Text>
            <Text>{item.Senha}</Text>
            <Text>{item.Celular}</Text>
            <Text>{item.Endereco}</Text>
            <Text>{item.IdPerfil}</Text>
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