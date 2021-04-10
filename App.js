
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ListScreen from './component/ListScreen';
import MapsScreen from './component/MapsScreen';
import Splash from './component/splash'

const RootStack = createStackNavigator(
  {  
    
    Splash:Splash,
    List: ListScreen,
    Maps: MapsScreen,
  },
  {
    initialRouteName: 'Splash',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#19AC52',
      },
      headerTintColor: '#fff',

        headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  
  },
);

const RootContainer = createAppContainer(RootStack);

export default function App() {
  return (
    <RootContainer />
  )
}