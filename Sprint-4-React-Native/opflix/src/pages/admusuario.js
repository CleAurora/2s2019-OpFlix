import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, FlatList, AsyncStorage } from 'react-native';

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
    this._carregarUsuarios();
  }

  _carregarUsuarios = async () =>{
    await fetch('http://192.168.3.192:5000/api/usuarios', {
      headers:{
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('@opflix:token')
      }
    })
    .then(response => response.json())
    .then(data => this.setState({usuarios: data}))
    .catch(erro => console.warn(erro));
  };

  render(){
    return(
      
      <FlatList 
        style={styles.Text} 
        data={this.state.usuarios}
        keyExtractor={item => item.idUsuario}
        renderItem={({item}) => (
          <View>
            <Text>{item.nome}</Text>
            <Text>{item.email}</Text>
            <Text>{item.celular}</Text>
            <Text>{item.endereco}</Text>
            <Text>{item.idPerfil}</Text>

          </View>
        )}
      />
    );
  }

}

const styles = StyleSheet.create({
  tabNavigatorIcon: { width: 35, height: 35 },

  Text: {fontFamily: "Robota", fontSize: 20}
});


export default Usuarios;