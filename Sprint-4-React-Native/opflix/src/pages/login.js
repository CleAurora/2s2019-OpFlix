import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, AsyncStorage, ImageBackground, Image, StyleSheet } from 'react-native';
import planoDeFundo from '../assets/img/familia-vendo-tv1.jpg'
import menu from '../assets/img/menuhamburger.png'

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

  // constructor() {
  //   super();
  //   this.state = {
  //     email: '',
  //     senha: ''
  //   };
  // }

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

        <ImageBackground
          source={planoDeFundo}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={styles.headerArea}>
            <Image
              source={menu}
              style={{ width: "5%", height: "17%", tintColor:'#ffffff' }}></Image>
            <Text style={styles.textTittle}>OPFLIX</Text>
          </View>

          <View style={styles.loginArea}>
            <TextInput
              style={styles.inputArea}
              placeholder="email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              style={styles.inputArea}
              placeholder="senha"
              onChangeText={senha => this.setState({ senha })}
              value={this.state.senha}
            />
            <TouchableOpacity style={styles.btnLogin} onPress={this._realizarLogin}>
              <Text style={styles.tituloDoBotao}>Login</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  headerArea:{
    backgroundColor: '#484445',
  },

  textTittle: {
    fontFamily: 'Cohin',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: -50,
  },

  loginArea: {
    backgroundColor: 'rgba(72, 68, 69, 0.5)',
    marginTop: '35%',
    marginHorizontal: '15%'
  },

  inputArea: {
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },

  btnLogin: {
    backgroundColor: '#484445',
    height: 30,
  },

  tituloDoBotao: {
    textAlign: 'center',
  }
});


export default Login;
