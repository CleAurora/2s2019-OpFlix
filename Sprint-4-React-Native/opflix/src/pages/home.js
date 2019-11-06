import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';

class Home extends Component {
    static navigationOptions = {
        tabBarIcon: () => (
            <Image
                source={require('../assets/img/login.png')}
                style={StyleSheet.tabBarNavigatorIcon}

                source={require('../assets/img/cadastro.png')}
                style={StyleSheet.tabBarNavigatorIcon}
            />
        ),
    };

    render() {
        return (
            <Text>OPFLIX</Text>
        );
    }
}

const styles = StyleSheet.create({
    tabBarNavigatorIcon: { width: 25, height: 25, tintColor: 'black' }
});

export default Home;