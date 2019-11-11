import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { tsConstructorType } from '@babel/types';

class Login extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor() {
    super();
    this.state = {
      email: 'erik@email.com',
      senha: '123456'
    };
  }

  _realizarLogin = async () => {
    await fetch('http://192.168.3.192:5000/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        senha: this.state.senha,
      }),
    })
      .then(response => response.json())
      .then(data => this._irParaHome(data.token))
      .catch(erro => console.warn('Oops! Tem algo errado...' + erro));
  };

  _irParaHome = async tokenRecebido => {
    if (tokenRecebido != null) {
      try {
        await AsyncStorage.setItem('@opflix:token', tokenRecebido);
        this.props.navigation.navigate('HomeNavigator');
      } catch (error) { }
    }
  };

  render() {
    return (
      <View>
        <TextInput
          placeholder="email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          placeholder="senha"
          onChangeText={senha => this.setState({ senha })}
          value={this.state.senha}
        />
        <TouchableOpacity onPress={this._realizarLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}



export default Login;
