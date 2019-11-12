import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';

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
            <Text>OPFLIX</Text>
        );
    }
}

const styles = StyleSheet.create({
    tabBarNavigatorIcon: { width: 35, height: 35}
});

export default Home;