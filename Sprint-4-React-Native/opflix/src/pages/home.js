import React, { Component } from 'react';
import {Text, Image, View, StyleSheet, ImageBackground} from 'react-native';
import planoDeFundo from '../assets/img/familia-vendo-tv1.jpg'
import menu from '../assets/img/menuhamburger.png'

class Home extends Component {
  static navigationOptions = {
    tabBarIcon: () => (
      <Image
        source={require('../assets/img/administrador.png')}
        style={StyleSheet.tabBarNavigatorIcon}
      />

    ),
  };

  render() {
    return (
      <View>
        <ImageBackground
          source={planoDeFundo}
          style={{ width: "100%", height: "100%" }}
        >
          <View>
            <Image
              source={menu}
              style={{ width: '5%', height: '16%', tintColor: 'rgba(72, 68, 69, 0.9)' }}
            ></Image>
          </View>

          <View style={styles.areaTittle}>
            <Text style={styles.textTittle}>OPFLIX</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBarNavigatorIcon: {
    width: 35,
    height: 35,
  },

  areaTittle: {
    marginTop: "35%",
    backgroundColor: 'rgba(72, 68, 69, 0.9)',
  },

  textTittle: {
    fontFamily: 'Cohin',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },

});

export default Home;