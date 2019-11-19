import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from './pages/home';
import ProfileScreen from './pages/profile';
import LoginScreen from './pages/login';
import CategoriaScreen from './pages/admcategoria';
import LancamentosScreen from './pages/admlancamento';
import TiposScreen from './pages/admtipo';
import UsuariosScreen from './pages/admusuario';
import VeiculosScreen from './pages/admveiculo';

const AuthStack = createStackNavigator({
  Login: { screen: LoginScreen }
});

const HomeNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
    Categorias: {
      screen: CategoriaScreen,
    },
    Lancamentos: {
      screen: LancamentosScreen, 
    },
    Tipos: {
      screen: TiposScreen,
    },
    Usuarios: {
      screen: UsuariosScreen,
    },
    Veiculos: {
      screen: VeiculosScreen,
    }


  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      inactiveBackgroundColor: '#ffffff',
      activeBackgroundColor: '#484445',
      style: {
        width: '100%',
        height: 50,
      },
    },


  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      HomeNavigator,
      AuthStack,
    },
    {
      initialRouteName: 'AuthStack',
    },
  ),
);

