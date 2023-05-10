import { View, Text } from 'react-native'
import React from 'react'
import Splash from './screens/Splash'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Paid from './screens/Paid';
import Received from './screens/Received';

const Stack = createNativeStackNavigator();

type Props = {}

const App = (props: Props) => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: 'Welcome'}}
      />
      <Stack.Screen 
        name="Paid"
        component={Paid}
        options={{title: 'Paid', headerTitleStyle: {
          color: 'white',
        }, headerStyle: {
          backgroundColor: '#ff6961'
        }}}
      />
      <Stack.Screen 
        name="Received"
        component={Received}
        options={{title: 'Received', headerTitleStyle: {
          color: 'white',
        }, headerStyle: {
          backgroundColor: '#92CEA8'
        }}}
      />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App