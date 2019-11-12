import React, {Component} from 'react';
import {Text, AsyncStorage, View, Image, StyleSheet} from 'react-native';

class Profile extends Component {
  
  static navigationOptions = {
    tabBarIcon: () =>(
      <Image 
        source={require('../assets/img/rolo2.png')}
        style={styles.tabNavigatorIcon}
      />
    ),
  };
  
  constructor() {
    super();
    this.state = {
      token: null,
    };
  }

  // quando eu abrir a tela de perfil, eu quero buscar os dados do asyncstorage
  componentDidMount() {
    this._buscarDadosDoStorage();
  }

  _buscarDadosDoStorage = async () => {
    try {
      const tokenDoStorage = await AsyncStorage.getItem('@opflix:token');
      if (tokenDoStorage != null) {
        this.setState({token: tokenDoStorage});
      }
    } catch (error) {}
  };

  render() {
    return (
      <View>
        <Text>Código de Segurança</Text>
        <Text>{this.state.token}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabNavigatorIcon: { width: 35, height: 35 }
});


export default Profile;
