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
              style={{width: 40 , height: 40, resizeMode:"stretch", marginBottom:"-7%" ,marginTop:"1%", marginLeft: "0.5%",tintColor:'#ffffff' }}></Image>
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
    fontSize: 30,
    marginTop: "-3%",
    marginBottom: "1%",
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },

  loginArea: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingLeft:"10%",
    paddingRight:"10%",
    paddingTop:"10%",
    width: "80%",
    height: "60%",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "25%",
  },
  
  inputArea: {
    backgroundColor: '#ffffff',
    textAlign: 'center',
    marginVertical: "8%"
  },

  btnLogin: {
    backgroundColor: '#484445',
    height: 50,
    marginTop:"30%",
    paddingTop: "4%"
  },

  tituloDoBotao: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: 'center',
  }
});


export default Login;
