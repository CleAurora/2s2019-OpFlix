import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from './pages/home';
import ProfileScreen from './pages/profile';
import LoginScreen from './pages/login';

const AuthStack = createStackNavigator({
  Login: { screen: LoginScreen }
});

const HomeNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Profile:{
      screen: ProfileScreen,
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      inactiveBackgroundColor: '#000000',
      activeBackgroundColor: '#ffffff',
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

